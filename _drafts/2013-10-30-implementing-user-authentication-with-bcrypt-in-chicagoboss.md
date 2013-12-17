---
layout: post
title: Implementing User Authentication with bcrypt in ChicagoBoss
permalink: erlang/implementing-user-authentication-with-bcrypt-in-chicagoboss
date: 2013-10-30 03:10:17
---

Ever since I learned the error in using basic `MD5`/`SHA1`/`SHA256`/etc. hashes for storing password hashes, I always see to adding in `bcrypt` hashing in the authentication for my web applications, but [ChicagoBoss](http://www.chicagoboss.org/), one of my new go-to web frameworks along with [Revel](http://robfig.github.io/revel/) (yay, concurrency!), doesn't have `bcrypt` support added in by default. Let's go ahead and add that ourselves.

Before we get into things, I just want you to be aware that this is a very basic implementation. There are many things I plan on changing (I may end up updating the [gist](https://gist.github.com/slogsdon/7226067) as well), so please follow suit. Use this as a starting point, and adapt this to the needs of your project.

## Initial Configuration

Let's add `bcrypt` to our `rebar.config` as a dependency:

<script src="https://gist.github.com/slogsdon/7226067.js?file=02_rebar.config"></script>

More than likely, you'll already have most of this except for line 3. To grab the source and compile `bcrypt`, run `./rebar get-deps compile`.

Don't forget to configure a persistent data store for your user accounts in `boss.config`. This should work with the default `mock` `db_adapter`, but you will lose all data once you stop/restart the application.

## Loading `bcrypt`

We need `bcrypt`'s application to be running before we can use it. Sadly, I have yet to figure out the magic sauce to have ChicagoBoss run `bcrypt` automatically, so in the mean time, we'll use an init script to help us out:

<script src="https://gist.github.com/slogsdon/7226067.js?file=03_module_10_bcrypt.erl"></script>

All modules with an exported `init/0` in `./priv/init` are loaded and called at initial application start. This is helpful for adding watches with `boss_news` as well.

## Our User Model

Here's a basic user model for our account information with a few convenience functions sprinkled in:

<script src="https://gist.github.com/slogsdon/7226067.js?file=04_test_user.erl"></script>

Set an actual secret for your `SETEC_ASTRONOMY` like I will be.

This model contains one of the items I want to improve upon in the future. Eventually, the session storage will be moved over to [Riak](http://basho.com/riak/) as its bitcask storage backend supports automatic expiry of keys, so I don't have to worry about invalidating old sessions as they expire. Chalk that up as being a lazy (smart) programmer.

## A Helper Module

This helper module isn't really necessary, but it does provide a simple place to keep functions that don't really belong in our model. In fact, I see some refactoring that is in order to clean up the model and controllers even further.

<script src="https://gist.github.com/slogsdon/7226067.js?file=05_user_lib.erl"></script>

`user_lib:require_login/1` checks for the presence of session data and validates it, redirecting the request to our login page. If everything is good to go, it returns our `TestUser`.

## Our User Controller

This allows our users to register for an account or login. It might be nice to let the logout in the future.

<script src="https://gist.github.com/slogsdon/7226067.js?file=06_test_user_controller.erl"></script>

## Example Authenticated Controller

In cases where we want an entire controller to require authentication, let's have ChicagoBoss make our lives a little bit easier:

<script src="https://gist.github.com/slogsdon/7226067.js?file=07_test_index_controller.erl"></script>

`before_/1` is doing most of the legwork here. It's called before any of our actions, calling `user_lib:require_login` in the process. Note, we can have  `before_` pass our `TestUser` to our actions by adding `TestUser` as a third parameter to our `index` function. This isn't necessary, but if you want to pass the model along to you views, this would be the place to do it.

## Wrapping Up

Now you can start securing your ChicagoBoss applications and not have to use `MD5` hashes (whoo!). I went through quite a few iterations in getting this to actually run without problems, more than likely due to my lack of experience with erlang, so drop me a note if you run into any issues.