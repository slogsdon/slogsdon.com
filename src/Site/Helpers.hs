--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
module Site.Helpers where

import           Data.List              ( isInfixOf )
import           Hakyll                 ( Routes, Item
                                        , Compiler, Context
                                        , customRoute, withUrls
                                        , field, unsafeCompiler
                                        , toFilePath )
import           System.FilePath.Posix  ( takeBaseName, takeDirectory
                                        , (</>), splitFileName
                                        , splitPath, joinPath )
import           System.Process

--------------------------------------------------------------------------------

-- replace a foo/bar.md by foo/bar/index.html
-- this way the url looks like: foo/bar in most browsers
niceRoute :: Routes
niceRoute = customRoute createIndexRoute
  where
    createIndexRoute ident =
      dir </> takeBaseName p </> "index.html"
      where
        p = toFilePath ident
        baseDir = takeDirectory p
        dir = case splitPath baseDir of
          "posts":xs -> joinPath xs
          _          -> baseDir

-- replace url of the form foo/bar/index.html with foo/bar/
removeIndexHtml :: Item String -> Compiler (Item String)
removeIndexHtml item = return $ fmap (withUrls removeIndexStr) item
  where
    removeIndexStr :: String -> String
    removeIndexStr url =
      case splitFileName url of
        (dir, "index.html") | isLocal dir -> dir
        _                                 -> url
      where
        isLocal uri = not ("://" `isInfixOf` uri)

gitTag :: String -> Context String
gitTag key = field key $ \_ ->
  unsafeCompiler $ do
    sha <- readProcess "git" ["log", "-1", "HEAD", "--pretty=format:%H"] []
    message <- readProcess "git" ["log", "-1", "HEAD", "--pretty=format:%s"] []
    return ("<a href=\"https://github.com/slogsdon/slogsdon.com/commit/" ++ sha ++
           "\" title=\"" ++ message ++ "\">" ++ take 8 sha ++ "</a>")
