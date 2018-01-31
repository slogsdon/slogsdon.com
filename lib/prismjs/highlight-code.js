import * as prism from "prismjs";
import loadLanguage from "./load-language";

export default (code, syntax) => {
  if (!syntax) {
    return code;
  }

  if (typeof prism.languages[syntax] === "undefined") {
    try {
      loadLanguage(syntax);
    } catch (e) {
      return code;
    }
  }

  const lang = prism.languages[syntax];
  return prism.highlight(code, lang);
};
