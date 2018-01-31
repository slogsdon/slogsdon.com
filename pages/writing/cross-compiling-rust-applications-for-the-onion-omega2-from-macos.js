import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "Cross-Compiling Rust Applications for the Onion Omega2 from MacOS",
  date: "2017-01-11",
  tags: ["rust", "hardware"],
  description:
    "Onion's Omega2 SoC computers are a prime target for cross-compiling" +
    "Rust applications, taking care to set up your environment just right" +
    "for the Omega2's MIPS architecture.",
})(markdown(components)`

After recently receiving the shipment for my [Onion Omega2 Kickstarter](https://www.kickstarter.com/projects/onion/omega2-5-iot-computer-with-wi-fi-powered-by-linux/description) reward, I did as any other software developer might do: I started figuring out what it would take to get software running on it. Onion's [Omega2 documentation](https://docs.onion.io/omega2-docs/) has information about installing and using Python, but while this is powerful and aids product adoption, limitations of developing directly on the device soon appear. Limited disk space, limited RAM, and limited CPU speeds will hinder development and builing of most compiled languages. To me, this sounds like a great opportunity to learn how to cross-compile applications, allowing for development and building of applications in my normal development environment. I've been tinkering with Rust recently, so it became my language of choice for this exercise.

**tl;dr** It works.

${(
  <blockquote className="twitter-tweet" data-conversation="none" data-lang="en">
    <p lang="en" dir="ltr">
      running <a href="https://t.co/3I3pE2WS4W">https://t.co/3I3pE2WS4W</a>
      and <a href="https://twitter.com/rustlang">@rustlang</a> on an
      <a href="https://twitter.com/OnionIoT">@OnionIoT</a> Omega 2+,
      cross-compiled from MacOS
      <a href="https://t.co/SdiKSNPZMZ">pic.twitter.com/SdiKSNPZMZ</a>
    </p>
    &mdash; Shane Logsdon (@shanelogsdon)
    <a href="https://twitter.com/shanelogsdon/status/819204972290199553">
      January 11, 2017
    </a>
  </blockquote>
)}
${<script async src="//platform.twitter.com/widgets.js" charset="utf-8" />}

## Overview of steps needed

Not having cross-compiled applications before, I did some research into what it takes to cross-compile:

* Know your target triple
* Have your application code
* Have a build toolchain from your target available on your host (build) system
* Use the target toolchain to build you application

### What's a triple?

The target triple (or triplet) is an identifier that represents three pieces of information, architecture, vendor, and operating system, and will typically follow the form:

${(
  <Code>{`
[architecture]-[vendor]-[operating-system]
`}</Code>
)}

### What is going to be built?

I wanted to build something in Rust that was more than a simple "Hello World" application that wrote to the console, so I looked to [Rocket](https://rocket.rs) to build a simple web application server. Let's take a look at the application code to see what we're working with.

> Scaffold the project

${(
  <Code>{`
$ cargo new --bin rocket_testing
     Created binary (application) ${(
       <InlineCode>{`rocket_testing`}</InlineCode>
     )} project
$ cd rocket_testing
$ tree
.
├── Cargo.toml
└── src
    └── main.rs

1 directory, 2 files
`}</Code>
)}

> Add dependencies

${(
  <Code syntax="toml">{`
[package]
name = "rocket_testing"
version = "0.1.0"
authors = ["Shane Logsdon <shane@shanelogsdon.com>"]

[dependencies]
rocket = "0.1.4"
rocket_codegen = "0.1.4"
`}</Code>
)}

Do a quick build to pull our dependencies down:

${(
  <Code>{`
$ cargo build
    Updating registry ${(
      <InlineCode>{`https://github.com/rust-lang/crates.io-index`}</InlineCode>
    )}
 Downloading rocket_codegen v0.1.4
 Downloading rocket v0.1.4
 Downloading num_cpus v1.2.1
 Downloading libc v0.2.19
   Compiling libc v0.2.19
   Compiling typeable v0.1.2
   Compiling traitobject v0.0.1
   Compiling language-tags v0.2.2
   Compiling unicode-normalization v0.1.3
   Compiling winapi v0.2.8
   Compiling rustc-serialize v0.3.22
   Compiling ansi_term v0.9.0
   Compiling httparse v1.2.1
   Compiling log v0.3.6
   Compiling mime v0.2.2
   Compiling hpack v0.2.0
   Compiling rocket_codegen v0.1.4
error[E0554]: #[feature] may not be used on the stable release channel
 --> /Users/shane.logsdon/.cargo/registry/src/github.com-1ecc6299db9ec823/rocket_codegen-0.1.4/build.rs:1:1
  |
1 | #![feature(slice_patterns)]
  | ^^^^^^^^^^^^^^^^^^^^^^^^^^^

error: aborting due to previous error

Build failed, waiting for other jobs to finish...
error: Could not compile ${<InlineCode>{`rocket_codegen`}</InlineCode>}.

To learn more, run the command again with --verbose.
`}</Code>
)}

That's right. ${(
  <InlineCode>{`rocket_codegen`}</InlineCode>
)} requires some Rust nightly features at the moment, so lets use ${(
  <InlineCode>{`rustup`}</InlineCode>
)} to override our current Rust toolchain:

${(
  <Code>{`
$ rustup override set nightly
info: using existing install for 'nightly-x86_64-apple-darwin'
info: override toolchain for '/Users/shane.logsdon/Code/rust/rocket_testing' set to 'nightly-x86_64-apple-darwin'

  nightly-x86_64-apple-darwin unchanged - rustc 1.15.0-nightly (71c06a56a 2016-12-18)

$ cargo build
`}</Code>
)}

That time should do it if you're using a nightly release for the first time, but if your've already had a nightly installed, you may run into this issue:

${(
  <Code>{`
Build failed, waiting for other jobs to finish...
error: failed to run custom build command for ${(
    <InlineCode>{`rocket_codegen v0.1.4`}</InlineCode>
  )}
process didn't exit successfully: ${(
    <InlineCode
    >{`/Users/shane.logsdon/Code/rust/rt/target/debug/build/rocket_codegen-0930e5f9972e7ac3/build-script-build`}</InlineCode>
  )} (exit code: 101)
