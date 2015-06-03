vcl 4.0;

backend default {
  .host = "backend-host";
  .port = "80";
}

acl purge {
  "localhost";
  "backend-host";
}

sub vcl_recv {
  if (req.method == "PURGE") {
    if (client.ip !~ purge) {
      return(synth(405, "Not allowed."));
    }

    if (req.http.X-Purge-Method) {
      if (req.http.X-Purge-Method ~ "(?i)regex") {
        call purge_regex;
      } elsif (req.http.X-Purge-Method ~ "(?i)exact") {
        call purge_exact;
      } else {
        call purge_page;
      }
    } else {
      # No X-Purge-Method header was specified.
      # Do our best to figure out which one they want.
      if (req.url ~ "\.\*" || req.url ~ "^\^" || req.url ~ "\$$" || req.url ~ "\\[.?*+^$|()]") {
        call purge_regex;
      } elsif (req.url ~ "\?") {
        call purge_exact;
      } else {
        call purge_page;
      }
    }
    return(synth(200, "Purged."));
  }

  if (req.http.Accept-Encoding) {
    #revisit this list
    if (req.url ~ "\.(gif|jpg|jpeg|swf|flv|mp3|mp4|pdf|ico|png|gz|tgz|bz2)(\?.*|)$") {
      unset req.http.Accept-Encoding;
    } elsif (req.http.Accept-Encoding ~ "gzip") {
      set req.http.Accept-Encoding = "gzip";
    } elsif (req.http.Accept-Encoding ~ "deflate") {
      set req.http.Accept-Encoding = "deflate";
    } else {
      unset req.http.Accept-Encoding;
    }
  }
  if (req.url ~ "\.(gif|jpg|jpeg|swf|css|js|flv|mp3|mp4|pdf|ico|png)(\?.*|)$") {
    unset req.http.cookie;
    set req.url = regsub(req.url, "\?.*$", "");
  }
  if (req.url ~ "\?(utm_(campaign|medium|source|term)|adParams|client|cx|eid|fbid|feed|ref(id|src)?|v(er|iew))=") {
    set req.url = regsub(req.url, "\?.*$", "");
  }
  if (req.http.cookie) {
    if (req.http.cookie ~ "(wordpress_|wp-settings-)") {
      return(pass);
    } else {
      unset req.http.cookie;
    }
  }
}

sub vcl_backend_response {
  if (bereq.url ~ "wp-(login|admin)" || bereq.url ~ "preview=true" || bereq.url ~ "xmlrpc.php") {
    set beresp.uncacheable = true;
    set beresp.ttl = 120s;
    return(deliver);
  }
  if ( (!(bereq.url ~ "(wp-(login|admin)|login)")) || (bereq.method == "GET") ) {
    unset beresp.http.set-cookie;
  }
  if (bereq.url ~ "\.(gif|jpg|jpeg|swf|css|js|flv|mp3|mp4|pdf|ico|png)(\?.*|)$") {
    set beresp.ttl = 365d;
  }
  # purge
  set beresp.http.X-Req-Host = bereq.http.host;
  set beresp.http.X-Req-URL = bereq.url;
  set beresp.http.X-Req-URL-Base = regsub(bereq.url, "\?.*$", "");
}

sub vcl_deliver {
  # multi-server webfarm? set a variable here so you can check
  # the headers to see which frontend served the request
  #   set resp.http.X-Server = "server-01";
  if (obj.hits > 0) {
    set resp.http.X-Cache = "HIT";
  } else {
    set resp.http.X-Cache = "MISS";
  }

  # nginx
  unset resp.http.Server;
  # varnish
  unset resp.http.Via;
  unset resp.http.X-Varnish;
  # hhvm
  unset resp.http.X-Powered-By;
  # purge
  unset resp.http.X-Req-Host;
  unset resp.http.X-Req-URL;
  unset resp.http.X-Req-URL-Base;
}

# sub vcl_hit {
#   if (req.method == "PURGE") {
#     purge;
#     return(synth(200, "OK"));
#   }
# }

# sub vcl_miss {
#   if (req.method == "PURGE") {
#     purge;
#     return(synth(404, "Not cached"));
#   }
# }

# Regex purging
# Treat the request URL as a regular expression.
sub purge_regex {
  ban("obj.http.X-Req-URL ~ " + req.url + " && obj.http.X-Req-Host == " + req.http.host);
}

# Exact purging
# Use the exact request URL (including any query params)
sub purge_exact {
  ban("obj.http.X-Req-URL == " + req.url + " && obj.http.X-Req-Host == " + req.http.host);
}

# Page purging (default)
# Use the exact request URL, but ignore any query params
sub purge_page {
  set req.url = regsub(req.url, "\?.*$", "");
  ban("obj.http.X-Req-URL-Base == " + req.url + " && obj.http.X-Req-Host == " + req.http.host);
}
