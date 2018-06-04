module Site.Components.Footer

module R = Fable.Helpers.React

open R.Props
open Fable.Next
open Fable.Next.Props

let menuItem (text:string) (href:string) =
  R.li [ClassName "menu-item"] [
    link [Prefetch true; Href (String href)] [R.a [] [R.str text]]
  ]

let render () =
  R.footer [ClassName "menu-container"] [
    R.ul [ClassName "menu"] [
      menuItem "Intro" "/"
      menuItem "Work" "/work/"
      menuItem "Writing" "/writing/"
      menuItem "Decks" "/decks/"
      menuItem "About" "/about/"
    ]
    styledJsx [R.str "
      .menu-container {
        border-top: 1px solid #e9e9e9;
        margin-top: 1.5rem;
        padding: 3rem 0;
      }

      .menu {
        font-weight: 700;
        list-style: none;
        margin: 1rem 0;
        padding: 0;
      }

      .menu-item {
        display: inline-block;
        margin: 0;
        margin-right: 1.5rem;
      }

      .menu-item a {
        color: #727272;
      }
    "]
  ]