--- stderr
Error: Rocket codegen requires a newer version of rustc.
Use ${(
    <InlineCode>{`rustup update`}</InlineCode>
  )} or your preferred method to update Rust.
Installed version is: 2016-12-18. Minimum required: 2017-01-03.
thread 'main' panicked at 'Aborting compilation due to incompatible compiler.', /Users/shane.logsdon/.cargo/registry/src/github.com-1ecc6299db9ec823/rocket_codegen-0.1.4/build.rs:62
note: Run with ${<InlineCode>{`RUST_BACKTRACE=1`}</InlineCode>} for a backtrace.
`}</Code>
)}

We're told that our installed version of Rust nightly is too old, and we need to install a newer one. Luckily, it's a couple of quick commands to fix:

${(
  <Code>{`
$ rustup update && cargo update && cargo build
# ... eventually seeing
Finished debug [unoptimized + debuginfo] target(s) in 36.35 secs
`}</Code>
)}

Once our initial build completes, we'll want to update our application code in ${(
  <InlineCode>{`src/main.rs`}</InlineCode>
)} to leverage Rocket:

${(
  <Code syntax="rust">{`
#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rocket;

#[get("/text")]
fn hello() -> String {
    String::from_str("hello world")
}

fn main() {
    rocket::ignite()
        .mount("/", routes![hello])
        .launch();
}
`}</Code>
)}

We can then build again and test our application (Rocket listens on [${(
  <InlineCode>{`http://localhost:8000/`}</InlineCode>
)}](http://localhost:8000/) by default). At this point we have a working application for our host system, which in my case has the triple ${(
  <InlineCode>{`x86_64-apple-darwin`}</InlineCode>
)}.

## Where do we find our target build toolchain?

