import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "Installing nginx/percona/php-fpm with homebrew on Mountain Lion",
  date: "2013-04-14",
  tags: ["devops", "homebrew", "mysql", "nginx", "percona", "php"],
})(markdown(components)`

If it helps anyone else, that's an added bonus, but this is mainly just a reference point for me; I'm always forgetting what all needs to be done setting up a development environment going. [MNPP][1] doesn't seem to work well, and I'm too cheap at the moment to pay for for [MAMP Pro][2]. Plus, MAMP uses Apache which I've been trying to get away from for the past few months because of its slowness.

## Preparation

${(
  <Code syntax="bash">{`
# Get Xcode via the App Store and install command-line tools (1.6+GB)

# Grab homebrew
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

# Grab the taps we'll need later
brew tap josegonzalez/homebrew-php
brew tap homebrew/dupes
`}</Code>
)}

## Install Percona

This is a drop-in replacement for MySQL with built-in speed improvements. Double plus good.

${(
  <Code syntax="bash">{`
brew install percona-server
brew link percona-server
unset TMPDIR
mysql_install_db --verbose --user=${(
    <InlineCode>{`whoami`}</InlineCode>
  )} --basedir="$(brew --prefix percona-server)" --datadir=/usr/local/var/percona --tmpdir=/tmp
mkdir -p ~/Library/LaunchAgents
cp /usr/local/opt/percona-server/homebrew.mxcl.percona-server.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.percona-server.plist
`}</Code>
)}

## Install nginx

This little guy's awesome. No overhead for static files. Can act as a reverse-proxy cache for HTTPS content. I prefer [Varnish][3] for HTTP, though.

${(
  <Code syntax="bash">{`
brew install nginx
sudo cp ${(
    <InlineCode>{`brew --prefix nginx`}</InlineCode>
  )}/homebrew.mxcl.nginx.plist /Library/LaunchDaemons/
sudo sed -i -e 's/${<InlineCode>{`whoami`}</InlineCode>}/root/g' ${(
    <InlineCode>{`brew --prefix nginx`}</InlineCode>
  )}/homebrew.mxcl.nginx.plist
sudo mkdir /var/log/nginx/
`}</Code>
)}

## Install php-fpm

PHP's fastcgi process manager. Kind of a resource hog, but better than using Apache/mod_php.

${(
  <Code syntax="bash">{`
brew install --without-apache --with-fpm --with-mysql php54
sudo cp ${(
    <InlineCode>{`brew --prefix php54`}</InlineCode>
  )}/homebrew-php.josegonzalez.php54.plist  /Library/LaunchAgents/
sudo launchctl load -w /Library/LaunchAgents/homebrew-php.josegonzalez.php54.plist
php-fpm -v
sudo mv /usr/sbin/php-fpm /usr/sbin/php-fpm.bak
sudo ln -s /usr/local/Cellar/php54/5.4.11/sbin/php-fpm /usr/sbin/php-fpm
php-fpm -v
php -v
sudo mv /usr/bin/php /usr/bin/php.bak
sudo ln -s /usr/local/bin/php /usr/bin/php
php -v
echo 'export PATH=$PATH:/usr/local/sbin' &gt;&gt; ~/.zshrc # or ~/.bash_profile
`}</Code>
)}

##### Configuration Files

* ${<InlineCode>{`/usr/local/etc/nginx/nginx.conf`}</InlineCode>}
* ${<InlineCode>{`/usr/local/etc/php/5.4/php.ini`}</InlineCode>}
* ${<InlineCode>{`/usr/local/etc/nginx/fastcgi_params`}</InlineCode>}

Stop nginx with ${<InlineCode>{`nginx -s stop`}</InlineCode>}, start with ${(
  <InlineCode>{`nginx`}</InlineCode>
)}, and reload config with ${(
  <InlineCode>{`nginx -s reload`}</InlineCode>
)}. Homebrew installs under ${<InlineCode>{`/usr/local`}</InlineCode>}, so ${(
  <InlineCode>{`sudo`}</InlineCode>
)} shouldn't be needed when issuing those commands.

Percona steps from [Wizard Mode][4]. nginx and php-fpm steps from [Matthew Holt][5].

[1]: http://getmnpp.org
[2]: http://www.mamp.info/en/mamp-pro/
[3]: https://www.varnish-cache.org/
[4]: http://wizardmode.com/2012/06/apache-php-mysql-dev-on-os-x-lion-with-a-minimum-of-pain/
[5]: http://mwholt.blogspot.com/2013/03/install-nginxphpmysql-on-os-x-mountain.html
`);
