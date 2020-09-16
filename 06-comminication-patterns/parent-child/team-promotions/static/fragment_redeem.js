class RedeemPage extends HTMLElement {
    
    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

    }

    render(){
        this.innerHTML = `
        <h1>
            Il tuo codice è 1234
        </h1>
        `
    }
}

window.customElements.define("redeem-page", RedeemPage)