Since we now have a working application, we need to figure out how to get our application cross-compiled. Some googling resulted in some useful information specifically for Rust. [${(
  <InlineCode>{`rust-cross`}</InlineCode>
)}](https://github.com/japaric/rust-cross) has some excellent information on this process, but since I didn't even know what the Omega2's architecture was, I figured I better find out. I booted up my Omega2+ and ${(
  <InlineCode>{`ssh`}</InlineCode>
)}'d into it:

${(
  <Code>{`
$ ssh root@192.168.3.1
root@192.168.3.1's password:


BusyBox v1.25.1 () built-in shell (ash)

   ____       _             ____
  / __ \\___  (_)__  ___    / __ \\__ _  ___ ___ ____ _
 / /_/ / _ \\/ / _ \\/ _ \\  / /_/ /  ' \\/ -_) _ ${(
   <InlineCode>{`/ _ `}</InlineCode>
 )}/
 \\____/_//_/_/\\___/_//_/  \\____/_/_/_/\\__/\\_, /\\_,_/
 W H A T  W I L L  Y O U  I N V E N T ? /___/
 -----------------------------------------------------
   Ω-ware: 0.1.7 b139
 -----------------------------------------------------
root@Omega-708F:~# uname -a
Linux Omega-708F 4.4.39 #0 Thu Dec 29 17:07:01 2016 mips GNU/Linux
root@Omega-708F:~#
`}</Code>
)}

That told me enough to start my search for the reuired build chain. At this point, I went to ${(
  <InlineCode>{`rustup`}</InlineCode>
)} to see what architecture's it supported.

> Side note: ${(
  <InlineCode>{`rustup`}</InlineCode>
)} not only manages Rust stable, beta, and nightly installations but also manages Rust toolchains for all the architectures Rust supports!

${(
  <Code>{`
$ rustup target list
aarch64-apple-ios
aarch64-linux-android
aarch64-unknown-linux-gnu
arm-linux-androideabi
arm-unknown-linux-gnueabi
arm-unknown-linux-gnueabihf
arm-unknown-linux-musleabi
arm-unknown-linux-musleabihf
armv7-apple-ios
armv7-linux-androideabi
armv7-unknown-linux-gnueabihf
armv7-unknown-linux-musleabihf
armv7s-apple-ios
asmjs-unknown-emscripten
i386-apple-ios
i586-pc-windows-msvc
i586-unknown-linux-gnu
i686-apple-darwin
i686-linux-android
i686-pc-windows-gnu
i686-pc-windows-msvc
i686-unknown-freebsd
i686-unknown-linux-gnu
i686-unknown-linux-musl
mips-unknown-linux-gnu
mips-unknown-linux-musl
mips64-unknown-linux-gnuabi64
mips64el-unknown-linux-gnuabi64
mipsel-unknown-linux-gnu
mipsel-unknown-linux-musl
powerpc-unknown-linux-gnu
powerpc64-unknown-linux-gnu
powerpc64le-unknown-linux-gnu
s390x-unknown-linux-gnu
wasm32-unknown-emscripten
x86_64-apple-darwin (default)
x86_64-apple-ios
x86_64-pc-windows-gnu
x86_64-pc-windows-msvc
x86_64-rumprun-netbsd
x86_64-unknown-freebsd
x86_64-unknown-linux-gnu
x86_64-unknown-linux-musl
x86_64-unknown-netbsd
`}</Code>
)}

${<InlineCode>{`rustup`}</InlineCode>} is showing 6 ${(
  <InlineCode>{`mips`}</InlineCode>
)}-related targets. We've narrowed it down some, but we still don't know the exact one we require or if Rust/${(
  <InlineCode>{`rustup`}</InlineCode>
)} even support it. I took to looking through the [community forums](https://community.onion.io/category/2/omega-talk) searching for ${(
  <InlineCode>{`mips`}</InlineCode>
)} and began to see others looking to do some cross-compilation of code. Across a few separate thread, I put together some information:

