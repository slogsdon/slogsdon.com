let component = ReasonReact.statelessComponent("PageIndex");

let make = _children => {
  ...component,
  render: _self =>
    <Fragment>
      <main className="container">
        <h1 className="title"> (ReasonReact.string("Shane Logsdon")) </h1>
        <p className="description">
          (
            ReasonReact.string(
              "I develop things. "
              ++ "Sometimes, I write about them here. "
              ++ "Let's start a conversation.",
            )
          )
        </p>
        <Nav isIndex=true />
      </main>
    </Fragment>,
};

[@bs.deriving abstract]
type jsProps =
  | ();

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
