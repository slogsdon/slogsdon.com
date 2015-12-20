#lang pollen
◊define-meta[title]{Acvte}
◊define-meta[author]{shane}
◊define-meta[publish-date]{2013-09-02}
◊define-meta[tags]{acvte, golang}

◊h2{What it is}

A markdown blog based off of @natew's ◊a[#:href "https://github.com/natew/obtvse2"]{obtvse2}, which was originally
inspired by ◊a[#:href "https://svbtle.com"]{svbtle}, using Today theme contributed to obtvse2 by
◊a[#:href "https://github.com/shilov"]{@shilov}. This is basically a direct port of obtvse2 using the
◊a[#:href "http://robfig.github.io/revel/"]{revel framework} for go, and it was never intended for it to be any
more than that. This project was just an exercise in getting comfortable
with go and revel.

◊h2{What it isn't}

Acvte is definitely not a full CMS like WordPress. There aren't any plugins or themes strewn across the Internet. It's also not a static site generator like Jekyll. Acvte is fully dynamic, backed by your favorite database.

◊h2{Demo}

Head over to ◊a[#:href "http://acvte.shanelogsdon.com"]{acvte's demo site} to take a look. Feel free to login to the ◊a[#:href "http://acvte.shanelogsdon.com/admin"]{admin} with the username ◊code{demouser} and the password ◊code{demopassword}. Once you've had a chance to look over things, check out the source code over at ◊a[#:href "https://github.com/slogsdon/acvte"]{github}. Fork it. Clone it. Do whatever with it, but do just that. Do ◊em{something} with it.

◊h2{Getting Started}

After ◊a[#:href "http://golang.org/doc/install"]{getting started and installing go}, using acvte is easy. Assuming your ◊code{$GOPATH} is setup correctly:

◊highlight['bash]{
# Install the revel cli
$ go get github.com/robfig/revel/revel
# Grab a copy of acvte
$ go get github.com/slogsdon/acvte
# Run locally for testing with
$ revel run github.com/slogsdon/acvte
# Build a production release with
$ revel build github.com/slogsdon/acvte /path/to/save/build
}

◊h2{Configuring}

◊h3{Database}

Configuring acvte for your database is as easy as editing ◊code{src/github.com/slogsdon/acvte/conf/app.conf} in your build directory. Currently, MySQL, Postgres, SQLite3 are supported. Here are the entries for the demo site:

◊highlight['toml]{
db.driver = mysql
db.user = demouser
db.password = demopassword
db.dbname = blog
db.protocol =
db.address =
db.params = charset=utf8&parseTime=true&loc=Local
}

Just look for those, and plug in your settings. The only required items are ◊code{db.driver} and ◊code{db.dbname} as your chosen driver should use defaults for the others if they apply.

◊h3{Frontend Personalization}

Personalization is done through the ◊code{app.conf} file as well. Setting any of the ◊code{info.} config entries will affect the frontend only, outputting the data you specify or turning off features if you set some to ◊code{false}. Here's a list of currently available options and their expected data type:

◊highlight['toml]{
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
}

◊h3{Allowing Publishing with Draft}

Currently, publishing inside of Draft is the only feature that uses the ◊code{app.secret} (at least as far as acvte is concerned). Setting the option to true merely allows the route for the draftin.com webhook to accept ◊code{POST} requests, otherwise, it always returns false.

If you turn this feature on, please create a unique value for ◊code{app.secret} to increase security. Verification of the ◊code{app.secret} is only one of the steps taken to ensure the request is legitimate, but it is considered best practice to set your own value to use.

Once turned on and with your ◊code{app.secret} set to a unique value, head over to ◊a[#:href "https://draftin.com/publishers"]{Draft's settings page}, and add a webhook URL for your account that points to ◊code{http://[your domain here]/webhook/draftin/[your app.secret value]}.

Draft sends the email associated with your account in the request. Please ensure it matches the email attached to your user account inside of acvte as this is the second step in verifying requests to this webhook.

◊h2{TODO}

◊ul{
  ◊li{Allow for new user creation}
  ◊li{Create a new default design (?)}
  ◊li{Look into allowing environment variables for database configuration}
  ◊li{Generate migrations for database schema, or at the very least, add a schema dump to git}
  ◊li{Allow for MongoDB support with mgo}
}

◊h4{Note}

As of this writing, revel and acvte are still in a state of high development. They should be stable enough for a production environment, but there are no guarantees.

◊h2{License}

See the ◊a[#:href "https://github.com/slogsdon/acvte/blob/master/LICENSE"]{LICENSE} file.