* The Omega2's use the MediaTek MT7688 SoC (system on chip) which include a MIPS&reg; 24KEc&trade; CPU
* The Omega2 OS is based on the [LEDE Project](https://lede-project.org/), a fork of the OS behind OpenWrt
* OpenWrt/LEDE have SDKs for building the OS firmware images which include the build toolchain

Eventually, I found a few forum threads with references to [WereCatf's repository](https://github.com/WereCatf/source), a GitHub fork of the LEDE Project's SDK with the necessary changes to add the Omega2 and Omega2+ build DTS (device tree source) configurations add a few other fixes. With the SDK, we have everything we need to build our application for the Omega2, but now the SDK needs to be built since we only have the source and nothing specific for the Omega2.

## Building the build toolchain

Luckily, the build process for the LEDE SDK is the same as the OpenWrt SDK, and at least for MacOS, the build requirements are the same. I've included OpenWrt's instructions for MacOS 10.11 here, but other versions and OS's can be found on [their documentation site](https://wiki.openwrt.org/doc/howto/buildroot.exigence.macosx).

> 1. Install Xcode or at least Xcode command line tools from the MacOSX App Store
>
> 2. Install [Homebrew](http://brew.sh/).
>
> 3. Add duplicates repository to homebrew for grep formulae:
>
>    ${(
  <Code>{`
brew tap homebrew/dupes
`}</Code>
)}
>
> 4. Install additional formulae:
>
>    ${(
  <Code>{`
brew install coreutils findutils gawk gnu-getopt gnu-tar grep wget quilt xz
`}</Code>
)}
>
> 5. ${(
  <InlineCode>{`gnu-getopt`}</InlineCode>
)} is keg-only, so force linking it:
>
>    ${(
  <Code>{`
brew ln gnu-getopt --force
`}</Code>
)}
>
> 6. To get rid of "date illegal option" you can add to your ${(
  <InlineCode>{`.bash_profile`}</InlineCode>
)} (wasn't required for me):
>
>    ${(
  <Code>{`
PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"
`}</Code>
)}
>
> 7. OS X by default comes with a case-insensitive filesystem. OpenWrt won't build on that. As a workaround, create a (Sparse) case-sensitive disk-image that you then mount in Finder and use as build directory:
>
>    ${(
  <Code>{`
hdiutil create -size 20g -type SPARSE -fs "Case-sensitive HFS+" -volname OpenWrt OpenWrt.sparseimage
hdiutil attach OpenWrt.sparseimage
`}</Code>
)}
>
> 8. Change to your newly created and mounted disk image:
>
>    ${(
  <Code>{`
/Volumes/OpenWrt
`}</Code>
)}
>
> 9. Now proceed normally (${<InlineCode>{`git clone…`}</InlineCode>})

If, like me, you have no idea how to "proceed normally", let me fill you in. We're going to obtain the source, configure it for our needs, and build it.

### Getting the source

This one's going to be quick and simple using ${(
  <InlineCode>{`git`}</InlineCode>
)}:

${(
  <Code>{`
$ git clone https://github.com/WereCatf/source
$ cd source
`}</Code>
)}

### Configuring the SDK

Since OpenWrt/LEDE can be used on multiple architectures, we need to configure the SDK to be compatible with the Omega2. There are a few ways to do this, but we'll use ${(
  <InlineCode>{`make menuconfig`}</InlineCode>
)} here for a ${(
  <InlineCode>{`ncurses`}</InlineCode>
)}-based configuration process.

> Tip: The menus use ${<InlineCode>{`up`}</InlineCode>} and ${(
  <InlineCode>{`down`}</InlineCode>
)} keys to move between options, ${<InlineCode>{`left`}</InlineCode>} and ${(
  <InlineCode>{`right`}</InlineCode>
)} to move between commands for a given screen (located at the bottom), ${(
  <InlineCode>{`enter`}</InlineCode>
)} to select a command (usually "Select", "Exit", and "Save"), and ${(
  <InlineCode>{`space`}</InlineCode>
)} to enable/select an option.

The three items we need to set (with desired values) are:

* Target System: ${<InlineCode>{`MediaTek Ralink MIPS`}</InlineCode>}
* Subtarget: ${<InlineCode>{`MT7688 based boards`}</InlineCode>}
* Target Profile: ${<InlineCode>{`Onion Omega2`}</InlineCode>} or ${(
  <InlineCode>{`Onion Omega2+`}</InlineCode>
)}

