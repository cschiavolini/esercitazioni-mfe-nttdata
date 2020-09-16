class FilmPage extends HTMLElement {
    
    connectedCallback(){
        this.render();
        this.check = this.querySelector(".version_check");
        this.buyButton = this.querySelector("buy-button");

        console.log(this.buyButton);
        const image = this.querySelector("img");

        this.onCheck = (e) => {
            const version = e.target.checked ? "platinum" : "standard";
            this.buyButton.setAttribute("version", version);
            image.src = image.src.replace(/(standard|platinum)/, version)
        };
        this.check.addEventListener("change", this.onCheck);

        this.onCheckoutItemAdded = (e) => {
            image.classList.add("animate-bounce");
            image.classList.add("motion-reduce");
            setTimeout(
                () => {
                    image.classList.remove("animate-bounce");
                    image.classList.remove("motion-reduce");
    
                }, 4000
            );
        }
        this.buyButton.addEventListener("checkout:item_added", this.onCheckoutItemAdded)
    }

    disconnectedCallback(){
        this.check.removeEventListener("change", this.onCheck)
        this.buyButton.removeEventListener("checkout:item_added", this.onCheckoutItemAdded)
    }

    render(){
        this.innerHTML = `
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
        `
    }
}

window.customElements.define("film-page", FilmPage)