--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
module Site.Contexts where

import           Data.Monoid   ( (<>), mappend )
import           Hakyll        ( Context, Tags
                               , defaultContext, bodyField
                               , dateField, teaserField
                               , tagsField )

import           Site.Helpers  ( gitTag )

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
  bodyField "description"
