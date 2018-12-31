[@bs.module] external markdown : ReasonReact.reactClass = "react-markdown";
let make = (~source, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=markdown,
    ~props={"source": source},
    children,
  );
