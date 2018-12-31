let component = ReasonReact.statelessComponent("PageWork");

[@bs.module] external data : WorkList.workData = "../data/pageWork";

let make = _children => {...component, render: _self => <WorkList data />};

[@bs.deriving abstract]
type jsProps =
  | ();

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
