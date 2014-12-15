--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
module Main where

import           Data.Monoid           ( mappend )
import           Hakyll
import           System.Directory      ( createDirectoryIfMissing
                                       , removeDirectoryRecursive )
import           System.Environment    ( getArgs )

import           Site.Configurations
import           Site.Contexts
import           Site.Helpers          ( niceRoute, removeIndexHtml )


--------------------------------------------------------------------------------
main :: IO ()
main = do
  ------------------------------------------------------------------------------
  -- Drafts Setup
  ------------------------------------------------------------------------------

  (action:_) <- getArgs

  let previewMode  = action == "preview" || action == "watch"
      hakyllConf'  = if previewMode
                     then hakyllConf
                          { destinationDirectory = "_site/preview/out"
                          , storeDirectory       = "_site/preview/cache"
                          , tmpDirectory         = "_site/preview/cache/tmp" }
                     else hakyllConf
      postsPattern = if previewMode
                     then "posts/*" .||. "drafts/*"
                     else "posts/*"

  if action == "clean"
  then do
    putStrLn "Removing _site/preview..."
    createDirectoryIfMissing True "_site/preview"
    removeDirectoryRecursive "_site/preview"
  else putStrLn ""

  hakyllWith hakyllConf' $ do
    ------------------------------------------------------------------------------
    -- Static
    ------------------------------------------------------------------------------

    match (fromList ["humans.txt", "robots.txt", "CNAME"]) $ do
      route   idRoute
      compile copyFileCompiler

    match "assets/css/*" $ do
      route   idRoute
      compile compressCssCompiler

    match "assets/fonts/*" $ do
      route   idRoute
      compile copyFileCompiler

    match "assets/images/*" $ do
      route   idRoute
      compile copyFileCompiler

    match "assets/js/*" $ do
      route   idRoute
      compile copyFileCompiler

    ------------------------------------------------------------------------------
    -- Support
    ------------------------------------------------------------------------------

    tags <- buildTags postsPattern (fromCapture "tags/*.html")

    match "templates/*" $ compile templateCompiler

    ------------------------------------------------------------------------------
    -- Content
    ------------------------------------------------------------------------------

    match postsPattern $ do
      route niceRoute
      compile $ pandocCompiler
        >>= saveSnapshot "content"
        >>= loadAndApplyTemplate "templates/post.html"    (postCtxWithTags tags)
        >>= loadAndApplyTemplate "templates/default.html" (postCtxWithTags tags)
        >>= removeIndexHtml

    tagsRules tags $ \tag pattern -> do
      let title = "Posts tagged \"" ++ tag ++ "\""
      route niceRoute
      compile $ do
        posts <- recentFirst =<< loadAll pattern
        let ctx =
              constField "title" title                                `mappend`
              listField "posts" (postCtxWithTags tags) (return posts) `mappend`
              defaultContext

        makeItem ""
          >>= loadAndApplyTemplate "templates/tag.html"     ctx
          >>= loadAndApplyTemplate "templates/page.html"    ctx
          >>= loadAndApplyTemplate "templates/default.html" ctx
          >>= removeIndexHtml

    ------------------------------------------------------------------------------
    -- Pages
    ------------------------------------------------------------------------------

    match "404.md" $ do
      route $ setExtension "html"
      compile $ pandocCompiler
        >>= loadAndApplyTemplate "templates/page.html"    defaultContext
        >>= loadAndApplyTemplate "templates/default.html" defaultContext

    match (fromList ["about.md", "contact.md", "contact/success.md"]) $ do
      route niceRoute
      compile $ pandocCompiler
        >>= loadAndApplyTemplate "templates/page.html"    defaultContext
        >>= loadAndApplyTemplate "templates/default.html" defaultContext
        >>= removeIndexHtml

    create ["archive.html"] $ do
      route niceRoute
      compile $ do
        posts <- recentFirst =<< loadAll postsPattern
        let archiveCtx =
              listField "posts" (postCtxWithTags tags) (return posts) `mappend`
              constField "title" "Archives"                           `mappend`
              defaultContext

        makeItem ""
          >>= loadAndApplyTemplate "templates/archive.html" archiveCtx
          >>= loadAndApplyTemplate "templates/default.html" archiveCtx
          >>= removeIndexHtml

    match "index.html" $ do
      route idRoute
      compile $ do
        posts <- loadAll postsPattern
          >>= fmap (take 10) . recentFirst
        let indexCtx =
              listField "posts" (postCtxWithTags tags) (return posts) `mappend`
              constField "title" "Home"                               `mappend`
              defaultContext

        getResourceBody
          >>= applyAsTemplate                               indexCtx
          >>= loadAndApplyTemplate "templates/default.html" indexCtx
          >>= removeIndexHtml

    create ["feed/atom.xml"] $ do
      route idRoute
      compile $
        loadAllSnapshots postsPattern "content"
          >>= fmap (take 10) . recentFirst
          >>= renderAtom feedConfiguration feedCtx

