[@bs.module "react-router-dom"]
external fragment : ReasonReact.reactClass = "Link";
let make = (~to_, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=fragment,
    ~props={"to": to_},
    children,
  );