> Note: I also enabled the ${(
  <InlineCode>{`Build the LEDE SDK`}</InlineCode>
)} and ${(
  <InlineCode>{`Package the LEDE-based Toolchain`}</InlineCode>
)} options, but I have no idea if this affects the end result. They sounded important/useful. Having those enabled allowed for me to use the toolchain later, but I didn't have the desire to go back to check if it was necessary.

Don't forget to save the configuration or else the SDK will build with its defaults.

### Build the toolchain

Building the SDK's toolchain is another easy and simple process, but it takes some time to complete.

${(
  <Code>{`
$ make toolchain/install
`}</Code>
)}

Let your system do its thing for a while, and do something enjoyable. You can also wait, wait, wait, wait. The good news to take away here is that this only needs to be done once per architecture for your build environment, so if you only use this SDK for the Omega2, it will only need to be built again if you want the build toolchain on another system Docker, etc. Eventually, it should finish, leaving your toolchain within the SDK directory:

${(
  <Code>{`
$ tree -L 1 staging_dir/toolchain-mipsel_24kc_gcc-5.4.0_musl-1.1.15
staging_dir/toolchain-mipsel_24kc_gcc-5.4.0_musl-1.1.15
├── bin
├── include
├── info.mk
├── initial
├── lib
├── lib32 -> lib
├── lib64 -> lib
├── libexec
├── mipsel-openwrt-linux -> mipsel-openwrt-linux-musl
├── mipsel-openwrt-linux-musl
├── share
├── stamp
└── usr

12 directories, 1 file
`}</Code>
)}

Cool. From ${<InlineCode>{`rustup`}</InlineCode>}'s possible ${(
  <InlineCode>{`mips`}</InlineCode>
)} targets (pasted below), we may be able to choose one finally:

${(
  <Code>{`
mips-unknown-linux-gnu
mips-unknown-linux-musl
mips64-unknown-linux-gnuabi64
mips64el-unknown-linux-gnuabi64
mipsel-unknown-linux-gnu
mipsel-unknown-linux-musl
`}</Code>
)}

Our toolchain seems to be for the ${(
  <InlineCode>{`mipsel`}</InlineCode>
)} architecture and is compatible with ${(
  <InlineCode>{`musl`}</InlineCode>
)}, a ${(
  <InlineCode>{`libc`}</InlineCode>
)} compatible library for compiling statically-linked applications, so the ${(
  <InlineCode>{`mipsel-unknown-linux-musl`}</InlineCode>
)} Rust toolchain could work for us. Attempting to run ${(
  <InlineCode>{`cargo compile`}</InlineCode>
)} at this point will result in a big wall of text and the following error:

${(
  <Code>{`
$ cd project/directory
$ rustup target add mipsel-unknown-linux-musl
$ cargo build --target mipsel-unknown-linux-musl
$ ... big wall of text
ld: unknown option: --as-needed
clang: error: linker command failed with exit code 1 (use -v to see invocation)


error: aborting due to previous error

error: Could not compile ${<InlineCode>{`rocket_testing`}</InlineCode>}.
`}</Code>
)}

This is due to my host system's linker (${(
  <InlineCode>{`/usr/bin/cc`}</InlineCode>
)}) being used during the build but being incompatible with the ${(
  <InlineCode>{`mipsel`}</InlineCode>
)} architecture. Being completely new to cross-compilation, I had no idea how to use the correct build toolchain. Luckily, Rust ecosystem developers love documentation, and Cargo's documentation includes a page on [configuration](http://doc.crates.io/config.html) that gave me a hint in the ${(
  <InlineCode>{`target.$triple.linker`}</InlineCode>
)} configuration key:

${(
  <Code>{`
[target.mipsel-unknown-linux-musl]
linker = "/Volumes/OpenWrt/lede/staging_dir/toolchain-mipsel_24kc_gcc-5.4.0_musl-1.1.15/bin/mipsel-openwrt-linux-musl-gcc"
`}</Code>
)}

