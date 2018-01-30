const { postList } = require("./pages/writing/_list");
const { deckList } = require("./pages/decks/_list");

module.exports = {
  exportPathMap: () => {
    const urls = {
      "/": { page: "/" },
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
