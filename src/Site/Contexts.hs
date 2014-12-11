--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
module Site.Contexts where

import           Data.Monoid   ( (<>), mappend )
import           Hakyll        ( Context, Tags
                               , defaultContext, bodyField
                               , dateField, tagsField
                               , teaserField )

import           Site.Helpers  ( gitField )

--------------------------------------------------------------------------------

postCtx :: Context String
postCtx =
  dateField "date" "%B %e, %Y"    `mappend`
  teaserField "excerpt" "content" `mappend`
  gitField "commit"               `mappend`
  defaultContext

postCtxWithTags :: Tags -> Context String
postCtxWithTags tags =
  tagsField "tags" tags `mappend`
  postCtx

feedCtx :: Context String
feedCtx =
  defaultContext <>
  bodyField "description"
