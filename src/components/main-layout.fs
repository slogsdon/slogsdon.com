module Site.Components.MainLayout

module R = Fable.Helpers.React

open Fable.Import
open R.Props
open Fable.Next
open Fable.Next.Props

open Site.Components

let render (children: React.ReactElement list) =
  BlankLayout.render [
    R.div [ClassName "container"]
      (List.concat [
        [
          R.header [] [
            R.div [ClassName "title"] [
              link [Prefetch true; Href (String "/")] [
                R.a [] [R.str "SL"]
              ]
            ]
            Menu.render {index = false}
            R.div [ClassName "clear-both"] []
          ]
        ]

        children

        [
          Footer.render()
        ]
      ])

    styledJsx [R.str "
      .container {
        margin: 0 auto;
        max-width: 650px;
        padding: 0 1rem;
      }

      .clear-both {
        clear: both;
      }

      .title {
        float: left;
        font-weight: 700;
        margin: 1rem 0;
        padding: 0;
      }
    "]
  ]
