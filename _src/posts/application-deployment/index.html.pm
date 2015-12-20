#lang pollen
◊define-meta[title]{Application Deployment}
◊define-meta[author]{shane}
◊define-meta[publish-date]{2014-08-25}
◊define-meta[tags]{deployment, elixir, exrm, functional programming}

The deployment of Elixir applications. You may have experience in deploying your Ruby or .NET applications, but when it comes to Elixir, do you have what it takes to deploy your app? Learn the essentials for getting your application from development to production.

◊h3{Requirements}

Deployment is great and all, but be sure you have these things before continuing:

◊ul{
  ◊li{Application}
  ◊li{Build environment}
  ◊li{Hosting environment}
}

◊blockquote{◊strong{Psst!} Your hosting environment and your build environment can be one in the same if you're doing a test run.}

Be sure that the architectures for both your build and hosting environments are the same, e.g. 64-bit Linux -> 64-bit Linux. Without doing this, you run the risk of your application not running. Using a virtual machine for your build environment that mirrors your hosting environment will be an easy way to ensure you don't have any such problems when deploying your application.

◊h3{Goals}

Our main goal for this guide is to generate a release, using ◊a[#:href "https://github.com/bitwalker/exrm"]{Elixir Release Manager} (exrm) and deploy it to our hosting environment. Once we have our application running, we will discuss steps needed to expose it to the world.

◊h2{Overview}

Let's separate our goals into a few tasks of which we can keep track:

◊ol{
  ◊li{Add exrm as a dependency}
  ◊li{Generate our first release}
  ◊li{Deploy our release to our hosting environment}
  ◊li{Expose our application}
}

◊h2{The new dependency in town}

To get started, we'll need to add exrm into our list of dependencies. With later versions of Elixir, we just need to add ◊code{{ :exrm, "~> 0.14.7" }} to have ◊a[#:href "https://hex.pm/"]{hex} download everything correctly. Here's an example:

◊highlight['elixir]{
  def deps do
    [ { :plug, "~> 0.7.0" },
      { :cowboy, "~> 1.0.0" },
      { :exrm, "~> 0.14.7" } ]
  end
}

With that taken care of, a simple ◊code{mix do deps.get, deps.compile} will pull down exrm and its dependencies, along with the rest of your application's dependencies, and ensures that everything compiles so exrm's mix tasks are available as well. Speaking of...

◊highlight['bash]{
$ mix help
mix                   # Run the default task (current: mix run)
...
mix release           # Build a release for the current mix application.
mix release.clean     # Clean up any release-related files.
mix release.plugins   # View information about active release plugins
mix run               # Run the given file or expression
mix test              # Run a project's tests
iex -S mix            # Start IEx and run the default task
}

Bam! Now we're cooking with fire!

◊h2{Our first release}

◊h3{Setup}

Update our ◊code{mix.exs} file to have all dependencies listed under ◊code{applications} in the application function:

◊highlight['elixir]{
  def application do
    [ mod: { MyApp, [] },
      applications: [ :plug, :cowboy ] ]
  end
}

Doing so helps us overcome one of ◊a[#:href "https://github.com/bitwalker/exrm#common-issues"]{exrm's common issues} by helping exrm know of all our dependencies so that it can properly bundle them into our release. When not completed, our application will probably alert us of missing modules or of a failure to start a child application when we go to run our release.

Even if you list all of your dependencies, your application may still fail, typically because one of your dependencies does not properly list its own dependencies. A quick fix for this is to include the missing dependency in your list of applications. You should create an issue or a pull request to that project's repo to help the community, but it isn't necessary.

Add our application's router as a child to our application's supervisor:

◊highlight['elixir]{
  def init([]) do
    children = [
      worker(MyApp.Router, [], function: :start)
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    supervise(children, strategy: :one_for_one)
  end
}

◊blockquote{◊strong{Warning!} The ◊code{phoenix.start} mix task will stop working once that worker is in your application's supervisor tree because ◊code{MyApp.Router.start} would be started twice, resulting in a failure from the second operation. To easily bring up a development server, run ◊code{iex -S mix}, which will give you a running application and an ◊code{iex} console as well.}

◊h3{Generating the release}

Running ◊code{mix release} will kick off the build process for our release.

◊blockquote{◊strong{Note:} In the following sections, you'll see our application's version (◊code{0.0.1}) pop up in bunch of places. This value is pulled from the application's ◊code{mix.exs} file, under the project's version.}

◊highlight['bash]{
$ mix release
==> Generating relx configuration...
==> Generating sys.config...
==> Generating boot script...
==> Performing protocol consolidation...
==> Conform: Loading schema...
==> Conform: No schema found, conform will not be packaged in this release!
==> Generating release...
===> Application metadata file exists but is malformed: /Users/shane/elixir/lib/mix/test/fixtures/deps_status/_build/dev/lib/invalidapp/ebin/invalidapp.app
===> Application metadata file exists but is malformed: /Users/shane/elixir/lib/mix/test/fixtures/deps_status/_build/dev/lib/invalidvsn/ebin/invalidvsn.app
===> Application metadata file exists but is malformed: /Users/shane/elixir/lib/mix/test/fixtures/deps_status/_build/dev/lib/ok/ebin/ok.app
==> Generating nodetool...
==> Packaging release...
==> The release for my_app-0.0.1 is ready!
}

After a bit, you will start to see exrm's output to the console. Exrm uses a set of default configuration options when building your application that will work for most applications (they say 99%). If you end up needing advanced configuration abilities, checkout ◊a[#:href "https://github.com/bitwalker/exrm#configuration"]{exrm's configuration section} for some awesome details about this process.

Once we see ◊code{==> The release for my_app-0.0.1 is ready!} pop up in our console, our release is complete! You may be asking yourself, "Where's the release? What's this ◊code{rel} directory?" Let's take a look!

◊h4{Contents of a release}

◊highlight['bash]{
$ ls -la rel/my_app
total 21488
drwxr-xr-x   7 shane  staff       238 Aug 22 10:03 .
drwxr-xr-x   3 shane  staff       102 Aug 22 10:03 ..
drwxr-xr-x   6 shane  staff       204 Aug 22 10:03 bin
drwxr-xr-x   8 shane  staff       272 Aug 22 10:03 erts-6.1
drwxr-xr-x  21 shane  staff       714 Aug 22 10:03 lib
drwxr-xr-x   5 shane  staff       170 Aug 22 10:03 releases
-rw-r--r--   1 shane  staff  10999433 Aug 22 10:03 my_app-0.0.1.tar.gz
}

◊code{bin} contains our generated executables for running our application. The ◊code{bin/my_app} executable is what we will eventually use to issue commands to our application.

◊code{erts-6.1} contains all necessary files for the Erlang run-time system, pulled from our build environment.

◊code{lib} contains the compiled BEAM files for our applicaiton and all of our dependencies. This is where all of your hard work goes.

◊code{releases} is the home for our releases, being used to house any release-dependent configurations and scripts that exrm finds necessary for running our application.

The tarball is our release in archive form, ready to be shipped off to our hosting environment.

◊h3{Testing our release}

Before deploying our release, we should make sure that it runs on our build environment. To do that, we will issue the ◊code{console} command to our executable, essentially running our application via ◊code{iex}.

◊highlight['bash]{
$ rel/my_app/bin/my_app console
Exec: /Users/shane/code/elixir/my_app/rel/my_app/erts-6.1/bin/erlexec -boot /Users/shane/code/elixir/my_app/rel/my_app/releases/0.0.1/my_app -env ERL_LIBS /Users/shane/code/elixir/my_app/rel/my_app/lib -config /Users/shane/code/elixir/my_app/rel/my_app/releases/0.0.1/sys.config -pa /Users/shane/code/elixir/my_app/rel/my_app/lib/consolidated -args_file /Users/shane/code/elixir/my_app/rel/my_app/releases/0.0.1/vm.args -user Elixir.IEx.CLI -extra --no-halt +iex -- console
Root: /Users/shane/code/elixir/my_app/rel/my_app
/Users/shane/code/elixir/my_app/rel/my_app
Erlang/OTP 17 [erts-6.1] [source-d2a4c20] [64-bit] [smp:4:4] [async-threads:10] [hipe] [kernel-poll:false]

Interactive Elixir (0.15.2-dev) - press Ctrl+C to exit (type h() ENTER for help)
iex(my_app@127.0.0.1)1>
}

This is the point where your application will crash if it fails to start a child application. However, if all goes well, you should be dropped into an ◊code{iex} prompt. Congratulations! We're ready to deploy our application!

◊h2{Deploy! Deploy!}

Now comes the easy part! There are many ways for us to get our tarballed release to our hosting environment, so you have a bit of free reign in this step.

In our example, we'll use SCP to upload to a remote server.

◊highlight['bash]{
$ scp -i ~/.ssh/id_rsa.pub rel/my_app/my_app-0.0.1.tar.gz ubuntu@hostname.com:/home/ubuntu
my_app-0.0.1.tar.gz                100%   18MB  80.0KB/s   03:48
}

Hooray! Let's SSH into that environment to set our application up.

◊highlight['bash]{
$ ssh -i ~/.ssh/id_rsa.pub ubuntu@hostname.com
$ sudo mkdir -p /app
$ sudo chown ubuntu:ubuntu /app
$ cd /app
$ tar xfz /home/ubuntu/my_app-0.0.1.tar.gz
}

See? I told you it would be easy.

◊h2{Exposè}

We're getting close. Can you feel it?

◊h3{Set up our init system}

First step in exposing our application to the world is ensuring that our application is running in case of a system restart, expected or unexpected. To do this, we will need to create an init script for our hosting environment's init system, be it ◊code{systemd}, ◊code{upstart}, or whatever.

In this case, we'll be using ◊code{upstart} as our OS is Ubuntu, and ◊code{upstart} has been bundled with Ubuntu since 6.10. Let's edit our init script with ◊code{sudo vi /etc/init/my_app.conf}

◊highlight['upstart]{
description "my_app"

## Uncomment the following two lines to run the
## application as www-data:www-data
#setuid www-data
#setgid www-data

start on startup
stop on shutdown

respawn

env MIX_ENV=prod
env PORT=8888
export MIX_ENV
export PORT

exec /bin/sh /app/bin/my_app start
}

Here, we've told ◊code{upstart} a few basic things about how we want it to handle our application. If you need to know how to do somthing in particular, take a look at the ◊a[#:href "http://upstart.ubuntu.com/cookbook/"]{◊code{upstart} cookbook} for loads of information on it. We'll kick off the first start of our application with ◊code{sudo start my_app}.

One key point to notice is that we're instructing ◊code{upstart} to run our release's ◊code{bin/my_app start} command, which boostraps our application and runs it as a daemon.

◊h4{exrm commands}

Along with the ◊code{start} command, exrm bundles a few others with our application that are equally useful. Check out the ◊a[#:href "https://github.com/bitwalker/exrm"]{exrm docs} for details on what's possible.

◊h5{◊code{ping}}

The ◊code{ping} command is a great sanity check when you need to ensure your application is running:

◊highlight['bash]{
$ bin/my_app ping
pong
}

Or to see if it isn't:

◊highlight['bash]{
$ bin/my_app ping
Node 'my_app@127.0.0.1' not responding to pings.
}

◊h5{◊code{remote_console}}

◊code{remote_console} will be your friend when debugging is in order. It allows you to attach an IEx console to your running application. When closing the console, your application continues to run.

◊highlight['bash]{
$ bin/my_app remote_console
Erlang/OTP 17 [erts-6.1] [source-d2a4c20] [64-bit] [smp:4:4] [async-threads:10] [hipe] [kernel-poll:false]

Interactive Elixir (0.15.2-dev) - press Ctrl+C to exit (type h() ENTER for help)
iex(my_app@127.0.0.1)1>
}

◊h5{◊code{upgrade}}

Although at the time of writing (25 Aug 2014) there is an ◊a[#:href "https://github.com/bitwalker/exrm/issues/56"]{open issue with upgrading an app with exrm}, the ◊code{upgrade} command allows you to upgrade your application to a newer codebase without downtime. Awesome, right?

◊h5{◊code{stop}}

You may run into situations where your application needs to stop. Look no further than the ◊code{stop} command.

◊highlight['bash]{
$ bin/my_app stop
ok
}

◊h3{Set up our web server}

In a lot of cases, you're going to have more than one application running in your hosting environment, all of which might need to be accessible on port 80. Since only one application can listen on a single port at a time, we need to use something to proxy our application. You will typically see Apache (with ◊code{mod_proxy} enabled) or nginx used for this, and we'll be setting up nginx in this case.

Let's create our config file for our application. By default, everything in ◊code{/etc/nginx/sites-enabled} is included into the main ◊code{/etc/nginx/nginx.conf} file that is used to configure nginx's runtime environment. Standard practice is to create our file in ◊code{/etc/nginx/sites-available} and make a symbolic link to it in ◊code{/etc/nginx/sites-enabled}.

◊blockquote{◊strong{Note:} These points hold true for Apache as well, but the steps to accomplish them are slightly different.}

◊highlight['bash]{
$ sudo touch /etc/nginx/sites-available/my_app
$ sudo ln -s /etc/nginx/sites-available /etc/nginx/sites-enabled
$ sudo vi /etc/nginx/sites-available/my_app
}

Contents of our ◊code{/etc/nginx/sites-available/my_app} file:

◊highlight['nginx]{
upstream my_app {
    server 127.0.0.1:8888;
}
server {
    listen 80;
    server_name .hostname.com;

    location / {
        try_files $uri @proxy;
    }

    location @proxy {
        include proxy_params;
        proxy_redirect off;
        proxy_pass http://my_app;
    }
}
}

Like our ◊code{upstart} script, this nginx config is basic. Look to the ◊a[#:href "http://wiki.nginx.org/Main"]{nginx wiki} for steps to configure any more involved features. Restart nginx with ◊code{sudo service nginx restart} to load our new config.

At this point, we should be able to see our application if we visit ◊code{http://hostname.com/} if everything has been successful up to this point.
