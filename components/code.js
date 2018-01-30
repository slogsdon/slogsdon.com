export const Code = ({ children, syntax }) => (
  <pre className={`language-${syntax ? syntax : ""}`}>
    <code>{children.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")}</code>
  </pre>
);

export const InlineCode = ({ children, noWrap }) => (
  <code className={noWrap && "no-wrap"}>
    {children.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")}
  </code>
);
