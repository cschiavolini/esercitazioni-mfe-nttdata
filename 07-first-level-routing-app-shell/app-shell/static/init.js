console.log("App-shell started");

const appContent = document.querySelector("#app-content");

const routes = {
  "/ethereum": "ethereum-page",
  "/bitcoin": "bitcoin-page",
  "/": "ethereum-page",
};

const findComponentNameByPath = (path) => {
  const prefix = Object.keys(routes).find((k) => path.startsWith(k));
  return routes[prefix];
};

const mountMfe = (location) => {
    const mfeComponentName = findComponentNameByPath(location.pathname);
    const currentMfe = appContent.firstChild;

    console.log(appContent)

    if (currentMfe.nodeName !== mfeComponentName) {
        console.log(`AppShell: monto ${mfeComponentName}`);
        const mfeComponent = document.createElement(mfeComponentName);
        appContent.replaceChild(mfeComponent, currentMfe);
    } else {
        console.log(`AppShell: stai provando a rimontare il mfe gia montato, non faccio nulla e delego il routing conseguente al mfe interessato`);
    }
}

window.appHistory = window.History.createBrowserHistory();
window.appHistory.listen(mountMfe);

mountMfe(window.location);

document.addEventListener("click", (evt) => {
    if(evt.target.nodeName === "A") {
        const href = evt.target.getAttribute("href");
        window.appHistory.push(href);
        evt.preventDefault();
    }
    console.log("AppShell: click nel link");
})