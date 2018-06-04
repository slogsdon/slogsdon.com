module Site.Index

module R = Fable.Helpers.React

open Fable.Next
open Fable.Next.Props

type Path = {
  pathname: string
}

let view () =
  R.div []
    [
      head [
        R.title [] [R.str "Index Page - Example"]
      ]
      R.h1 [] [ R.str "Hello World" ]
      link [ Href (Object {pathname = "/about"}) ]
        [ R.a [] [ R.str "To About" ]
        ]
    ]
