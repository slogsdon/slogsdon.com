open Webapi.Dom;

let component = ReasonReact.statelessComponent("Nav");

let topMenu = isIndex =>
  if (isIndex) {
    ReasonReact.null;
  } else {
    <Fragment> <Nav /> <hr /> </Fragment>;
  };

let make = (~render, _children) => {
  ...component,
  render: _self =>
    <Fragment>
      (topMenu(Location.pathname(location) == "/"))
      (render())
    </Fragment>,
};

[@bs.deriving abstract]
type jsProps = {render: unit => ReasonReact.reactElement};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~render=jsProps |. render, [||])
  );
