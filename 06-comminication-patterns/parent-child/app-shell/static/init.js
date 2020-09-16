console.log("START!")

const appContent = document.querySelector("#app-content");

const routes = {
    '/': "film-page",
    '/redeem': "redeem-page"
};

const mountMfe = (location) => {
    const mfeComponentName = routes[location.pathname];
    const currentMfe = appContent.firstElementChild;

    if(currentMfe.nodeName !== mfeComponentName) {
        const mfeComponent = document.createElement(mfeComponentName);
        appContent.replaceChild(mfeComponent, currentMfe);
    }
}

window.appHistory = window.History.createBrowserHistory();
window.appHistory.listen(mountMfe);

mountMfe(window.location);