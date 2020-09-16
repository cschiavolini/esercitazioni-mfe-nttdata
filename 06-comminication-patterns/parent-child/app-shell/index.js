const express = require("express");
const morgan = require("morgan");
const Layout = require("@podium/layout");

const layout = new Layout({
  name: "film",
  pathname: "/",
  development: true,
});

const buyButtonClient = layout.client.register({
  name: "buy-button",
  uri: "http://localhost:3001/buy-button/manifest.json",
  timeout: 500,
});

const filmPageClient = layout.client.register({
  name: "film-page",
  uri: "http://localhost:3000/film-page/manifest.json",
  timeout: 200,
});

const promotionsAreaClient = layout.client.register({
  name: "promotions-area",
  uri: "http://localhost:3002/promotions-area/manifest.json",
  timeout: 200,
});

const redeemAreaClient = layout.client.register({
  name: "redeem",
  uri: "http://localhost:3002/redeem/manifest.json",
  timeout: 200,
});

const app = express();
app.use(morgan("dev"));
app.use(layout.middleware());
app.use("/static", express.static("./static"));

layout.js([
  { value: "/static/init.js", defer: true },
  { value: "https://unpkg.com/history@4.9.0" },
]);

app.get("/", async (req, res, next) => {
  const incoming = res.locals.podium;

  let buyButtonResponse = await buyButtonClient.fetch(incoming, {
    query: {
      idprodotto: 1,
      version: "standard",
    },
  });
  let promotionsAreaResponse = await promotionsAreaClient.fetch(incoming, {});
  let redeemAreaResponse = await redeemAreaClient.fetch(incoming, {});
  let filmPageResponse = await filmPageClient.fetch(incoming, {});

  incoming.podlets = [
    buyButtonResponse,
    promotionsAreaResponse,
    redeemAreaResponse,
    filmPageResponse,
  ];

  res.status(200).podiumSend(`
  <div id="app-shell">
    <div id="app-content">
        <span>
            ${filmPageResponse}
        </span>
    </div>
  </div>`);
});

app.listen(3010);
