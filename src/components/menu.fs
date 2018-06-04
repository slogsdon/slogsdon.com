module Site.Components.Menu

module R = Fable.Helpers.React

open R.Props
open Fable.Next
open Fable.Next.Props

let menuItem (text:string) (href:string) =
  R.li [ClassName "menu-item"] [
    link [Prefetch true; Href (String href)] [R.a [] [R.str text]]
  ]

type IMenuProps =
  { index: bool }

let render (props: IMenuProps) =
  R.nav [ClassName ((if props.index then "index-page " else "") + "menu-container")] [
    R.ul [ClassName "menu"] [
      menuItem "Work" "/work/"
      menuItem "Writing" "/writing/"
      menuItem "Decks" "/decks/"
    ]
    styledJsx [R.str "
      .menu-container {
        float: right;
      }

      .menu {
        font-weight: 700;
        list-style: none;
        margin: 1rem 0;
        padding: 0;
      }

      .menu-item {
        display: inline;
        margin-left: 0.5rem;
      }

      .index-page.menu-container {
        float: none;
      }

      .index-page.menu-container .menu-item {
        font-size: 1.5rem;
        margin-left: 0;
        margin-right: 0.75rem;
      }
    "]
  ]
