#lang pollen
◊define-meta[title]{Writing API Wrappers with Elixir}
◊define-meta[author]{shane}
◊define-meta[publish-date]{2013-12-08}
◊define-meta[tags]{api, elixir, functional programming, mandrill}

Recently, I built an API wrapper for ◊a[#:href "https://mandrill.com/"]{Mandrill}. Let's walk through the steps I used to create it and see if this process might be able to help you in your next project.

◊h2{Installing Elixir}

If your preferred development enviroment does not have Elixir installed, you'll need to install it in order to continue on with the walk through. Head over to the ◊a[#:href "http://elixir-lang.org/getting_started/1.html"]{Elixir getting started page}, and follow their steps under section 1.1.

If you've never messed with Elixir, read the rest of the Elixir getting started page after installing Elixir. It's ok. I'll wait.

Ready? Let's go.

◊h2{Setting up our project}

Developers using Elixir use ◊code{mix} for building, running, and testing their applications. What is ◊code{mix}, you ask? Well, from its ◊a[#:href "http://elixir-lang.org/getting_started/mix/1.html"]{intro page}:

◊blockquote{Mix is a build tool that provides tasks for creating, compiling, testing (and soon releasing) Elixir projects. Mix is inspired by the Leiningen build tool for Clojure and was written by one of its contributors.}

With mix, creating our project is as simple as:

◊highlight['bash]{
$ mix new api_wrapper --sup
}

where ◊code{api_wrapper} is the name of our project. I'm wanting to build a wrapper for Mandrill's API, so I'll be using ◊code{mandrillex} for my project name. If you want a reliable transactional email provider or just want to follow along, check out their ◊a[#:href "https://mandrill.com/features/"]{features page} and ◊a[#:href "https://mandrill.com/signup/"]{signup}. Psst: it's free up to 10,000 emails per month.

◊h2{OTP application}

Opening ◊code{lib/mandrillex.ex}, we see ◊code{mix} has set up a project for us that implements the bare necessities for an ◊a[#:href "http://www.erlang.org/doc/man/application.html"]{OTP application}, allowing our wrapper to be included in other projects easier by following the OTP design principles.

◊highlight['elixir]{
defmodule Mandrillex do
  use Application.Behaviour

  # See http://elixir-lang.org/docs/stable/Application.Behaviour.html
  # for more information on OTP Applications
  def start(_type, _args) do
    Mandrillex.Supervisor.start_link
  end
end
}

We're going to leverage ◊a[#:href "https://github.com/edgurgel/httpoison"]{HTTPoison} for making requests to our API. Lucky for us, HTTPoison exposes a ◊code{HTTPoison.Base} module that we can embed into our module with the ◊code{use} directive.

◊highlight['elixir]{
  ...
  use Application.Behaviour
  use HTTPoison.Base
  ...
}

Now when we want to use our module elsewhere, we can simply make a call to ◊code{Mandrillex.start} to start the OTP application and listen for calls we want to send to the API.

We're also going to define ◊code{process_url/1} and ◊code{process_response_body/1} to make our lives easier when using ◊code{HTTPoison}.

◊highlight['elixir]{
  ...
  def process_url(endpoint) do
    "https://mandrillapp.com/api/1.0/" <> endpoint <> ".json"
  end

  def process_response_body(body) do
    JSEX.decode!(body, [{:labels, :atom}])
  end
  ...
}

As you might be able to tell, ◊code{process_url/1} allows us to shorten our urls from ◊code{https://mandrillapp.com/api/1.0/users/ping.json} to ◊code{users/ping}, and ◊code{process_response_body/1} processes the response we receive automatically before it is returned to us.

◊h2{Building out our wrapper}

When compiling, Elixir will look for source files in our ◊code{lib} directory, as long as the file extensions are correct (standard is ◊code{*.ex} for files meant for compilation), and create the corresponding BEAM bytecode files. BEAM, the Erlang VM, is what handles the processes, fault-tolerance, applications, etc. for Erlang, Elixir, and other BEAM-based languages.

Most developers match up module names with directories, e.g. store ◊code{Mandrillex} in ◊code{lib} and ◊code{Mandrillex.Users} in ◊code{lib/mandrillex}. We're going to follow suit and place our other module files in ◊code{lib/mandrillex}.

Building out all parts of this wrapper would get fairly monotonous, so instead, we'll focus on one endpoint, ◊a[#:href "https://mandrillapp.com/api/docs/messages.JSON.html#method-send"]{◊code{messages/send}}.

In ◊code{lib/mandrillex/messages.ex}, we're going to define our module and the function responsible for handling the ◊code{messages/send} endpoint.

◊highlight['elixir]{
defmodule Mandrillex.Messages do
  def send(key, message, async, ip_pool, send_at) do
    params = [
      key: key,
      message: message,
      async: async,
      ip_pool: ip_pool,
      send_at: send_at
    ]
    Mandrillex.post("messages/send", JSEX.encode! params).body
  end
end
}

Now, we can send calls to that endpoint with this method.

◊highlight['elixir]{
$ iex -S mix
Erlang R16B02 (erts-5.10.3) [source] [64-bit] [smp:4:4] [async-threads:10] [hipe] [kernel-poll:false] [dtrace]

Interactive Elixir (0.11.3-dev) - press Ctrl+C to exit (type h() ENTER for help)
iex> Mandrillex.start
:ok
iex> Mandrillex.Messages.send("your_api_key", [text: "testing", subject: "test subject", from_email: "sending email", from_name: "sending name", to: [[email: "recipient email", name: "recipient name", type: "to"]]], true, nil, nil)
[[email: "recipient email", status: "sent",
_id: "cb03be26672147dc9503ce2f90806492", reject_reason: nil]]
}

Awesomesauce! We just received a successful response from the API using our newly-developed module.

◊h2{Streamlining our wrapper}

I don't know about you, but since Mandrill's API calls alway need an API key passed, I would hate to have that as a parameter for all of the endpoints. Let's move that into the ◊code{Mandrillex} module:

◊highlight['elixir]{
  ...
  def key do
    System.get_env("MANDRILL_KEY")
  end
  ...
}

and change ◊code{Mandrillex.Messages.send} to suit:

◊highlight['elixir]{
  ...
  def send(message, async, ip_pool, send_at) do
    params = [
      key: Mandrill.key,
      message: message,
      async: async,
      ip_pool: ip_pool,
      send_at: send_at
    ]
    Mandrillex.post("messages/send", JSEX.encode! params).body
  end
  ...
}

When starting our ◊code{iex} session, our expressions are only slightly different.

◊highlight['elixir]{
$ MANDRILL_KEY=your_api_key iex -S mix
Erlang R16B02 (erts-5.10.3) [source] [64-bit] [smp:4:4] [async-threads:10] [hipe] [kernel-poll:false] [dtrace]

Interactive Elixir (0.11.3-dev) - press Ctrl+C to exit (type h() ENTER for help)
iex> Mandrillex.start
:ok
iex> Mandrillex.Messages.send([text: "testing", subject: "test subject", from_email: "sending email", from_name: "sending name", to: [[email: "recipient email", name: "recipient name", type: "to"]]], true, nil, nil)
[[email: "recipient email", status: "sent",
_id: "cb03be26672147dc9503ce2f90806492", reject_reason: nil]]
}

Of course, this is only one way of introducing an environment variable. Be sure to choose the method that makes the most sense for your implementation.

Moving on, I think it'd be nice to have a function that makes the request for me, since I'm always making ◊code{POST} requests to Mandrill's API and always JSON-encoding the request body.

In the ◊code{Mandrillex} module, we'll add:

◊highlight['elixir]{
  ...
  def request(endpoint, body) do
    Mandrillex.post(endpoint, JSEX.encode! body).body
  end
  ...
}

and update ◊code{Mandrillex.Messages} once more:

◊highlight['elixir]{
  ...
  def send(message, async, ip_pool, send_at) do
    params = [
      key: Mandrill.key,
      message: message,
      async: async,
      ip_pool: ip_pool,
      send_at: send_at
    ]
    Mandrillex.request("messages/send", params)
  end
  ...
}

By doing this, we are able to change our code in one place instead of many places if we were to ever change how JSON is encoded, say if we switched from ◊code{jsex} to ◊code{exjson}.

If we were making more than ◊code{POST} requests, we could add a ◊code{method} parameter to ◊code{Mandrillex.request/2} and add other definitions with guard clauses similar to:

◊highlight['elixir]{
  ...
  def request(method, endpoint, body) when method == :get do
    Mandrillex.get(endpoint, JSEX.encode! body).body
  end
  def request(method, endpoint, body) when method == :post do
    Mandrillex.post(endpoint, JSEX.encode! body).body
  end
  ...
}

and call it via ◊code{Mandrillex.request(:post, "messages/send", params)} in ◊code{Mandrillex.Messages.send}. Alternately, we could favor a more Erlang-ish approach with pattern matching:

◊highlight['elixir]{
  ...
  def request({:get, endpoint, body}) do
    Mandrillex.get(endpoint, JSEX.encode! body).body
  end
  def request({:post, endpoint, body}) do
    Mandrillex.post(endpoint, JSEX.encode! body).body
  end
  ...
}

and call it by wrapping the previous call's arguments as a tuple, i.e. ◊code{Mandrillex.request({:post, "messages/send", params})}.

◊h2{Wrapping up}

We only have one endpoint covered, but our working function that allows us to make our call in a simple manner can be duplicated to handle all the other endpoints in the Mandrill API.

Now it's youre turn to finish up, or if you're the impatient type, head over to ◊a[#:href "https://github.com/slogsdon/mandrillex"]{slogsdon/mandrillex} on GitHub to look at the current version of ◊code{mandrillex} that covers the rest of the endpoints.
