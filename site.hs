--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import           Control.Monad          ( forM, forM_ )
import           Data.List              ( sortBy, isInfixOf )
import           Data.Monoid            ( (<>), mconcat
                                        , mappend )
import           Data.Ord               ( comparing )
import           Hakyll
import           System.Locale          ( defaultTimeLocale )
import           System.Directory
import           System.Environment
import           System.FilePath.Posix  ( takeBaseName, takeDirectory
                                         , (</>), splitFileName
                                         , splitPath, joinPath )
import           System.Process


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
      route   $ niceRoute
      compile $ pandocCompiler
        >>= saveSnapshot "content"
        >>= loadAndApplyTemplate "templates/post.html"    (postCtxWithTags tags)
        >>= loadAndApplyTemplate "templates/default.html" (postCtxWithTags tags)
        >>= removeIndexHtml

    tagsRules tags $ \tag pattern -> do
      let title = "Posts tagged \"" ++ tag ++ "\""
      route   $ niceRoute
      compile $ do
        posts <- recentFirst =<< loadAll pattern
        let ctx = 
              constField "title" title                 `mappend`
              listField "posts" postCtx (return posts) `mappend`
              defaultContext

        makeItem ""
          >>= loadAndApplyTemplate "templates/tag.html"     ctx
          >>= loadAndApplyTemplate "templates/default.html" ctx
          >>= removeIndexHtml

    ------------------------------------------------------------------------------
    -- Pages
    ------------------------------------------------------------------------------

    match (fromList ["about.md", "contact.md"]) $ do
      route   $ niceRoute
      compile $ pandocCompiler
        >>= loadAndApplyTemplate "templates/default.html" defaultContext
        >>= removeIndexHtml

    create ["archive.html"] $ do
      route   $ niceRoute
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
          >>= (fmap (take 10)) . recentFirst
        let indexCtx =
              listField "posts" (postCtxWithTags tags) (return posts) `mappend`
              constField "title" "Home"                               `mappend`
              defaultContext

        getResourceBody
          >>= applyAsTemplate indexCtx
          >>= loadAndApplyTemplate "templates/default.html" indexCtx
          >>= removeIndexHtml

    create ["feed/atom.xml"] $ do
      route idRoute
      compile $ do
        -- load all "content" snapshots of all posts
        loadAllSnapshots postsPattern "content"
          -- take the latest 10
          >>= (fmap (take 10)) . recentFirst
          -- renderAntom feed using some configuration
          >>= renderAtom feedConfiguration feedCtx


--------------------------------------------------------------------------------
postCtx :: Context String
postCtx =
  dateField "date" "%B %e, %Y"    `mappend`
  teaserField "excerpt" "content" `mappend`
  gitTag "commit"                 `mappend`
  defaultContext

postCtxWithTags :: Tags -> Context String
postCtxWithTags tags = 
  tagsField "tags" tags `mappend` 
  postCtx

feedCtx :: Context String
feedCtx = 
  defaultContext <>
  -- $description$ will render as the post body
  bodyField "description"

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
          "posts":xs -> joinPath (xs)
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
        isLocal uri = not (isInfixOf "://" uri)

gitTag :: String -> Context String
gitTag key = field key $ \_ -> do
  unsafeCompiler $ do
    sha <- readProcess "git" ["log", "-1", "HEAD", "--pretty=format:%H"] []
    message <- readProcess "git" ["log", "-1", "HEAD", "--pretty=format:%s"] []
    return ("<a href=\"https://github.com/slogsdon/slogsdon.com/commit/" ++ sha ++
           "\" title=\"" ++ message ++ "\">" ++ (take 8 sha) ++ "</a>")

hakyllConf :: Configuration
hakyllConf = defaultConfiguration
  { deployCommand = "bash deploy.sh deploy"
  , providerDirectory = "provider"
  , destinationDirectory = "_site/deploy/out"
  , storeDirectory = "_site/deploy/cache"
  , tmpDirectory = "_site/deploy/cache/tmp"
  , previewHost = "0.0.0.0"
  , previewPort = 8000
  }

feedConfiguration :: FeedConfiguration
feedConfiguration = FeedConfiguration
    { feedTitle = "Shane Logsdon"
    , feedDescription = "This feed provides information about Shane Logsdon's site."
    , feedAuthorName = "Shane Logsdon"
    , feedAuthorEmail = "shane@shanelogsdon.com"
    , feedRoot = "http://www.slogsdon.com"
    }
