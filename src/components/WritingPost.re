let component = ReasonReact.statelessComponent("WritingPost");

let make = (~title, ~body, _children) => {
  ...component,
  render: _self =>
    <Fragment>
      <h1> (ReasonReact.string(title)) </h1>
      <Markdown source=body />
    </Fragment>,
};

[@bs.deriving abstract]
type jsProps = {
  body: string,
  title: string,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~title=jsProps |. title, ~body=jsProps |. body, [||])
  );
