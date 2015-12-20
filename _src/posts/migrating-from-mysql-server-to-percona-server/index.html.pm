#lang pollen
◊define-meta[title]{Migrating from MySQL Server to Percona Server}
◊define-meta[author]{shane}
◊define-meta[publish-date]{2013-08-06}
◊define-meta[tags]{mysql, percona}

◊h2{What is Percona Server, and why should I care?}

Blogs across the Internet have been benchmarking Percona Server against MySQL Server, e.g. ◊a[#:href "http://www.mysqlperformanceblog.com/2013/05/08/mysql-and-percona-server-in-linkbench-benchmark/"]{MySQL Performance Blog}, and the results continually seem to have Percona ahead in many regards. This increased and stable performance for your database will help ensure performance and reliability in your applications.

According to ◊a[#:href "http://www.percona.com/software/percona-server"]{Percona's site},

◊blockquote{
Percona Server is an enhanced, drop-in MySQL replacement. With Percona Server,

◊ul{
  ◊li{Queries will run faster and more consistently}
  ◊li{You can consolidate servers on powerful hardware}
  ◊li{Sharding is delayed or avoided entirely}
  ◊li{You can save money on hosting fees and power}
  ◊li{You can spend less time tuning and administering}
  ◊li{You can achieve higher uptime}
  ◊li{Troubleshooting does not require guesswork}
}

A free open source solution, Percona Server is a MySQL alternative which offers breakthrough performance, scalability, features, and instrumentation. Self-tuning algorithms and support for extremely high-performance hardware make it the clear choice for organizations that demand excellent performance and reliability from their MySQL database server.
}

◊h2{Alright, how do I get this installed on my server? Will I lose existing data?}

Transitioning to Percona Server is as easy as 1, 2, 3.

◊ol{
  ◊li{Backup your databases with mysqldump or another similar method. (Recommended, but not required.)}
  ◊li{Uninstall MySQL Server with apt-get remove mysql-server (on Ubuntu).}
  ◊li{Install Percona Server with these steps:
    ◊ol{
      ◊li{◊code{apt-key adv --keyserver keys.gnupg.net --recv-keys 1C4CBDCDCD2EFD2A}}
      ◊li{◊code{deb http://repo.percona.com/apt [YOUR UBUNTU VERSION, e.g. quantal for 12.10] main}}
      ◊li{◊code{deb-src http://repo.percona.com/apt [YOUR UBUNTU VERSION] main}}
      ◊li{◊code{apt-get update}}
      ◊li{◊code{apt-get install percona-server-5.5}}
    }
  }
}

The MySQL command-line tools and drivers should continue to work as they did prior to the transition to Percona Server, so your workflow will remain the same for managing and interfacing with Percona Server.
