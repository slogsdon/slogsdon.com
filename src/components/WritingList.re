[@bs.deriving abstract]
type writingItem = {
  date: string,
  excerpt: string,
  slug: string,
  [@bs.as "title"]
  label: string,
};

[@bs.deriving abstract]
type writingData = {
  intro: Js.Nullable.t(string),
  items: Js.Array.t(writingItem),
  outro: Js.Nullable.t(string),
  title: string,
};

[@bs.deriving abstract]
type jsProps = {data: writingData};

let component = ReasonReact.statelessComponent("WritingList");

let buildItem = (item: writingItem) =>
  if (! Js.Nullable.test(Js.Nullable.return(item))) {
    <article key=(item |. slug)>
      <Link to_=("/writing/" ++ (item |. slug))>
        (ReasonReact.string(item |. label))
      </Link>
      <br />
      <time dateTime=(item |. date)>
        (ReasonReact.string(item |. date))
      </time>
      <Markdown source=(item |. excerpt) />
    </article>;
  } else {
    ReasonReact.null;
  };

let getContent = items => Array.map(buildItem, items);

let getOutro = (outro: Js.Nullable.t(string)) =>
  <Fragment> <hr /> <Markdown source=outro /> </Fragment>;

let log = (data: array('a)) => {
  Js.log(data);
  data;
};

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
