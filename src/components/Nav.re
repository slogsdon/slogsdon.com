let component = ReasonReact.statelessComponent("Nav");

let indexLink = isIndex =>
  if (isIndex) {
    ReasonReact.null;
  } else {
    <Link to_="/"> (ReasonReact.string("SL")) </Link>;
  };

let getClass = isIndex => if (isIndex) {"index menu"} else {"menu"};

let make = (~isIndex=false, _children) => {
  ...component,
  render: _self =>
    <nav className=(getClass(isIndex))>
      (indexLink(isIndex))
      <Link to_="/work"> (ReasonReact.string("Work")) </Link>
      <Link to_="/writing"> (ReasonReact.string("Writing")) </Link>
    </nav>,
};

[@bs.deriving abstract]
type jsProps =
  | ();

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
