const express = require("express");
const morgan  = require("morgan");
const Podlet  = require("@podium/podlet");

const podlet = new Podlet({
    name: "filmPage",
    version: "1.0.0",
    pathname: "/film-page",
    fallback: "/fallback",
    development: true
});

podlet.js({
    value: "http://localhost:3000/static/fragment.js",
    async: true
});

podlet.css({
    value: "http://localhost:3000/static/tailwind.min.css"
});

const app = express();

app.use(morgan("dev"));
app.use("/film-page", podlet.middleware());
app.use("/static", express.static("./static"));

app.get("/film-page/manifest.json", (req,res) => {
    res.status(200).json(podlet);
});

app.get("/film-page", (req, res) => {
    res.status(200).podiumSend(`
        <film-page>
        <div class="bg-gray-900">
            <div class="w-1/3 mx-auto p-3">
                <img
                class="rounded w-full image"
                src="http://127.0.0.1:3000/static/cover-standard.jpg"
                alt=""
                />
                <h1 class="text-white text-center text-lg my-3">
                Ace ventura, acchiappa animali
                </h1>
                <h2 class="text-center text-gray-500 font-bold text-xs my-3">
                <span>Comico - 90'</span>
                <span class="text-yellow-400 ml-3">✩✩✩✩✩</span>
                </h2>
                <div class="bg-gray-800 rounded-lg p-3 my-3 flex">
                    <label class="text-white uppercase font-bold">
                    <input type="checkbox" name="edition" class="version_check"/>
                    <span>Platinum Edition</span>
                    </label>
                </div>
                <div class="text-gray-500">
                Specializzato nel recupero di animali smarriti, Ace Ventura, viene
                incaricato dai manager della squadra dei Dolphins, di ritrovare il
                delfino Snowflake, mascotte della squadra, rapito alla vigilia della
                finale del Super Bowl.
                </div>

                <buy-button idprodotto="1" version="standard"></buy-button>
                <div>
                <promotions-area></promotions-area>
                </div>
            </div>
        </div>
        </film-page>
    `);
});

app.get("/film-page/fallback", (req, res) => {
    res.status(200).podiumSend(``)
});

app.listen(3000)
