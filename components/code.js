import highlight from "../lib/highlight-code";

export const Code = ({ children, syntax }) => (
  <pre className={`language-${syntax ? syntax : ""}`}>
    <code dangerouslySetInnerHTML={{__html: highlight(children.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), syntax) }}/>
  </pre>
);

export const InlineCode = ({ children, noWrap }) => (
  <code className={noWrap && "no-wrap"}>
    {children.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")}
  </code>
);
