FROM wordpress:fpm
MAINTAINER Shane Logsdon <shane@shanelogsdon.com>

# Install modules
RUN apt-get update && apt-get install -y \
        libmcrypt-dev \
    && docker-php-ext-install mbstring mcrypt

CMD ["php-fpm"]
