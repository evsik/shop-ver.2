class Catalog {
    constructor(container, basket, catalogUrl) {
        this.items = []
        this.basket = basket
        this.container = container
        this.catalogUrl = catalogUrl
        this.init()
    }

    createProduct(product) {
        return {
            product_name: product.product_name,
            price: product.price,
            id_product: product.id_product,
            img: product.img,
            createTemplate() {
                return `
                        <div class="col-10 offset-1 col-sm-6 offset-sm-0 col-md-4 featuredItems" >
                            <div class="featuredItem">
                                <div class="featuredImgWrap">
                                    <div class="featuredBuy">
                                        <button class="buy-btn"
                                         name="buy-btn"
                                         data-name="${this.product_name}" 
                                         data-price="${this.price}" 
                                         data-img="${this.img}" 
                                         data-id="${this.id_product}">
                                           Add to Cart
                                        </button>
                                    </div>
                                    <img class="featuredProduct" src="${this.img}" alt="product1">
                                </div>
                                <div class="featuredBuySm
                                            d-flex
                                            flex-column
                                            justify-content-around
                                            align-items-center
                                            align-items-md-start">
                                    <div class="featuredItemName">${this.product_name}</div>
                                    <div class="featuredItemPrice">$${this.price}</div>
                                </div>
                            </div>
                        </div>
                    `
            }
        }
    }

    init() {
        this.items = []
        this.getData(this.catalogUrl)
            .finally(() => {
                this._fetchItems()
                this._render()
            })

        document.querySelector(this.container).addEventListener('click', evt => {
            if (evt.target.name === 'buy-btn') {
                console.log("[eq")
                this.basket.addProduct(evt.target.dataset)
            }
        })
    }

    getData(url) {
        return fetch(url)
            .then(data => data.json())
            .then((data2) => {
                this.items = data2
            })
    }

    _fetchItems() {
        let arr = []

        this.items.forEach(item => {
            arr.push(this.createProduct(item))
        })
        console.log(arr)
        this.items = arr
    }

    _render() {
        let container = document.querySelector(this.container)
        let domString = ''

        this.items.forEach(item => {
            domString += item.createTemplate()
        })
        container.innerHTML = domString
    }
}


// function createItem(id, name, price, img) {
//     return {id, name, price, img};
// }
//
// function initCatalog(qty) {
//     let ids = [];
//     let names = [];
//     let imgs = [];
//     let prices = [];
//
//     for (let i = 1; i <= qty; i++) {
//         ids.push(i);
//         names.push("MANGO PEOPLE T-SHIRT");
//         prices.push("1" + String(i) + ".00");
//         imgs.push(`https://raw.githubusercontent.com/evsik/static/master/SHOP(IMGS)/Fetured${i}.jpg`);
//     }
//
//     return names.map((names, index) => createItem(ids[index], names, prices[index], imgs[index]));
// }
//
// export default {
//     items: [],
//     container: null,
//     basket: null,
//
//     init(qty) {
//         this.items = initCatalog(qty);
//         this.container = document.querySelector("#catalog");
//         this.basket = basket
//         this._render(qty);
//         this._handleActions();
//     },
//     _handleActions() {
//         this.container.addEventListener('click', evt => {
//             if (evt.target.classList.contains("add")) {
//                 let item = {
//                     name: evt.target.dataset.name,
//                     price: +evt.target.dataset.price,
//                     img: evt.target.dataset.img,
//                     amount: 1,
//                     id: evt.target.dataset.id
//                 }
//                 this.basket.add(item);
//             }
//         })
//     },
//     _render() {
//         let str = "";
//         this.items.forEach(item => {
//             str += ``
//         })
//         this.container.innerHTML = str;
//     }
// }

export default Catalog