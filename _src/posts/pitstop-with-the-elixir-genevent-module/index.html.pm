#lang pollen
◊define-meta[title]{Pitstop with the Elixir GenEvent Module}
◊define-meta[author]{shane}
◊define-meta[publish-date]{2015-08-16}
◊define-meta[tags]{elixir, functional programming, genevent}
◊define-meta[description]{Take a break with me as I make a pitstop the Elixir GenEvent module, seeing what it can offer in a real life project.}

Wanting to learn more about WebSockets, I decided to create an easy to use, drop-in tool for Elixir's Plug library that adds WebSocket support for those using Plug and Cowboy (◊a[#:href "https://github.com/slogsdon/plug-web-socket"]{plug-web-socket}), the only officially supported web server. One important piece of the puzzle I needed to align required an interface for users to broadcast and subscribe to events. What's the point of a WebSocket connection anyways of the server can't react to events on the client or even elsewhere on the server?

For that task, my first thoughts went to GenServers. I probably could have made a GenServer to do the necessary work, however I found that GenEvent provided a more focused abstraction around what I wanted accomplished. Let's walk through a basic usage of Elixir's GenEvent module, stepping through the end result of ◊a[#:href "https://github.com/slogsdon/plug-web-socket/blob/master/lib/web_socket/events.ex"]{my library's event notification layer}.

◊blockquote{◊strong{Note:} I'm going to be commenting through the module I created similar to that of a literate program, talking to parts of the module as it's laid out.}

◊h2{Getting Started}

Here's the easy bit. I've created the module and used the Elixir ◊code{GenEvent} module, creating a set of base case ◊code{:gen_event} callback functions.

◊highlight['elixir]{
defmodule WebSocket.Events do
  use GenEvent
}

Now, I only need to implement the callback functions that I need. Hooray for removal of extra boilerplate code!

◊h2{Starting the Process}

Next up, I define a ◊code{start_link/1} function, useful for adding the ◊code{WebSocket.Events} module to a supervisor as a worker child. The ◊code{ref} is an atom-based name that will be used throughout the application, and for now, this is the function atom used in the project's routing macro. I know there are some issues here, but the project as a whole mess of improvements to be made.

◊highlight['elixir]{
  def start_link(ref) do
    case GenEvent.start_link(name: ref) do
      {:ok, pid} ->
        GenEvent.add_handler(ref, __MODULE__, [])
        {:ok, pid}
      {:error, {:already_started, pid}} ->
        {:ok, pid}
      otherwise ->
        otherwise
    end
  end
}

One line that I want to touch on is the following:

◊highlight['elixir]{
        GenEvent.add_handler(ref, __MODULE__, [])
}

The normal route for ◊code{GenEvent} is to have a set of handler modules that are added and removed from an event manager. Here, I'm creating the event manager with ◊code{GenEvent.start_link/1} and immediately adding the ◊code{WebSocket.Events} module as a handler. Since a module can only be added as a ◊code{GenEvent} handler once per manager ◊code{ref}, the above line is only included in the case where the manager is started and not when the manager is already running. One of my goals is to find a nice workaround for this limitation in order to remove the need to manage my own set of PIDs later on in the module.

◊code{start_link/1} is called in the ◊a[#:href "https://github.com/slogsdon/plug-web-socket/blob/master/lib/web_socket/cowboy/handler.ex#L33-L36"]{◊code{init/3} callback of my Cowboy WebSocket handler} which itself is called when a client connects to a WebSocket endpoint for the first time to upgrade its connection. The hit of starting the process is only on the first client to a specific endpoint, so the ◊code{GenEvent} manager process is only running when a endpoint is actually used.

◊h2{The Public API}

Next up is the public API for the module. These are the bits a developer would use when developing her own application. In these functions, we continue to expect a ◊code{ref} to be passed in order to notify the correct ◊code{GenEvent} manager, which in turn notifies the correct ◊code{WebSocket.Events} handler. A developer always has the option of passing a PID here, but it's often easier to pass an atom since this removes the need to maintain the manager's PID somewhere in state.

◊highlight['elixir]{
  def join(ref, pid) do
    GenEvent.notify(ref, {:add_client, pid})
  end

  def leave(ref, pid) do
    GenEvent.notify(ref, {:remove_client, pid})
  end

  def broadcast(ref, event, originator) do
    GenEvent.notify(ref, {:send, event, originator})
  end

  def broadcast!(ref, event) do
    broadcast(ref, event, nil)
  end

  def stop(ref) do
    GenEvent.stop(ref)
  end
}

One improvement that should be able to be made here is making the ◊code{pid} and ◊code{originator} arguments optional. More often than not, these will be called from/in the subscribing/subscribed process itself, so it should be able to default to ◊code{self} since ◊code{GenEvent.notify/2} will do the actual message passing to the handler.

◊h2{◊code{GenEvent} Callbacks}

The real meat and potatoes of this module are the ◊code{GenEvent} callback functions. These manage subscribers for the handler and propagate the event across the list of subscribers.

◊highlight['elixir]{
  def handle_event({:add_client, pid}, clients) do
    {:ok, [pid|clients]}
  end

  def handle_event({:remove_client, pid}, clients) do
    {:ok, clients |> Enum.filter(&(&1 != pid))}
  end

  def handle_event({:send, event, originator}, clients) do
    spawn fn ->
      clients |> Enum.map(&(maybe_send(&1, originator, event)))
    end
    {:ok, clients}
  end

  defp maybe_send(client, originator, event) do
    unless client == originator do
      send client, event
    end
  end
end
}

This concludes the actual contents of the ◊code{WebSocket.Events} module.

If I can find a nice work around for the limitation above, most of this would be simplified. The state (◊code{clients}) would then be a single client, and there would only be a need for the last definition of ◊code{handle_event/2} with some modifications:

◊highlight['elixir]{
  def handle_event({:send, _event, client}, client), do: {:ok, client}
  def handle_event({:send, event, _originator}, client) do
    send client, event
  end
}

Wouldn't that me nice? I think so!
