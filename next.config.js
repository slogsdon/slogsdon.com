const { postList } = require("./pages/writing/_list");
const { deckList } = require("./pages/decks/_list");
const path = require('path');
const resolve = (p) => path.resolve(__dirname, p);

const babelOptions = require('fable-utils').resolveBabelOptions({});
babelOptions.presets = [require.resolve('next/babel')].concat(babelOptions.presets || [])

module.exports = {
  webpack(config, {dev}) {
    config.module.rules.push({
      test: /\.fs(x|proj)?$/,
      use: [{
        loader: 'fable-loader',
        options: {
          define: dev ? ['DEBUG'] : [],
          babel: babelOptions,
          extra: {
            projectFile: resolve('src/site.fsproj'),
          },
        },
      }],
    });
    return config;
  },
  exportPathMap: () => {
    const urls = {
      "/": { page: "/" },
      "/test/": { page: "/test" },
      "/about/": { page: "/about" },
      "/work/": { page: "/work" },
      "/writing/": { page: "/writing" },
      "/decks/": { page: "/decks" },
    };

    postList.map((p) => {
      urls[p.slug + "/"] = { page: p.slug };
    });

    deckList.map((d) => {
      urls[d.slug + "/"] = { page: d.slug };
    });

    return urls;
  },
};
