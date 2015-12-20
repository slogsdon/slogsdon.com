#lang pollen
◊define-meta[title]{I’m Learning Haskell For Real This Time}
◊define-meta[author]{shane}
◊define-meta[publish-date]{2014-12-08}
◊define-meta[tags]{elixir, erlang, functional programming, golang, haskell}
◊define-meta[description]{About a couple of years ago, I was looking for something to add to my programming toolbox. Follow me on my journey of learning Haskell.}

About a couple of years ago, I was looking for something to add to my metaphoric programming toolbox. That something needed to push me beyond PHP and C#. My initial desires were performance related (I mean PHP isn't really known for it's blistering speed), and as I thought about the possibilities, a paradigm shift wasn't out of the question. And so, my quest began.

◊h2{Go for a bit}

To keep things a bit easier for myself, my first stop was something that resembled what I already knew: ◊a[#:href "https://golang.org/"]{Go}. As "an open source programming language that makes it easy to build simple, reliable, and efficient software", I figured it be right up my alley with what I was trying to achieve.

◊figure{
  ◊img[#:src "https://golang.org/doc/gopher/frontpage.png" #:alt "The Go gopher"]{}
  ◊figcaption{the Go gopher}
}

I found a web framework to use (◊a[#:href "https://revel.github.io/"]{revel}) and built a basic blog that resembled ◊a[#:href "https://github.com/natew/obtvse2"]{Obtvse 2}. The simplicity of the language make the work quick, and I felt efficient which isn't always the case when I come across a new language. I went on to create a few learning projects in the language, contributing (or attempting to) to open source projects when I saw fit, but yet, I felt there was something off about the way things were going. ◊em{N.B. I later came to know this was because of my use of a rigid framework when starting to use Go, so I wasn't feeling close to the language itself.}

◊h2{Haskell intro}

Venturing on, I decided to try this thing I'd been hearing a lot about: ◊a[#:href "https://www.haskell.org/"]{Haskell}. According to its homepage, "Haskell makes it easier to produce flexible, maintainable, high-quality software", and that's every software developer's goal, right?

Probably sometime between ◊a[#:href "http://www.well-typed.com/blog/2014/09/how-we-might-abolish-cabal-hell-part-1/"]{Cabal Hell}, trying to wrap my head around monads, and deciphering all of the operators in use in Haskell source files, I started drifting away from learning Haskell. I remained interested in what it offered, but I was impatient and didn't have the extra time to devote to everything that revolves around the language.

◊h2{Erlang (with Elixir soon behind)}

While having a go at Go and taking a small detour with Haskell, I ran across ◊a[#:href "http://www.chicagoboss.org/"]{ChicagoBoss}, a web framework for ◊a[#:href "http://www.erlang.org/"]{Erlang}. Now, this was a few months before the big WhatsApp purchase by Facebook, but I still had heard of Erlang and its use in scalable and fault-tolerant soft real-time systems. I looked things over, went through some tutorials, built some skeleton projects, and even wrote about ◊a[#:href "/implementing-user-authentication-with-bcrypt-in-chicagoboss/" #:title "Implementing User Authentication with bcrypt in ChicagoBoss"]{a pain-point for some people}. By all accounts, this framework and language combination was bitchin'.

◊figure{
  ◊a[#:href "http://www.elixir-lang.org"]{◊img[#:src "http://i0.wp.com/www.slogsdon.com/wp-content/uploads/2015/04/elixir-logo.png?resize=227%2C95" #:alt "elixir-logo"]{}}
}

I soon came across a readme doc in the ChicagoBoss repo about using something called "Elixir" in ChicagoBoss projects. ◊em{Hmm}, I wondered. ◊em{What's this thing?} After heading the the ◊a[#:href "http://elixir-lang.org/"]{Elixir homepage} and reading that it leverages the Erlang VM and interoperates with Erlang code, offers a more inviting syntax (I later appreciated the Erlang syntax more), and includes nifty features including hygenic macros and the pipe operator, furious Googling ensued.

Over the next year or so, I managed to write the API server for my ◊a[#:href "https://www.chatblend.com/" #:title "ChatBlend"]{old startup}, open source numerous projects (◊a[#:href "https://sugar-framework.github.io/" #:title "Sugar"]{1}, ◊a[#:href "https://github.com/slogsdon/mandrillex" #:title "Mandrillex"]{2}, ◊a[#:href "https://github.com/slogsdon/stripe-elixir" #:title "Stripe"]{3}, ◊a[#:href "https://github.com/slogsdon/placid" #:title "Placid"]{4}), and work as a contractor building a concurrent and distributed team collaboration protocol, using Elixir pretty much full-time. The experiences with each one really opened my eyes to functional programming. The composability and testability of pure functions. The possibility of statelessness (ignoring the state of OTP ◊code{gen_server}s). The basic simplicity of it all.

While I love Erlang and Elixir and being able to just let it crash, relying on a virtual machine to run my code isn't something I want to do everyday. I'm a big fan of getting native binaries with my portability.

◊h2{Haskell for a second time}

So through this past year, I've realized I'm drawn to certain language features:

◊ul{
  ◊li{purely functional}
  ◊li{statically typed}
  ◊li{ability for abstractions}
  ◊li{expressiveness}
  ◊li{usable tooling}
  ◊li{third-party packages/libraries}
}

Can those be used to describe Haskell? Yes. Can other programming languages be described in the same manner? Definitely. Why Haskell?

◊figure{
  ◊img[#:src "http://i1.wp.com/www.slogsdon.com/wp-content/uploads/2015/04/haskell-baby.png?resize=140%2C211" #:alt "haskell-baby"]{}
  ◊figcaption{How I feel using Haskell. Credits: ◊a[#:href "http://learnyouahaskell.com/"]{learnyouahaskell.com}}
}

Personally, I feel as though Haskell is a good fit for me so I can make better software, with being able to leverage its type system and easily know when my functions become impure (and thus, need more tests) both having the biggest influence over me writing better code. ◊em{Sidebar: Everyone who writes software or wants to learn how should take a look at language choices, deciding on one or a few for their own needs and not based on what's hip or cool at the time.}

Another reason why I want to learn Haskell? I like challenges. So, how am I planning on overcoming the challenge of learning Haskell? I'm not entirely sure of everything needed, but here are a few things that should help me along the way:

◊ul{
  ◊li{◊a[#:href "http://bitemyapp.com/"]{Chris Allen}'s (◊strong{◊a[#:href "https://twitter.com/bitemyapp"]{@bitemyapp}}) ◊a[#:href "https://github.com/bitemyapp/learnhaskell"]{recommended path for learning Haskell}}
  ◊li{◊a[#:href "http://stephendiehl.com/"]{Stephen Diehl}'s (◊strong{◊a[#:href "https://twitter.com/smdiehl"]{@smdiehl}}) ◊a[#:href "http://dev.stephendiehl.com/hask/"]{"What I Wish I Knew When Learning Haskell"}}
  ◊li{◊a[#:href "http://www.codewars.com/"]{codewars} katas}
}

Wish me luck!
