#lang pollen
◊define-meta[title]{Migrating to Acvte}
◊define-meta[author]{shane}
◊define-meta[publish-date]{2013-08-31}
◊define-meta[tags]{acvte, devops, golang, rails}

Remember ◊a[#:href "http://www.shanelogsdon.com/posts/im-already-tired-of-rails-already/"]{this}? I do. I finally got ◊a[#:href "https://github.com/slogsdon/acvte"]{acvte} to a point where I was comfortable using it in production for this website.

So far, the performance improvement has been totally worth the sixteen days it has taken to get to this point. Check out the memory usage drop that I grabbed from NewRelic:

◊figure{
  ◊img[#:src "http://i.imgur.com/J57L8U7.png"]{}
}

And a more quantitative view:

◊figure{
  ◊img[#:src "http://i.imgur.com/HaFbS2x.png"]{}
}

◊aside{Obtvse2 was running as a Passenger app, while acvte was running as itself. Both were reverse-proxied from nginx, had varnish acting as an edge cache, and were running on a 1GB Memory, 1 Core, 30GB SSD cloud instance from DigitalOcean.}

Right before 12:05 is when I flipped the switch. I killed the config using the rails-based ◊a[#:href "https://github.com/natew/obtvse2"]{obtvse2} and migrated to the one using acvte. The drop in the graph above shows that switch in more of a defined manner than I was expecting.

The table above details the actual memory usage of both apps. Obtvse2, well rails actually, was using 113MB, an average amount across the app's lifespan. Acvte, on the other hand, was only using 8MB. Here's a fun fact. Three instances of acvte (◊code{blog}, ◊code{acvte}, and ◊code{bash} in the table) combined used only ~21% of the memory used by the rails app. The ◊code{bash} instance was me running acvte in dev mode for some debugging, while the other two were running via ◊code{upstart}.

◊aside{Definition of Time (total duration) and Latency (time to first byte) from ◊a[#:href "https://developers.google.com/chrome-developer-tools/docs/network"]{Google}.}

Sadly, I don't have definitive numbers on app response time from the server as NewRelic doesn't support Go at the moment, although I can estimate using Chrome Developer Tools. NewRelic is showing that obtvse2 had an average response time of 67ms. Chrome shows an estimated average response time of 4ms, assuming response time is Time - Latency.

◊h2{On the whole, ◊a[#:href "http://www.youtube.com/watch?v=mi5kXcc-TJ8"]{Preparation H feels good}}

Go has left me wanting more. I just want more. More time with it. More projects written in it. Development time with it is quick, writing, compiling, and running, while the code is concise and easy to read for when I don't document (considering my track record with code, that will be most of the time).
