---
title: "Nginx Push Stream Module: WebSockets/LongPolling Made Easy"
date: 2014-06-03 13:02:00
tags: 
---

## Compile Nginx

```bash
# clone the project
git clone http://github.com/wandenberg/nginx-push-stream-module.git
NGINX_PUSH_STREAM_MODULE_PATH=$PWD/nginx-push-stream-module

# [optional] checkout a specific version
cd nginx-push-stream-module
git checkout tags/0.4.0
cd ..

# get desired nginx version (works with 1.5.x, 1.4.x, 1.3.x, 1.2.x series)
wget http://nginx.org/download/nginx-1.5.13.tar.gz

# unpack, configure and build
tar xzf nginx-1.5.13.tar.gz
cd nginx-1.5.13

# configure (be sure to include any other modules if necessary)
./configure --add-module=../nginx-push-stream-module

# build
make

# install and finish
sudo make install
```

## Setup Nginx

```nginx
location /pub {
    # activate publisher (admin) mode for this location
    push_stream_publisher     admin;

    # query string based channel id
    push_stream_channels_path $arg_id;
}

location ~ /lp/(.*) {
    # activate long-polling mode for this location
    push_stream_subscriber                 long-polling;

    # positional channel path
    push_stream_channels_path              $1;

    # message template
    push_stream_message_template           "{\"id\":~id~,\"channel\":\"~channel~\",\"text\":\"~text~\"}";

    # connection timeout
    push_stream_longpolling_connection_ttl 30s;
}
```

## Setup Our JavaScript Client

```html
<script type="text/javascript" src="/js/pushstream.js"></script>
<script type="text/javascript">
	function handleMessageReceived(text, id, channel) {
		console.log(text);
	}
</script>
```