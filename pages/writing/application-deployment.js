import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "Application Deployment",
  date: "2014-08-25",
  tags: [-"deployment", -"elixir", -"exrm", -"functional programming"],
  image: "water-against-cliffs.jpeg",
  description:
    "You may have experience in deploying your Ruby or .NET applications, but when it comes to Elixir, do you have what it takes to deploy your app? Learn the essentials for getting your application from development to production.",
})(markdown(components)`

The deployment of Elixir applications. You may have experience in deploying your Ruby or .NET applications, but when it comes to Elixir, do you have what it takes to deploy your app? Learn the essentials for getting your application from development to production.

### Requirements

Deployment is great and all, but be sure you have these things before continuing:

* Application
* Build environment
* Hosting environment

> **Psst!** Your hosting environment and your build environment can be one in the same if you're doing a test run.

Be sure that the architectures for both your build and hosting environments are the same, e.g. 64-bit Linux -> 64-bit Linux. Without doing this, you run the risk of your application not running. Using a virtual machine for your build environment that mirrors your hosting environment will be an easy way to ensure you don't have any such problems when deploying your application.

### Goals

Our main goal for this guide is to generate a release, using [Elixir Release Manager][1] (exrm) and deploy it to our hosting environment. Once we have our application running, we will discuss steps needed to expose it to the world.

## Overview

Let's separate our goals into a few tasks of which we can keep track:

1. Add exrm as a dependency
2. Generate our first release
3. Deploy our release to our hosting environment
4. Expose our application

## The new dependency in town

To get started, we'll need to add exrm into our list of dependencies. With later versions of Elixir, we just need to add ${(
  <InlineCode>{`{ :exrm, "~> 0.14.7" }`}</InlineCode>
)} to have [hex][2] download everything correctly. Here's an example:

${(
  <Code syntax="elixir">{`
  def deps do
    [ { :plug, "~> 0.7.0" },
      { :cowboy, "~> 1.0.0" },
      { :exrm, "~> 0.14.7" } ]
  end
`}</Code>
)}

With that taken care of, a simple ${(
  <InlineCode>{`mix do deps.get, deps.compile`}</InlineCode>
)} will pull down exrm and its dependencies, along with the rest of your application's dependencies, and ensures that everything compiles so exrm's mix tasks are available as well. Speaking of...

${(
  <Code>{`
$ mix help
mix                   # Run the default task (current: mix run)
...
mix release           # Build a release for the current mix application.
mix release.clean     # Clean up any release-related files.
mix release.plugins   # View information about active release plugins
mix run               # Run the given file or expression
mix test              # Run a project's tests
iex -S mix            # Start IEx and run the default task
`}</Code>
)}

Bam! Now we're cooking with fire!

## Our first release

### Setup

Update our ${(
  <InlineCode>{`mix.exs`}</InlineCode>
)} file to have all dependencies listed under ${(
  <InlineCode>{`applications`}</InlineCode>
)} in the application function:

${(
  <Code syntax="elixir">{`
  def application do
    [ mod: { MyApp, [] },
      applications: [ :plug, :cowboy ] ]
  end
`}</Code>
)}

Doing so helps us overcome one of [exrm's common issues][3] by helping exrm know of all our dependencies so that it can properly bundle them into our release. When not completed, our application will probably alert us of missing modules or of a failure to start a child application when we go to run our release.

Even if you list all of your dependencies, your application may still fail, typically because one of your dependencies does not properly list its own dependencies. A quick fix for this is to include the missing dependency in your list of applications. You should create an issue or a pull request to that project's repo to help the community, but it isn't necessary.

Add our application's router as a child to our application's supervisor:

${(
  <Code syntax="elixir">{`
  def init([]) do
    children = [
      worker(MyApp.Router, [], function: :start)
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    supervise(children, strategy: :one_for_one)
  end
`}</Code>
)}

> **Warning!** The ${(
  <InlineCode>{`phoenix.start`}</InlineCode>
)} mix task will stop working once that worker is in your application's supervisor tree because ${(
  <InlineCode>{`MyApp.Router.start`}</InlineCode>
)} would be started twice, resulting in a failure from the second operation. To easily bring up a development server, run ${(
  <InlineCode>{`iex -S mix`}</InlineCode>
)}, which will give you a running application and an ${(
  <InlineCode>{`iex`}</InlineCode>
)} console as well.

### Generating the release

Running ${(
  <InlineCode>{`mix release`}</InlineCode>
)} will kick off the build process for our release.

> **Note:** In the following sections, you'll see our application's version (${(
  <InlineCode>{`0.0.1`}</InlineCode>
)}) pop up in bunch of places. This value is pulled from the application's ${(
  <InlineCode>{`mix.exs`}</InlineCode>
)} file, under the project's version.

${(
  <Code>{`
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
`}</Code>
)}

After a bit, you will start to see exrm's output to the console. Exrm uses a set of default configuration options when building your application that will work for most applications (they say 99%). If you end up needing advanced configuration abilities, checkout [exrm's configuration section][4] for some awesome details about this process.

Once we see ${(
  <InlineCode>{`==> The release for my_app-0.0.1 is ready!`}</InlineCode>
)} pop up in our console, our release is complete! You may be asking yourself, &#8220;Where's the release? What's this ${(
  <InlineCode>{`rel`}</InlineCode>
)} directory?&#8221; Let's take a look!

#### Contents of a release

${(
  <Code>{`
$ ls -la rel/my_app
total 21488
drwxr-xr-x   7 shane  staff       238 Aug 22 10:03 .
drwxr-xr-x   3 shane  staff       102 Aug 22 10:03 ..
drwxr-xr-x   6 shane  staff       204 Aug 22 10:03 bin
drwxr-xr-x   8 shane  staff       272 Aug 22 10:03 erts-6.1
drwxr-xr-x  21 shane  staff       714 Aug 22 10:03 lib
drwxr-xr-x   5 shane  staff       170 Aug 22 10:03 releases
-rw-r--r--   1 shane  staff  10999433 Aug 22 10:03 my_app-0.0.1.tar.gz
`}</Code>
)}

${(
  <InlineCode>{`bin`}</InlineCode>
)} contains our generated executables for running our application. The ${(
  <InlineCode>{`bin/my_app`}</InlineCode>
)} executable is what we will eventually use to issue commands to our application.

${(
  <InlineCode>{`erts-6.1`}</InlineCode>
)} contains all necessary files for the Erlang run-time system, pulled from our build environment.

${(
  <InlineCode>{`lib`}</InlineCode>
)} contains the compiled BEAM files for our applicaiton and all of our dependencies. This is where all of your hard work goes.

${(
  <InlineCode>{`releases`}</InlineCode>
)} is the home for our releases, being used to house any release-dependent configurations and scripts that exrm finds necessary for running our application.

The tarball is our release in archive form, ready to be shipped off to our hosting environment.

### Testing our release

Before deploying our release, we should make sure that it runs on our build environment. To do that, we will issue the ${(
  <InlineCode>{`console`}</InlineCode>
)} command to our executable, essentially running our application via ${(
  <InlineCode>{`iex`}</InlineCode>
)}.

${(
  <Code>{`
$ rel/my_app/bin/my_app console
Exec: /Users/shane/code/elixir/my_app/rel/my_app/erts-6.1/bin/erlexec -boot /Users/shane/code/elixir/my_app/rel/my_app/releases/0.0.1/my_app -env ERL_LIBS /Users/shane/code/elixir/my_app/rel/my_app/lib -config /Users/shane/code/elixir/my_app/rel/my_app/releases/0.0.1/sys.config -pa /Users/shane/code/elixir/my_app/rel/my_app/lib/consolidated -args_file /Users/shane/code/elixir/my_app/rel/my_app/releases/0.0.1/vm.args -user Elixir.IEx.CLI -extra --no-halt +iex -- console
Root: /Users/shane/code/elixir/my_app/rel/my_app
/Users/shane/code/elixir/my_app/rel/my_app
Erlang/OTP 17 [erts-6.1] [source-d2a4c20] [64-bit] [smp:4:4] [async-threads:10] [hipe] [kernel-poll:false]

Interactive Elixir (0.15.2-dev) - press Ctrl+C to exit (type h() ENTER for help)
iex(my_app@127.0.0.1)1>
`}</Code>
)}

This is the point where your application will crash if it fails to start a child application. However, if all goes well, you should be dropped into an ${(
  <InlineCode>{`iex`}</InlineCode>
)} prompt. Congratulations! We're ready to deploy our application!

## Deploy! Deploy!

Now comes the easy part! There are many ways for us to get our tarballed release to our hosting environment, so you have a bit of free reign in this step.

In our example, we'll use SCP to upload to a remote server.

${(
  <Code>{`
$ scp -i ~/.ssh/id_rsa.pub rel/my_app/my_app-0.0.1.tar.gz ubuntu@hostname.com:/home/ubuntu
my_app-0.0.1.tar.gz                100%   18MB  80.0KB/s   03:48
`}</Code>
)}

Hooray! Let's SSH into that environment to set our application up.

${(
  <Code>{`
$ ssh -i ~/.ssh/id_rsa.pub ubuntu@hostname.com
$ sudo mkdir -p /app
$ sudo chown ubuntu:ubuntu /app
$ cd /app
$ tar xfz /home/ubuntu/my_app-0.0.1.tar.gz
`}</Code>
)}

See? I told you it would be easy.

## Exposè

We're getting close. Can you feel it?

### Set up our init system

First step in exposing our application to the world is ensuring that our application is running in case of a system restart, expected or unexpected. To do this, we will need to create an init script for our hosting environment's init system, be it ${(
  <InlineCode>{`systemd`}</InlineCode>
)}, ${<InlineCode>{`upstart`}</InlineCode>}, or whatever.

In this case, we'll be using ${(
  <InlineCode>{`upstart`}</InlineCode>
)} as our OS is Ubuntu, and ${(
  <InlineCode>{`upstart`}</InlineCode>
)} has been bundled with Ubuntu since 6.10. Let's edit our init script with ${(
  <InlineCode>{`sudo vi /etc/init/my_app.conf`}</InlineCode>
)}

${(
  <Code syntax="upstart">{`
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
`}</Code>
)}

Here, we've told ${(
  <InlineCode>{`upstart`}</InlineCode>
)} a few basic things about how we want it to handle our application. If you need to know how to do somthing in particular, take a look at the [${(
  <InlineCode>{`upstart`}</InlineCode>
)} cookbook][5] for loads of information on it. We'll kick off the first start of our application with ${(
  <InlineCode>{`sudo start my_app`}</InlineCode>
)}.

One key point to notice is that we're instructing ${(
  <InlineCode>{`upstart`}</InlineCode>
)} to run our release's ${(
  <InlineCode>{`bin/my_app start`}</InlineCode>
)} command, which boostraps our application and runs it as a daemon.

#### exrm commands

Along with the ${(
  <InlineCode>{`start`}</InlineCode>
)} command, exrm bundles a few others with our application that are equally useful. Check out the [exrm docs][1] for details on what's possible.

##### ${<InlineCode>{`ping`}</InlineCode>}

The ${(
  <InlineCode>{`ping`}</InlineCode>
)} command is a great sanity check when you need to ensure your application is running:

${(
  <Code>{`
$ bin/my_app ping
pong
`}</Code>
)}

Or to see if it isn't:

${(
  <Code>{`
$ bin/my_app ping
Node 'my_app@127.0.0.1' not responding to pings.
`}</Code>
)}

##### ${<InlineCode>{`remote_console`}</InlineCode>}

${(
  <InlineCode>{`remote_console`}</InlineCode>
)} will be your friend when debugging is in order. It allows you to attach an IEx console to your running application. When closing the console, your application continues to run.

${(
  <Code>{`
$ bin/my_app remote_console
Erlang/OTP 17 [erts-6.1] [source-d2a4c20] [64-bit] [smp:4:4] [async-threads:10] [hipe] [kernel-poll:false]

Interactive Elixir (0.15.2-dev) - press Ctrl+C to exit (type h() ENTER for help)
iex(my_app@127.0.0.1)1>
`}</Code>
)}

##### ${<InlineCode>{`upgrade`}</InlineCode>}

Although at the time of writing (25 Aug 2014) there is an [open issue with upgrading an app with exrm][6], the ${(
  <InlineCode>{`upgrade`}</InlineCode>
)} command allows you to upgrade your application to a newer codebase without downtime. Awesome, right?

##### ${<InlineCode>{`stop`}</InlineCode>}

You may run into situations where your application needs to stop. Look no further than the ${(
  <InlineCode>{`stop`}</InlineCode>
)} command.

${(
  <Code>{`
$ bin/my_app stop
ok
`}</Code>
)}

### Set up our web server

In a lot of cases, you're going to have more than one application running in your hosting environment, all of which might need to be accessible on port 80. Since only one application can listen on a single port at a time, we need to use something to proxy our application. You will typically see Apache (with ${(
  <InlineCode>{`mod_proxy`}</InlineCode>
)} enabled) or nginx used for this, and we'll be setting up nginx in this case.

Let's create our config file for our application. By default, everything in ${(
  <InlineCode>{`/etc/nginx/sites-enabled`}</InlineCode>
)} is included into the main ${(
  <InlineCode>{`/etc/nginx/nginx.conf`}</InlineCode>
)} file that is used to configure nginx's runtime environment. Standard practice is to create our file in ${(
  <InlineCode>{`/etc/nginx/sites-available`}</InlineCode>
)} and make a symbolic link to it in ${(
  <InlineCode>{`/etc/nginx/sites-enabled`}</InlineCode>
)}.

> **Note:** These points hold true for Apache as well, but the steps to accomplish them are slightly different.

${(
  <Code>{`
$ sudo touch /etc/nginx/sites-available/my_app
$ sudo ln -s /etc/nginx/sites-available /etc/nginx/sites-enabled
$ sudo vi /etc/nginx/sites-available/my_app
`}</Code>
)}

Contents of our ${(
  <InlineCode>{`/etc/nginx/sites-available/my_app`}</InlineCode>
)} file:

${(
  <Code syntax="nginx">{`
upstream my_app {
    server 127.0.0.1:8888;
}
server{
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
`}</Code>
)}

Like our ${(
  <InlineCode>{`upstart`}</InlineCode>
)} script, this nginx config is basic. Look to the [nginx wiki][7] for steps to configure any more involved features. Restart nginx with ${(
  <InlineCode>{`sudo service nginx restart`}</InlineCode>
)} to load our new config.

At this point, we should be able to see our application if we visit ${(
  <InlineCode>{`http://hostname.com/`}</InlineCode>
)} if everything has been successful up to this point.

[1]: https://github.com/bitwalker/exrm
[2]: https://hex.pm
[3]: https://github.com/bitwalker/exrm#common-issues
[4]: https://github.com/bitwalker/exrm#configuration
[5]: http://upstart.ubuntu.com/cookbook/
[6]: https://github.com/bitwalker/exrm/issues/56
[7]: http://wiki.nginx.org/Main
`);
