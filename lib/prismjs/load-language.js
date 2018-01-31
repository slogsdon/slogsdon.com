import languages from "./components";

export default (syntax) => {
  const data = languages[syntax];
  if (!data) {
    throw new Error();
  }

  if (data.require) {
    if (Array.isArray(data.require)) {
      data.require.forEach(loadLanguage);
    } else {
      loadLanguage(data.require);
    }
  }

  require(`prismjs/components/prism-${syntax}`);
};
