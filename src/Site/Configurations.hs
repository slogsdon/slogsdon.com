--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
module Site.Configurations where

import           Hakyll  ( Configuration(..)
                         , FeedConfiguration(..)
                         , defaultConfiguration )

--------------------------------------------------------------------------------

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
