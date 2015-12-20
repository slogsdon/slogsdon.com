#lang pollen
◊define-meta[title]{WordPress, Docker, and You}
◊define-meta[author]{shane}
◊define-meta[publish-date]{2015-04-25}
◊define-meta[tags]{deployment, devops, docker, php, wordpress}
◊define-meta[description]{Wordpress, Docker, and your site can work together in harmony with the right configuration. Follow along as I spill the beans.}

Once again, I got bored with my website and decided to change it up. I was using ◊a[#:href "http://jaspervdj.be/hakyll/"]{Hakyll} to generate a set of static files, which were then hosted on ◊a[#:href "http://pages.github.com/"]{GitHub Pages}. Now, I think GitHub pages is great and had been happy hosting my website there for a couple of years now, but with some projects I have in the works, I wanted to go with an actual CMS for a while.

Being a developer, I love me some version control systems and keeping up with emerging technologies, so for the latest version of my site, ◊a[#:href "https://wordpress.org/"]{WordPress}, ◊a[#:href "https://www.docker.com/"]{Docker}, and ◊a[#:href "https://getcomposer.org/"]{Composer} let me blend those two ideas to create something repeatable, scalable, and updatable. Using the following steps, you too can employ these tools to supercharge the setup and deployment of your WordPress site(s).

◊h2{Disclaimer}

While I have some pretty extensive experience developing, hosting, managing, and tuning WordPress installations, I am by no means an expert. I am using the following information to host my own website (the one you're reading right now), but your mileage can and will vary. Do your due diligence before running a stack like this in production.

◊h2{Preparation}

Here are a few things you'll need:

◊ul{
  ◊li{a host environment. This can be a ◊a[#:href "https://www.vagrantup.com/"]{Vagrant} instance or a server through your VPS provider.}
  ◊li{Docker and a compatible OS. Take a look at the ◊a[#:href "https://docs.docker.com/installation/#installation"]{installation guides} for tips.}
  ◊li{a set of WordPress files. If you're not using a VCS, step 1 below can be skipped, but you should consider versioning your code.}
}

◊h2{The Steps}

◊h3{1. Prepare Your Workspace with Git and Composer}

What's Composer? Straight from the ◊a[#:href "https://getcomposer.org/doc/00-intro.md#introduction"]{horse's mouth}:

◊blockquote{Composer is a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you.}

Sounds great, huh? With a little help, we can use Composer to keep our dependencies (WordPress, plugins, themes, and more) and use Git to keep track of everything else. Let's check out this very site to see how this can be done.

◊highlight['bash]{
$ git clone https://github.com/slogsdon/slogsdon.com
$ cd slogsdon.com
$ composer install
}

I've cloned the site's repository from GitHub which contains, among other things, a ◊code{composer.json} file, a manifest that lets Composer know what to download, from where to download, and to where the files need to be placed.

◊highlight['json]{
{
  "name": "slogsdon/slogsdon.com",
  "homepage": "https://github.com/slogsdon/slogsdon.com",
  "license": "MIT",
  "authors": [
    {
      "name": "Shane Logsdon",
      "email": "shane@shanelogsdon.com",
      "homepage": "http://www.slogsdon.com",
      "role": "Developer"
    }
  ],
  "repositories": [
    {
      "type": "composer",
      "url": "http://wpackagist.org"
    }
  ],
  "require": {
    "php": "&gt;=5.4",
    "johnpbloch/wordpress": "4.1.1",
    "slogsdon/staticwp": "*@dev",
    "wpackagist-plugin/google-analytics-for-wordpress": "*",
    "wpackagist-plugin/jetpack": "*",
    "wpackagist-plugin/wordpress-seo": "*"
  },
  "extra": {
    "wordpress-install-dir": "wp",
    "installer-paths": {
      "wp/wp-content/plugins/{$name}": ["type:wordpress-plugin"],
      "wp/wp-content/themes/{$name}": ["type:wordpress-theme"],
      "wp/wp-content/mu-plugins/{$name}": ["type:wordpress-muplugin"]
    }
  }
}
}

Once in the directory, ◊code{composer install} reads this manifest to download the dependencies listed in the ◊code{require} property. All of the WordPress related files get installed to their proper locations under the ◊code{wp} directory and everything else is placed in the Composer default of ◊code{vendor}.

◊h3{2. Build Your Images with Docker}

Docker's been creating a buzz ever since its release in 2013, but in case you haven't heard about it, Docker is "an open platform for distributed applications for developers and sysadmins." Without all the marketing lingo, Docker can let you create small, composable services, each in a somewhat isolated environment. It can be great for development setups or hosting a fleet of services across datacenters.

My ◊code{composer.json} would get lonely all by itself, so lucky for it, it's joined by ◊code{docker-wordpress-fpm} and ◊code{docker-nginx-fpm}. Their names should give an indication of their purpose, but to spell things out, those two directories hold configurations for hosting the site with Docker. ◊code{docker-wordpress-fpm} describes a Docker image that hosts WordPress behind ◊a[#:href "http://php.net/manual/en/install.fpm.php"]{PHP-FPM}, a FastCGI process manager aimed at supporting heavy-loaded PHP websites and applications. Meanwhile, ◊code{docker-nginx-fpm} describes a Docker image for reverse-proxying PHP-FPM so that it responds to standard HTTP requests.

◊highlight['bash]{
$ docker build --rm=true -t wordpress-fpm docker-wordpress-fpm
$ docker build --rm=true -t nginx-fpm docker-nginx-fpm
}

Both calls to ◊code{docker build} essentially perform the same action. They each build a Docker image, discarding intermediate steps (◊code{--rm=true}), by reading a ◊code{Dockerfile} contained in a source directory (the last parameter of each line). The image is tagged with ◊code{-t [name]}, allowing us to reference the image when creating containers later down the road. If we're so inclined, we can tag our images as ◊code{[owner]/[name]} and push our images to the Docker registry, mostly used for public images but can be used for private ones.

At this point, we've merely created images, but we will need to run those images as containers for our new WordPress application to come to life.

◊h3{3. Run MariaDB in a Container}

Any good WordPress site is backed by a MySQL database, where all posts, pages, comments, options, etc. Back when WordPress was coming into its own, I'm not sure if there was an alternative to MySQL, but today, developers who with a need for MySQL ◊em{do} have options, one of those being ◊a[#:href "https://mariadb.org/"]{MariaDB}.

◊blockquote{MariaDB 10 is an enhanced, high performance, free and open source alternative to MySQL that helps the world's busiest websites deliver more content faster.}

I don't know about you, but that sounds like something I want behind my website. Because MariaDB is entirely compatible with MySQL-backed services, there is nothing stopping me from getting it to serve my site's data to WordPress to display.

◊highlight['bash]{
$ docker run -d --name mysql \
                --restart always \
                -e MYSQL_ROOT_PASSWORD="my-awesome-password" \
                mariadb
}

We can finally say we have a Docker container running. Let's run through what happened. ◊code{docker run} has the ability to run in detached mode, which ◊code{-d} represents, letting our service and its container continue to run in the background. Sanely named containers are easier to manage IMHO, so ◊code{--name mysql} will let us reference the container from other services and the command line by a simple ◊code{mysql}. Using ◊code{--restart always} alerts Docker to restart the container if it were to stop for whatever reason. There are other values available for this option, but with a service like this, it is best to use this restart policy.

The ◊code{-e} option lets environment variables be set inside the container, in this case the root password for MariaDB. Many images allow for configuration via environment variables to increase reusability. Finally, we let ◊code{docker run} know what image we wish to run. This can refer to a local image or to a remote one, and in the case of remote images, they will be pulled from the registry if it is not already on the machine.

◊h3{4. Serve WordPress with Docker}

With our database running, it's time to get our site up and going as well.

◊highlight['bash]{
$ docker run -d --name wordpress-fpm \
                --restart always \
                --link mysql:mysql \
                -v /path/to/slogsdon.com/wp:/var/www/html \
                wordpress-fpm
$ docker run -d --name nginx-fpm \
                --restart always \
                --link wordpress-fpm:fpm \
                --volumes-from wordpress-fpm \
                -p 12345:80 \
                -e VIRTUAL_HOST=www.slogsdon.com \
                nginx-fpm
}

Again, we're running our containers in detached mode (they are services after all) and passing similar options to ◊code{docker run} as we did with our ◊code{mysql} container. There are a few new options we are taking advantage of, so let's cover them since they help connect all of these containers. A big one is the ◊code{--link [container-name]:[name]} option which allows the container being started to connect to another container to use the resources exposed by the linked container. With the two containers above, ◊code{wordpress-fpm} links to ◊code{mysql} so WordPress has somewhere to save data, and ◊code{nginx-fpm} links to ◊code{wordpress-fpm} so it has something to reverse proxy. These two links are the driving force behind our new stack, so be sure that their ◊code{[container-name]}'s match the names of your containers and the ◊code{[name]}'s remain as is.

◊blockquote{◊strong{Note:} The ◊code{wordpress-fpm} will use it's link to ◊code{mysql} to build a ◊code{wp-config.php} file for you when it is first run, configuring the basic options like database connection information and security keys. Now while this won't work for all sites, it will work for most, so look into using a custom ◊code{wp-config.php} if you run into issues}

◊code{-v [host-dir]:[container-dir]} lets you map a directory in the host environment to a volume in the Docker container, sharing whatever exists in that directory between the two. Each can have the possibility of writing to it (and usually do), so be careful here. The benefit of creating a volume in this manner is that you can recreate the container at a later time and will be able to reuse any data created/used by that container. This is great for WordPress sites for things like uploads where it is nice when they don't go missing. Boo 404's! ◊code{--volumes-from [container-name]} works with a linked container to share a volume between the two. Here, ◊code{nginx-fpm} will try to serve requested URLs from nginx before sending the request to PHP-FPM/Wordpress to handle, helping speed up your response times considering nginx is better at serving static files than PHP-FPM.

◊h3{5. Virtual Host Your Port 80 aka Time for Magic}

At this point, you should have these three containers running on your host (your container ID's will be different, you'll see more information. I stripped some out for readability here):

◊highlight['bash]{
$ docker ps
CONTAINER ID        IMAGE                           NAMES
f34fb2b343b1        slogsdon/nginx-fpm:latest       nginx-fpm
c6ded963bd1c        slogsdon/wordpress-fpm:latest   wordpress-fpm
936cacc00be0        mariadb:latest                  mysql
}

You should also be able to venture to ◊code{http://[you-ip-here]:12345} and see something that resembles a WordPress site. That's great and all, but do you want your visitors to have to remember that port number? I don't think so. The fix for this is to use something to multiplex requests to port 80 (standard HTTP) based on domain name.

For that, we look to nginx once again, and specifically, the ◊a[#:href "registry.hub.docker.com/u/jwilder/nginx-proxy/"]{◊code{jwilder/nginx-proxy}} Docker image. ◊code{jwilder/nginx-proxy} is where the magic happens thanks to its volume that gives it access to your host's Docker socket, allowing it to listen to Docker's events (like when containers start) and the options passed to them (like environment variables). It uses this information to recreate nginx virtual host configs on the fly when it sees a ◊code{VIRTUAL_HOST} environment variable attached to a container, and along with an exposed port (◊code{-p [exposed-port]:[port-in-container]}), routes requests to your domain to the correct Docker container. Let's give it a go.

◊highlight['bash]{
$ docker run -d --name nginx-proxy \
                --restart always \
                -v /var/run/docker.sock:/tmp/docker.sock \
                -p 80:80 \
                jwilder/nginx-proxy
}

The ◊code{nginx-proxy} is now listening on port 80, and for any request to ◊code{www.slogsdon.com}, it sends those requests to the ◊code{nginx-fpm} container to serve! With such a generalized reverse proxy, you can keep a single container like ◊code{nginx-proxy} listening on port 80 and have multiple containers (sites) running on other ports and domains, and no one else would be the wiser. Each site would be running in its own environment, adding a small layer of security in case one of those sites gets compromised.

◊h2{Wrap Up}

This is merely a peak into what's possible with WordPress and Docker, even though this post ended up fairly dense. Techniques like this are similar to those used by the big names in WordPress hosting, but if you're a smaller reseller/webmaster, this can help lower your hard costs while maintaining a better level of service for your customers.

If this interested you, keep reading into ◊a[#:href "https://docs.docker.com/userguide/"]{Docker's documentation} to get to know the technology and any gotchas when running this stuff in production.
