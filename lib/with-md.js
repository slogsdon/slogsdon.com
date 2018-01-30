import Image from "../components/image";
import MarkdownPage from "../components/markdown-page";

export default function withMd(options) {
  return function withContent(content) {
    return () => <MarkdownPage options={options} content={content} />;
  };
}

export const components = {
  img: Image,
};
