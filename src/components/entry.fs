module Site.Components.Entry

module R = Fable.Helpers.React

open R.Props
open Fable.Next
open Fable.Next.Props

type Entry =
  { slug: string
    title: string
    description: string }

type IEntryProps =
  abstract entry: Entry

let render (props: IEntryProps) =
  let entry = props.entry

  R.article [ClassName "entry"] [
    R.h2 [ClassName "title"] [
      link [Prefetch true; Href (String entry.slug)] [
        R.a [] [R.str entry.title]
      ]
    ]
    R.p [ClassName "description"] [R.str entry.description]
    styledJsx [R.str "
      .entry {
        padding: 0.5rem 0;
      }

      .entry p {
        font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif,
          Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif,
          Georgia, serif;
      }
    "]
  ]
