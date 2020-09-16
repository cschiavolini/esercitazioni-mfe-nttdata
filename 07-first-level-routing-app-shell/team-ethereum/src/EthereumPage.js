import {html, render} from 'https://unpkg.com/lit-html@0.7.1/lit-html.js';

const routes = {
    "/": () => `
    <div>
        <h1>Buy now new ethereum /homepage</h1>
        <div>Do you want to buy eth? The price is: $363.92</div>
        <a href="/ethereum/buy">BUY NOW</a>
    </div>
    `,
    "/ethereum": () => `
    <div>
        <h1>Buy now new ethereum</h1>
        <div>Do you want to buy eth? The price is: $363.92</div>
        <a href="/ethereum/buy">BUY NOW</a>
    </div>
    `,
    "/ethereum/buy": () => `
        <label>
            <span>Credit Card Number</span>
            <input type="text" placehoder="CC"/>
            <a href="/ethereum/tnks">PAY NOW</a>
        </label>
    `, 
    "/ethereum/tnks": () => `
        <div>
            <h1>GRAZIE!</h1>
        </div>
    `
}

class EtheriumPage extends HTMLElement {
    connectedCallback(){
        console.log('Mount: Etherium page');

        let node = document.createElement('div');
        this.appendChild(node);
        
        //ASCOLTARE LA LOCATION
        window.appHistory.listen((location) => {
            this.render(location);
        });

        this.render(window.location);
    }

    disconnectedCallback(){
        console.log('Unmount: Etherium page');
    }

    render(location) {
        console.log("EthereumMfe: mounting", location.pathname)
        const page = routes[location.pathname];

        if(page && typeof page == 'function' ){
            this.innerHTML = page();
        }
    }
}

window.customElements.define("ethereum-page", EtheriumPage);