#lang pollen
◊define-meta[title]{Vagrant is Awesome}
◊define-meta[author]{shane}
◊define-meta[publish-date]{2013-08-07}
◊define-meta[tags]{devops, phalcon, php, vagrant}

I've been working on PHP web apps for years, and over time, my development workflow has remained fairly constant:

◊ol{
  ◊li{Configure new app in apache/nginx}
  ◊li{Starting coding to find out my environment is broken}
  ◊li{Fix my environment}
  ◊li{Continue coding}
  ◊li{Get bored}
  ◊li{See step 1}
}

Managing DevOps items when I should be focusing on building a product is not beneficial to my productivity.

◊h2{Enter ◊a[#:href "http://www.vagrantup.com"]{Vagrant}}

Ever wanted to have a dev environment built for you automatically? Yeah, who doesn't? Vagrant can do that for you. With the help of Oracle's ◊a[#:href "https://www.virtualbox.org"]{VirtualBox}, Vagrant creates a virtual machine, can provision it with the packages and services you define in a text file, and creates helpful links in between your host OS and the guest OS.

◊h2{◊a[#:href "http://www.phalconphp.com"]{Phalcon PHP}}

I need to write another post entitled "Phalcon is Awesome". I've only recently started to develop with the C-extension based PHP framework, but boy does it pack a punch. One phrase before I do a write-up: ◊a[#:href "http://systemsarchitect.net/performance-benchmark-of-popular-php-frameworks/" #:title "Perfomance benchmarks of PHP frameworks"]{~800 requests per second}.

The only downside of using Phalcon is having to compile and load it for use by PHP. ◊code{git clone}-ing the ◊a[#:href "https://github.com/phalcon/cphalcon"]{cphalcon repo} and running the build script is easy enough, but what if you're getting help from a creative that has no idea how to set up a virtual host on their local machine, let alone compiling a PHP extension?

◊h2{Use Vagrant, of course!}

I've been using Vagrant to host a Phalcon project for a while, and I managed to extract out the Vagrant goodies into a stand-alone project: ◊a[#:href "https://github.com/slogsdon/vagrant-phalcon"]{vagrant-phalcon}. With the help of a Puppet manifest and a bash script, vagrant-phalcon helps developers of all skill levels start with Phalcon with an easy ◊code{vagrant up} command. Details from the README.md:

◊blockquote[#:class "no-content"]{
  ◊h4[#:class "no-content"]{Getting Started}

  ◊ol{
    ◊li{Download and install ◊a[#:href "https://www.virtualbox.org"]{VirtualBox}}
    ◊li{Download and install ◊a[#:href "http://www.vagrantup.com"]{Vagrant}}
    ◊li{Clone this repo}
    ◊li{Run ◊code{vagrant up} in the repo directory}
    ◊li{Visit ◊code{http://localhost:8081/} in your favorite browser}
  }

  ◊h5[#:class "no-content"]{Note}

  Nginx is configured by default to use ◊code{./src/Public/} as the root directory. If your public directory differs, be sure to update the ◊code{Vagrantfile} to reflect your needs.
}

While not perfect, it does the job of setting up a Phalcon dev environment quite well, so I felt content with releasing it out into the wild. Happen to find a problem with it or have a suggestion? Submit an ◊a[#:href "https://github.com/slogsdon/vagrant-phalcon/issues"]{issue}, or better yet, submit a ◊a[#:href "https://github.com/slogsdon/vagrant-phalcon/pulls"]{pull request}.
