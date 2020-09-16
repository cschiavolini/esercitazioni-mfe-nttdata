const express = require("express");
const morgan = require("morgan");
const Podlet = require("@podium/podlet");

const podlet = new Podlet({
  name: "promotions",
  version: "0.0.1",
  pathname: "/promotions-area",
  fallback: "/fallback",
  development: true,
});

const podletRedeem = new Podlet({
  name: "redeem",
  version: "0.0.1",
  pathname: "/redeem",
  fallback: "/fallback",
  development: true,
});

podlet.js({
  value: "http://localhost:3002/static/fragment.js",
  async: true,
});

podlet.css({
  value: "http://localhost:3002/static/style.css",
});

podletRedeem.js({
  value: "http://localhost:3002/static/fragment_redeem.js",
});

const app = express();

app.use(morgan("dev"));
app.use("/promotions-area", podlet.middleware());
app.use("/redeem", podletRedeem.middleware());
app.use("/static", express.static("./static"));

app.get("/promotions-area/manifest.json", (req, res) => {
  res.status(200).json(podlet);
});

app.get("/redeem/manifest.json", (req, res) => {
  res.status(200).json(podletRedeem);
});

let ssr = () => {
  return "SSR...";
};

app.get("/promotions-area", (req, res) => {
  res.status(200).podiumSend(`
        <promotions-area>
            ${ssr()}
        </promotions-area>
    `);
});

app.get("/redeem", (req, res) => {
    res.status(200).podiumSend(`
          <redeem-page></redeem-page>
      `);
  });

app.get("/promotions-area/fallback", (_, res) => {
  res.status(200).podiumSend(`
        <div>Nessuna promozione disponibile</div>
    `);
});

app.get("/redeem/fallback", (_, res) => {
    res.status(200).podiumSend(`<div></div>`);
  });

app.listen(3002);
