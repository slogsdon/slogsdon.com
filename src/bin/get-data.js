const fs = require("fs");
const path = require("path");
const { createClient } = require("contentful");

const SPACE = process.env.CONTENTFUL_SPACE;
const TOKEN = process.env.CONTENTFUL_TOKEN;

const types = ["pageWork", "pageWriting"];

const getData = async () => {
  const client = createClient({
    space: SPACE,
    accessToken: TOKEN
  });

  for (const type of types) {
    const entries = await client.getEntries({
      content_type: type
    });
    if (entries.total === 1) {
      const { fields } = entries.items[0];
      fields.items = fields.items.map(i => i.fields);
      fs.writeFileSync(
        path.join(__dirname, "..", "data", `${type}.json`),
        JSON.stringify(fields)
      );
      console.log("> Content retrieved for", type);
    }
  }
  return true;
};

module.exports = {
  getData
};

if (process.argv[2] === "run") {
  if (!SPACE || !TOKEN) {
    console.log("> Missing Contentful space ID/token");
    return;
  }
  getData();
}
