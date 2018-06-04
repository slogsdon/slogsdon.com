module Site.Components.Image

module R = Fable.Helpers.React

open R.Props
open Fable.Next

type IImageProps =
  { height: string option
    src: string }

let getImageHeight (props: IImageProps) =
  match props.height with
  | Some h -> h
  | None -> "100px"

let render (props: IImageProps) =
  R.div [ClassName "outer-container"] [
    R.div [ClassName "inner-container"] [
      R.div [ClassName "placeholder"] []
      R.img [ClassName "image"; Src props.src]
    ]
    styledJsx [R.str ("
      .outer-container {
        z-index: 0;
        position: relative;
      }

      .inner-container {
        position: relative;
        overflow: hidden;
        z-index: 1;
      }

      .placeholder {
        width: 100%;
        padding-bottom: " + (getImageHeight props) + ";
      }

      .image {
        position: absolute;
        top: 0px;
        left: 0px;
        transition-duration: 0.5s;
        transition-timing-function: initial;
        transition-property: opacity;
        opacity: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    ")]
  ]
