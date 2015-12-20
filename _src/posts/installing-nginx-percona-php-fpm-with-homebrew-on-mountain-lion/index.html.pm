#lang pollen
◊define-meta[title]{Installing nginx/percona/php-fpm with homebrew on Mountain Lion}
◊define-meta[author]{shane}
◊define-meta[publish-date]{2013-04-14}
◊define-meta[tags]{devops, homebrew, mysql, nginx, percona, php}

If it helps anyone else, that's an added bonus, but this is mainly just a reference point for me;
I'm always forgetting what all needs to be done setting up a development environment going.
◊a[#:href "http://getmnpp.org"]{MNPP} doesn't seem to work well, and I'm too cheap at the moment
to pay for for ◊a[#:href "http://www.mamp.info/en/mamp-pro/"]{MAMP Pro}. Plus, MAMP uses Apache
which I've been trying to get away from for the past few months because of its slowness.

◊h2{Preparation}

◊highlight['bash]{
# Get Xcode via the App Store and install command-line tools (1.6+GB)

# Grab homebrew
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

# Grab the taps we'll need later
brew tap josegonzalez/homebrew-php
brew tap homebrew/dupes
}

◊h2{Install Percona}

This is a drop-in replacement for MySQL with built-in speed improvements. Double plus good.

◊highlight['bash]{
brew install percona-server
brew link percona-server
unset TMPDIR
mysql_install_db --verbose --user=`whoami` --basedir="$(brew --prefix percona-server)" --datadir=/usr/local/var/percona --tmpdir=/tmp
mkdir -p ~/Library/LaunchAgents
cp /usr/local/opt/percona-server/homebrew.mxcl.percona-server.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.percona-server.plist
}

◊h2{Install nginx}

This little guy's awesome. No overhead for static files. Can act as a reverse-proxy cache for HTTPS content. I prefer ◊a[#:href "https://www.varnish-cache.org/"]{Varnish} for HTTP, though.

◊highlight['bash]{
brew install nginx
sudo cp `brew --prefix nginx`/homebrew.mxcl.nginx.plist /Library/LaunchDaemons/
sudo sed -i -e 's/`whoami`/root/g' `brew --prefix nginx`/homebrew.mxcl.nginx.plist
sudo mkdir /var/log/nginx/
}

◊h2{Install php-fpm}

PHP's fastcgi process manager. Kind of a resource hog, but better than using Apache/mod_php.

◊highlight['bash]{
brew install --without-apache --with-fpm --with-mysql php54
sudo cp `brew --prefix php54`/homebrew-php.josegonzalez.php54.plist  /Library/LaunchAgents/
sudo launchctl load -w /Library/LaunchAgents/homebrew-php.josegonzalez.php54.plist
php-fpm -v
sudo mv /usr/sbin/php-fpm /usr/sbin/php-fpm.bak
sudo ln -s /usr/local/Cellar/php54/5.4.11/sbin/php-fpm /usr/sbin/php-fpm
php-fpm -v
php -v
sudo mv /usr/bin/php /usr/bin/php.bak
sudo ln -s /usr/local/bin/php /usr/bin/php
php -v
echo 'export PATH=$PATH:/usr/local/sbin' >> ~/.zshrc # or ~/.bash_profile
}

◊h5{Configuration Files}

◊ul{
  ◊li{◊code{/usr/local/etc/nginx/nginx.conf}}
  ◊li{◊code{/usr/local/etc/php/5.4/php.ini}}
  ◊li{◊code{/usr/local/etc/nginx/fastcgi_params}}
}

Stop nginx with ◊code{nginx -s stop}, start with ◊code{nginx}, and reload config with ◊code{nginx -s reload}. Homebrew installs under ◊code{/usr/local}, so ◊code{sudo} shouldn't be needed when issuing those commands.

Percona steps from ◊a[#:href "http://wizardmode.com/2012/06/apache-php-mysql-dev-on-os-x-lion-with-a-minimum-of-pain/"]{Wizard Mode}. nginx and php-fpm steps from ◊a[#:href "http://mwholt.blogspot.com/2013/03/install-nginxphpmysql-on-os-x-mountain.html"]{Matthew Holt}.
