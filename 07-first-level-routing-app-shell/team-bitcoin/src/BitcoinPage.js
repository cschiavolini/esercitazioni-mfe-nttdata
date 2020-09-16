import { html, render } from 'https://unpkg.com/lit-html@0.7.1/lit-html.js'


class BitcoinPage extends HTMLElement {
    connectedCallback() {
        console.log("Mount: Bitcoin page");

        let node = document.createElement("div");
        this.appendChild(node);

        render(
            html`<h1>
                Welcome to bitcoin page
            </h1>`,
            node
        )
    }

    disconnectCallback(){
        console.log("Unmount: Bitcoin page");
    }
}

window.customElements.define("bitcoin-page", BitcoinPage);