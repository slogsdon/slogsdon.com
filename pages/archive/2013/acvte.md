---
title: Acvte
date: 2013-09-02
layout: 'partials::layouts/writing-post'
slug: acvte
---

## What it is

A markdown blog based off of @natew's [obtvse2][1], which was originally inspired by [svbtle][2], using Today theme contributed to obtvse2 by [@shilov][3]. This is basically a direct port of obtvse2 using the [revel framework][4] for go, and it was never intended for it to be any more than that. This project was just an exercise in getting comfortable with go and revel.

<!--more-->

## What it isn't

Acvte is definitely not a full CMS like WordPress. There aren't any plugins or themes strewn across the Internet. It's also not a static site generator like Jekyll. Acvte is fully dynamic, backed by your favorite database.

## Demo

Head over to [acvte's demo site][5] to take a look. Feel free to login to the [admin][6] with the username `demouser` and the password `demopassword`. Once you've had a chance to look over things, check out the source code over at [github][7]. Fork it. Clone it. Do whatever with it, but do just that. Do _something_ with it.

## Getting Started

After [getting started and installing go][8], using acvte is easy. Assuming your `$GOPATH` is setup correctly:

    # Install the revel cli
    $ go get github.com/robfig/revel/revel
    # Grab a copy of acvte
    $ go get github.com/slogsdon/acvte
    # Run locally for testing with
    $ revel run github.com/slogsdon/acvte
    # Build a production release with
    $ revel build github.com/slogsdon/acvte /path/to/save/build

## Configuring

### Database

Configuring acvte for your database is as easy as editing `src/github.com/slogsdon/acvte/conf/app.conf` in your build directory. Currently, MySQL, Postgres, SQLite3 are supported. Here are the entries for the demo site:

    db.driver = mysql
    db.user = demouser
    db.password = demopassword
    db.dbname = blog
    db.protocol =
    db.address =
    db.params = charset=utf8&parseTime=true&loc=Local

Just look for those, and plug in your settings. The only required items are `db.driver` and `db.dbname` as your chosen driver should use defaults for the others if they apply.

### Frontend Personalization

Personalization is done through the `app.conf` file as well. Setting any of the `info.` config entries will affect the frontend only, outputting the data you specify or turning off features if you set some to `false`. Here's a list of currently available options and their expected data type:

    info.name # string - name of the site
    info.tagline # string - tagline/about
    info.email # string
    info.twitter # string - twitter handle
    info.github # string - github handle
    info.use_ga # bool
    info.ga_id # string
    info.use_gauges # bool
    info.gauges_id # string
    info.domain # string - default domain
    info.use_disqus # bool
    info.disqus_id # string

### Allowing Publishing with Draft

Currently, publishing inside of Draft is the only feature that uses the `app.secret` (at least as far as acvte is concerned). Setting the option to true merely allows the route for the draftin.com webhook to accept `POST` requests, otherwise, it always returns false.

If you turn this feature on, please create a unique value for `app.secret` to increase security. Verification of the `app.secret` is only one of the steps taken to ensure the request is legitimate, but it is considered best practice to set your own value to use.

Once turned on and with your `app.secret` set to a unique value, head over to [Draft's settings page][9], and add a webhook URL for your account that points to `http://[your domain here]/webhook/draftin/[your app.secret value]`.

Draft sends the email associated with your account in the request. Please ensure it matches the email attached to your user account inside of acvte as this is the second step in verifying requests to this webhook.

## TODO

* Allow for new user creation
* Create a new default design (?)
* Look into allowing environment variables for database configuration
* Generate migrations for database schema, or at the very least, add a schema dump to git
* Allow for MongoDB support with mgo

#### Note

As of this writing, revel and acvte are still in a state of high development. They should be stable enough for a production environment, but there are no guarantees.

## License

See the [LICENSE][10] file.

[1]: https://github.com/natew/obtvse2
[2]: https://svbtle.com
[3]: https://github.com/shilov
[4]: http://robfig.github.io/revel/
[5]: http://acvte.shanelogsdon.com
[6]: http://acvte.shanelogsdon.com/admin
[7]: https://github.com/slogsdon/acvte
[8]: http://golang.org/doc/install
[9]: https://draftin.com/publishers
[10]: https://github.com/slogsdon/acvte/blob/master/LICENSE
