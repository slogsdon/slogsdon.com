#lang pollen
◊define-meta[title]{Implementing User Authentication with bcrypt in ChicagoBoss}
◊define-meta[author]{shane}
◊define-meta[publish-date]{2013-10-03}
◊define-meta[tags]{authentication, bcrypt, chicagoboss, erlang, functional programming}
◊define-meta[description]{Don't rely on MD5/SHA1/SHA256/etc. hashes for storing passwords. Join me in learning how to bcrypt in Erlang applications.}

Ever since I learned the error in using basic ◊code{MD5}/◊code{SHA1}/◊code{SHA256}/etc. hashes for storing password hashes, I always see to adding in ◊code{bcrypt} hashing in the authentication for my web applications, but ◊a[#:href "http://www.chicagoboss.org/"]{ChicagoBoss}, one of my new go-to web frameworks along with ◊a[#:href "http://robfig.github.io/revel/"]{Revel} (yay, concurrency!), doesn't have ◊code{bcrypt} support added in by default. Let's go ahead and add that ourselves.

Before we get into things, I just want you to be aware that this is a very basic implementation. There are many things I plan on changing (I may end up updating the ◊a[#:href "https://gist.github.com/slogsdon/7226067"]{gist} as well), so please follow suit. Use this as a starting point, and adapt this to the needs of your project.

◊h2{Initial Configuration}

Let's add ◊code{bcrypt} to our ◊code{rebar.config} as a dependency:

◊highlight['erlang]{
{deps, [
    {boss, ".*", {git, "git://github.com/evanmiller/ChicagoBoss.git", "HEAD"}},
    {bcrypt, ".*", {git, "https://github.com/opscode/erlang-bcrypt.git", "HEAD"}}
]}.
{plugin_dir, ["priv/rebar"]}.
{plugins, [boss_plugin]}.
{eunit_compile_opts, [{src_dirs, ["src/test"]}]}.
{lib_dirs, ["./deps/elixir/lib"]}.
}

More than likely, you'll already have most of this except for line 3. To grab the source and compile ◊code{bcrypt}, run ◊code{./rebar get-deps compile}.

Don't forget to configure a persistent data store for your user accounts in ◊code{boss.config}. This should work with the default ◊code{mock} ◊code{db_adapter}, but you will lose all data once you stop/restart the application.

◊h2{Loading ◊code{bcrypt}}

We need ◊code{bcrypt}'s application to be running before we can use it. Sadly, I have yet to figure out the magic sauce to have ChicagoBoss run ◊code{bcrypt} automatically, so in the mean time, we'll use an init script to help us out:

◊highlight['erlang]{
%% file: priv/init/module_10_bcrypt.erl
-module(module_10_bcrypt).
-export([init/0, stop/0]).

%% We need to manually start the bcrypt application.
%% @TODO: figure out how to get this to run via boss.config.
init() ->
    %% Uncomment the following line if your CB app doesn't start crypto on its own
    % crypto:start(),
    bcrypt:start().

stop() ->
    bcrypt:stop().
    %% Comment the above and uncomment the following lines
    %% if your CB app doesn't start crypto on its ow
    % bcrypt:stop(),
    % crypto:stop().
}

All modules with an exported ◊code{init/0} in ◊code{./priv/init} are loaded and called at initial application start. This is helpful for adding watches with ◊code{boss_news} as well.

◊h2{Our User Model}

Here's a basic user model for our account information with a few convenience functions sprinkled in:

◊highlight['erlang]{
%% file: src/model/test_user.erl
-module(test_user, [Id, Email, Username, Password]).
-compile(export_all).

-define(SETEC_ASTRONOMY, "Too many secrets").

session_identifier() ->
    mochihex:to_hex(erlang:md5(?SETEC_ASTRONOMY ++ Id)).

check_password(PasswordAttempt) ->
    StoredPassword = erlang:binary_to_list(Password),
    user_lib:compare_password(PasswordAttempt, StoredPassword).

set_login_cookies() ->
    [ mochiweb_cookies:cookie("user_id", erlang:md5(Id), [{path, "/"}]),
      mochiweb_cookies:cookie("session_id", session_identifier(), [{path, "/"}]) ].
}

Set an actual secret for your ◊code{SETEC_ASTRONOMY} like I will be.

This model contains one of the items I want to improve upon in the future. Eventually, the session storage will be moved over to ◊a[#:href "http://basho.com/riak/"]{Riak} as its bitcask storage backend supports automatic expiry of keys, so I don't have to worry about invalidating old sessions as they expire. Chalk that up as being a lazy (smart) programmer.

◊h2{A Helper Module}

This helper module isn't really necessary, but it does provide a simple place to keep functions that don't really belong in our model. In fact, I see some refactoring that is in order to clean up the model and controllers even further.

◊highlight['erlang]{
%% file: src/lib/user_lib.erl
-module(user_lib).
-compile(export_all).

%% On success, returns {ok, Hash}.
hash_password(Password)->
    {ok, Salt} = bcrypt:gen_salt(),
    bcrypt:hashpw(Password, Salt).

%% Tests for presence and validity of session.
%% Forces login on failure.
require_login(Req) ->
    case Req:cookie("user_id") of
        undefined -> {redirect, "/user/login"};
        Id ->
            case boss_db:find(Id) of
                undefined -> {redirect, "/user/login"};
                TestUser ->
                    case TestUser:session_identifier() =:= Req:cookie("session_id") of
                        false -> {redirect, "/user/login"};
                        true -> {ok, TestUser}
                    end
            end
     end.

compare_password(PasswordAttempt, Password) ->
    {ok, Password} =:= bcrypt:hashpw(PasswordAttempt, Password).
}

◊code{user_lib:require_login/1} checks for the presence of session data and validates it, redirecting the request to our login page. If everything is good to go, it returns our ◊code{TestUser}.

◊h2{Our User Controller}

This allows our users to register for an account or login. It might be nice to let the logout in the future.

◊highlight['erlang]{
%% file: src/controller/test_user_controller.erl
-module(test_user_controller, [Req]).
-compile(export_all).

login('GET', []) ->
    {ok, [{redirect, Req:header(referer)}]};

login('POST', []) ->
    Username = Req:post_param("username"),
    case boss_db:find(annie_user, [{username, Username}], [{limit, 1}]) of
        [TestUser] ->
            case TestUser:check_password(Req:post_param("password")) of
                true ->
                   {redirect, proplists:get_value("redirect",
                       Req:post_params(), "/"), TestUser:set_login_cookies()};
                false ->
                    {ok, [{error, "Password mismatch"}]}
            end;
        [] ->
            {ok, [{error, "User not found"}]}
    end.

register('GET', []) ->
    {ok, []};

register('POST', []) ->
    Email = Req:post_param("email"),
    Username = Req:post_param("username"),
    {ok, Password} = user_lib:hash_password(Req:post_param("password")),
    TestUser = test_user:new(id, Email, Username, Password),
    Result = TestUser:save(),
    {ok, [Result]}.
}

◊h2{Example Authenticated Controller}

In cases where we want an entire controller to require authentication, let's have ChicagoBoss make our lives a little bit easier:

◊highlight['erlang]{
%% file: src/controller/test_index_controller.erl
-module(test_index_controller, [Req]).
-compile(export_all).

%% Forces login if valid session is not present.
%% Called before all actions.
before_(_) ->
    user_lib:require_login(Req).

%%
%% Index
%%
%% requires TestUser
%%
%% GET index/index
%%
index('GET', [], TestUser) ->
    {ok, [{test_user, TestUser}]}.
}

◊code{before_/1} is doing most of the legwork here. It's called before any of our actions, calling ◊code{user_lib:require_login} in the process. Note, we can have ◊code{before_} pass our ◊code{TestUser} to our actions by adding ◊code{TestUser} as a third parameter to our ◊code{index} function. This isn't necessary, but if you want to pass the model along to you views, this would be the place to do it.

◊h2{Wrapping Up}

Now you can start securing your ChicagoBoss applications and not have to use ◊code{MD5} hashes (whoo!). I went through quite a few iterations in getting this to actually run without problems, more than likely due to my lack of experience with erlang, so drop me a note if you run into any issues.