Adding that to my ${(
  <InlineCode>{`Cargo.toml`}</InlineCode>
)} file &hellip; didn't help. Turns out that target configuration options are ignored in a project's ${(
  <InlineCode>{`Cargo.toml`}</InlineCode>
)} and need to be in a ${(
  <InlineCode>{`.cargo/config`}</InlineCode>
)} (also covered by the Cargo documentation page on configuration). The resulting directory structure with the added ${(
  <InlineCode>{`.cargo/config`}</InlineCode>
)} file:

${(
  <Code>{`
$ tree -a -L 2
.
├── .cargo
│   └── config
├── .gitignore
├── Cargo.lock
├── Cargo.toml
├── src
│   └── main.rs
└── target
    ├── debug
    ├── mipsel-unknown-linux-musl
    └── release

6 directories, 5 files
`}</Code>
)}

Running ${<InlineCode>{`cargo build`}</InlineCode>} again bears some results:

${(
  <Code>{`
$ cargo build --target=mipsel-unknown-linux-musl
   Compiling rocket_testing v0.1.0 (file:///Users/shane.logsdon/Code/rust/rocket-testing)
    Finished debug [unoptimized + debuginfo] target(s) in 2.27 secs
`}</Code>
)}

It's built, but does it run? Let's ship it over to the Omega2+ to test:

${(
  <Code>{`
$ cargo build --target=mipsel-unknown-linux-musl --release
# ... build log
    Finished release [optimized] target(s) in 305.51 secs
$ scp target/mipsel-unknown-linux-musl/release/rocket_testing root@192.168.3.1:/root/
rocket_testing                                        100%   17MB  93.1KB/s   03:04
`}</Code>
)}

That uploaded the application's release binary to the root user's ${(
  <InlineCode>{`$HOME`}</InlineCode>
)} directory and can be ran with ${(
  <InlineCode>{`cd /root && ./rocket_testing`}</InlineCode>
)}:

${(
  <blockquote className="twitter-tweet" data-conversation="none" data-lang="en">
    <p lang="en" dir="ltr">
      running <a href="https://t.co/3I3pE2WS4W">https://t.co/3I3pE2WS4W</a>
      and <a href="https://twitter.com/rustlang">@rustlang</a> on an
      <a href="https://twitter.com/OnionIoT">@OnionIoT</a> Omega 2+,
      cross-compiled from MacOS
      <a href="https://t.co/SdiKSNPZMZ">pic.twitter.com/SdiKSNPZMZ</a>
    </p>
    &mdash; Shane Logsdon (@shanelogsdon)
    <a href="https://twitter.com/shanelogsdon/status/819204972290199553">
      January 11, 2017
    </a>
  </blockquote>
)}
${<script async src="//platform.twitter.com/widgets.js" charset="utf-8" />}

## Departing notes

I don't believe this is perfect, but it will get the majority of applications compiled for the Omega2. I've already ran into an issue when using [Diesel](http://diesel.rs) and Postgres in a project, but I feel like it only needs some tweaking to get it going. This post will be updated once I figure that bit out.

The Omega2 isn't the only build target available for Rust, as shown by ${(
  <InlineCode>{`rustup target list`}</InlineCode>
)}, and is accompanied by ${(
  <InlineCode>{`arm`}</InlineCode>
)} (e.g. Raspberry Pi Zero), ${(
  <InlineCode>{`armv7`}</InlineCode>
)} (e.g. Raspberry Pi 2 Model B), and ${(
  <InlineCode>{`wasm32`}</InlineCode>
)} (WebAssembly, currently available in Chrome Canary and Firefox Nightly). Cross-compilation could allow you to target all these platforms with the same code base, useful if you're building an Internet of Things [\`${(
  <InlineCode>{`botnet`}</InlineCode>
)}\`](http://www.welivesecurity.com/2016/10/24/10-things-know-october-21-iot-ddos-attacks/) application and want to use multiple device types, or it could allow you to ship compiled binaries for your customers's various production environments using a single build environment configuration.
`);
