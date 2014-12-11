# www.slogsdon.com (slogsdon.com)

It is transformed by [Hakyll](http://github.com/jaspervdj/hakyll) into a static site prior to me pushing this repository to GitHub.

## Setup

```
$ cabal sandbox init
$ cabal install
$ bash deploy.sh setup
```

## Development

Basic preview server:

```
$ cabal run preview
```

With automatic rebuild from non-Haskell changes:

```
$ cabal run watch
```

## Deployment

```
$ git add [changes]
$ git commit
$ cabal run deploy
$ git push
```

## License

The following directories and their contents are copyright Shane Logsdon. You may not reuse anything therein without my permission:

- provider/drafts/
- provider/posts/

All other directories and files are MIT Licensed. See [LICENSE](https://github.com/slogsdon/slogsdon.com/blob/master/LICENSE) for more details.
