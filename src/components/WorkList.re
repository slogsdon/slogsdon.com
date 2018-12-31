[@bs.deriving abstract]
type workItem = {
  description: string,
  label: string,
  link: string,
};

[@bs.deriving abstract]
type workData = {
  intro: Js.Nullable.t(string),
  items: Js.Array.t(workItem),
  outro: Js.Nullable.t(string),
  title: string,
};

[@bs.deriving abstract]
type jsProps = {data: workData};

let component = ReasonReact.statelessComponent("WorkList");

let buildItem = (item: workItem) =>
  if (! Js.Nullable.test(Js.Nullable.return(item))) {
    <article key=(item |. link)>
      <Link to_=(item |. link)> (ReasonReact.string(item |. label)) </Link>
      <Markdown source=(item |. description) />
    </article>;
  } else {
    ReasonReact.null;
  };

let getContent = items => Array.map(buildItem, items);

let getOutro = (outro: Js.Nullable.t(string)) =>
  <Fragment> <hr /> <Markdown source=outro /> </Fragment>;

let make = (~data, _children) => {
  ...component,
  render: _self =>
    <Fragment>
      <h1> (ReasonReact.string(data |. title)) </h1>
      (
        ! Js.Nullable.test(data |. intro) ?
          <Markdown source=(data |. intro) /> : ReasonReact.null
      )
      (ReasonReact.array(getContent(data |. items)))
      (
        ! Js.Nullable.test(data |. outro) ?
          getOutro(data |. outro) : ReasonReact.null
      )
    </Fragment>,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~data=jsProps |. data, [||])
  );
