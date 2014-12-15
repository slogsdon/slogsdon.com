---
title: I'm Learning Haskell For Real This Time
date: 2014-12-08 00:51:00
tags: haskell, golang, erlang, elixir, functional-programming
image: http://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Haskell-Logo.svg/602px-Haskell-Logo.svg.png
---

About a couple of years ago, I was looking for something to add to my metaphoric programming toolbox. That something needed to push me beyond PHP and C#. My initial desires were performance related (I mean PHP isn't really known for it's blistering speed), and as I thought about the possibilities, a paradigm shift wasn't out of the question. And so, my quest began.

<!--more-->

## Go for a bit

To keep things a bit easier for myself, my first stop was something that resembled what I already knew: [Go][go]. As "an open source programming language that makes it easy to build simple, reliable, and efficient software", I figured it be right up my alley with what I was trying to achieve.

<center>
![The Go gopher][gopher]
<p><sup><em>the Go gopher</em></sup></p>
</center>

I found a web framework to use ([revel][revel]) and built a basic blog that resembled [Obtvse 2][obtvse2]. The simplicity of the language make the work quick, and I felt efficient which isn't always the case when I come across a new language. I went on to create a few learning projects in the language, contributing (or attempting to) to open source projects when I saw fit, but yet, I felt there was something off about the way things were going. *N.B. I later came to know this was because of my use of a rigid framework when starting to use Go, so I wasn't feeling close to the language itself.*

[go]: https://golang.org/
[gopher]: https://golang.org/doc/gopher/frontpage.png
[obtvse2]: https://github.com/natew/obtvse2
[revel]: https://revel.github.io/

## Haskell intro

Venturing on, I decided to try this thing I'd been hearing a lot about: [Haskell][haskell]. According to its homepage, "Haskell makes it easier to produce flexible, maintainable, high-quality software", and that's every software developer's goal, right?

Probably sometime between [Cabal Hell][cabal-hell], trying to wrap my head around monads, and deciphering all of the operators in use in Haskell source files, I started drifting away from learning Haskell. I remained interested in what it offered, but I was impatient and didn't have the extra time to devote to everything that revolves around the language.

[cabal-hell]: http://www.well-typed.com/blog/2014/09/how-we-might-abolish-cabal-hell-part-1/
[haskell]: https://www.haskell.org/

## Erlang (with Elixir soon behind)

While having a go at Go and taking a small detour with Haskell, I ran across [ChicagoBoss][chicago-boss], a web framework for [Erlang][erlang]. Now, this was a few months before the big WhatsApp purchase by Facebook, but I still had heard of Erlang and its use in scalable and fault-tolerant soft real-time systems. I looked things over, went through some tutorials, built some skeleton projects, and even wrote about [a pain-point for some people][chicago-boss-auth]. By all accounts, this
framework and language combination was bitchin'.

<center>
![Elixir][elixir-logo]
</center>

I soon came across a readme doc in the ChicagoBoss repo about using something called "Elixir" in ChicagoBoss projects. *Hmm*, I wondered. *What's this thing?* After heading the the [Elixir homepage][elixir] and reading that it leverages the Erlang VM and interoperates with Erlang code, offers a more inviting syntax (I later appreciated the Erlang syntax more), and includes nifty features including hygenic macros and the pipe operator, furious Googling ensued.

Over the next year or so, I managed to write the API server for my [old startup][chatblend], open source numerous projects ([1][sugar], [2][mandrillex], [3][stripe-elixir], [4][placid]), and work as a contractor building a concurrent and distributed team collaboration protocol, using Elixir pretty much full-time. The experiences with each one really opened my eyes to functional programming. The composability and testability of pure functions. The possibility of statelessness (ignoring the state of OTP `gen_server`s). The basic simplicity of it all.

While I love Erlang and Elixir and being able to just let it crash, relying on a virtual machine to run my code isn't something I want to do everyday. I'm a big fan of getting native binaries with my portability.

[chicago-boss]: http://www.chicagoboss.org/
[chicago-boss-auth]: /implementing-user-authentication-with-bcrypt-in-chicagoboss/ "Implementing User Authentication with bcrypt in ChicagoBoss"
[elixir]: http://elixir-lang.org/
[elixir-logo]: /assets/images/elixir-logo.png
[chatblend]: https://www.chatblend.com/ "ChatBlend"
[mandrillex]: https://github.com/slogsdon/mandrillex "Mandrillex"
[placid]: https://github.com/slogsdon/placid "Placid"
[stripe-elixir]: https://github.com/slogsdon/stripe-elixir "Stripe"
[sugar]: https://sugar-framework.github.io/ "Sugar"
[erlang]: http://www.erlang.org/

## Haskell for a second time

So through this past year, I've realized I'm drawn to certain language features:

- purely functional
- statically typed
- ability for abstractions
- expressiveness
- usable tooling
- third-party packages/libraries

Can those be used to describe Haskell? Yes. Can other programming languages be described in the same manner? Definitely. Why Haskell?

<center>
![Learning Me a Haskell: Baby Mode][haskell-baby]
<p><sup><em>How I feel using Haskell. Credits: <a href="http://learnyouahaskell.com/">learnyouahaskell.com</a></em></sup></p>
</center>

Personally, I feel as though Haskell is a good fit for me so I can make better software, with being able to leverage its type system and easily know when my functions become impure (and thus, need more tests) both having the biggest influence over me writing better code. *Sidebar: Everyone who writes software or wants to learn how should take a look at language choices, deciding on one or a few for their own needs and not based on what's hip or cool at the time.*

Another reason why I want to learn Haskell? I like challenges. So, how am I planning on overcoming the challenge of learning Haskell? I'm not entirely sure of everything needed, but here are a few things that should help me along the way:

- [Chris Allen][bitemyapp]'s (**[&#64;bitemyapp][bitemyapp-twitter]**) [recommended path for learning Haskell][bitemyapp-learnhaskell]
- [Stephen Diehl][smdiehl]'s (**[&#64;smdiehl][smdiehl-twitter]**) ["What I Wish I Knew When Learning Haskell"][smdiehl-wishiknew]
- [codewars][codewars] katas

Wish me luck!

[bitemyapp]: http://bitemyapp.com/
[bitemyapp-learnhaskell]: https://github.com/bitemyapp/learnhaskell
[bitemyapp-twitter]: https://twitter.com/bitemyapp
[codewars]: http://www.codewars.com/
[haskell-baby]: /assets/images/haskell-baby.png
[smdiehl]: http://stephendiehl.com/
[smdiehl-wishiknew]: http://dev.stephendiehl.com/hask/
[smdiehl-twitter]: https://twitter.com/smdiehl
