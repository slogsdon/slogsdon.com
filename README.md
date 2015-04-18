# www.slogsdon.com (slogsdon.com)

### prepare workspace
```
$ git clone https://github.com/slogsdon/slogsdon.com
$ cd slogsdon.com
$ composer install
```

### build the images
```
$ docker build --rm=true -t wordpress-fpm docker-wordpress-fpm
$ docker build --rm=true -t nginx-fpm docker-nginx-fpm
```

### run mariadb
```
$ docker run -d --name mysql \
                --restart always \
                -e MYSQL_ROOT_PASSWORD="my-awesome-password" \
                mariadb
```

### run wordpress fpm
```
$ docker run -d --name wordpress-fpm \
                --restart always \
                --link mysql:mysql \
                -v /path/to/slogsdon.com/wp:/var/www/html \
                wordpress-fpm
```

### run nginx as reverse proxy
```
$ docker run -d --name nginx-fpm \
                --restart always \
                --link wordpress-fpm:fpm \
                --volumes-from wordpress-fpm \
                -p 12345:80 \
                -e VIRTUAL_HOST=www.example.com \
                nginx-fpm
```

### allow for virtual hosts to listen on port 80
```
$ docker run -d --name reverse-proxy \
                --restart always \
                -v /var/run/docker.sock:/tmp/docker.sock \
                -p 80:80 \
                jwilder/nginx-proxy
```

## License

See [LICENSE](https://github.com/slogsdon/slogsdon.com/blob/master/LICENSE) for more details.
