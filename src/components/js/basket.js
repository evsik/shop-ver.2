let basket = {
    items: [],
    shown: false,
    sum: 0,
    qua: 0,
    container: '#basket',
    itemsContainer: '.cart-block__items',
    createCartItem(id, name, price) {
        return {
            id_product: id,
            price: +price,
            product_name: name,
            quantity: 1,
            img: 'http://placehold.it/100x80',
            createTemplate() {
                return `
                    <div class="b-item_cart headerCartWrapIn" data-id="${this.id_product}">
                        <img src="${this.img}" alt="${this.product_name}"
                          width="100" height="80"
                          class="b-item__img_cart">
                        <div class="b-item__desc_cart">
                            <p class="b-item__name_cart">${this.product_name}</p>
                            <p class="b-item__quantity_cart">${this.quantity}</p>
                            <p class="b-item__price_cart">${this.price}</p>
                        </div>
                        <div class="right-block">
                            <p class="product-price">$${this.price * this.quantity}</p>
                            <button name="del-btn" class="b-item__delete_cart"
                             data-id="${this.id_product}">
                             &times;
                             </button>
                        </div>
                    </div>
                    `
            }
        }
    },
    init() {
        document.querySelector(this.container).addEventListener('click', () => {
            basket.shown = !basket.shown
            basket.render()
            // document.querySelector(this.container).classList.toggle('myVisible')
        })

        document.querySelector(this.container).addEventListener('click', evt => {
            if (evt.target.name === 'del-btn') {
                this.removeProduct(evt.target.dataset.id)
            }
        })
    },
    render() {
        let container = document.querySelector(this.itemsContainer)
        let domString = ''

        this.items.forEach(item => {
            domString += item.createTemplate()
        })
        container.innerHTML = domString

        document.querySelector('#tot-sum').innerHTML = this.sum
        document.querySelector('#tot-qua').innerHTML = this.qua
    },
    addProduct(product) {
        let find = this.items.find(item => item.id_product === product.id)
        if (!find) {
            this.items.push(basket.createCartItem(product.id, product.name, product.price)) //потому-что дата-сет из catalog
        } else {
            find.quantity++
        }
        this.checkTotal()
        this.render()
    },
    removeProduct(id) {
        let find = this.items.find(item => item.id_product === id)
        if (find.quantity === 1) {
            this.items.splice(this.items.indexOf(find), 1)
        } else {
            find.quantity--
        }
        this.checkTotal()
        this.render()
    },
    checkTotal() {
        let s = 0
        let q = 0

        this.items.forEach(item => {
            q += item.quantity
            s += item.quantity * item.price
        })

        this.sum = s
        this.qua = q
    },
}

export default basket
// export default {
//     items: [],
//     container: null,
//     total: 0,
//
//     init() {
//         this.container = document.querySelector("#basket");
//         this._render();
//         this._handleActions();
//     },
//     _handleActions() {
//         this.container.addEventListener('click', evt => {
//             if (evt.target.classList.contains('remove')) {
//                 this.remove(evt.target.dataset.id);
//             }
//         })
//     },
//     _render() {
//         let str = "";
//         this.items.forEach(item => {
//             str += `
//             <div class="d-flex headerCartWrapIn">
//                 <a href="#" class="d-flex">
//                     <img src="${item.img}" alt="" style="height: 85px">
//                     <div>
//                         <div>${item.name}</div>
//                         <span>
//                             <i class="fas fa-star"></i>
//                             <i class="fas fa-star"></i>
//                             <i class="fas fa-star"></i>
//                             <i class="fas fa-star"></i>
//                             <i class="fas fa-star-half-alt"></i>
//                         </span>
//                         <div class="headerCartWrapPrice">${item.amount}
//                             <span>x</span> $${item.price}
//                         </div>
//                     </div>
//                 </a>
//                 <a href="#" class="remove"><i class="fas fa-times-circle remove" data-id="${item.id}"></i></a>
//             </div>
//             `
//         })
//         this.container.innerHTML = str + `
//         <div class="headerCartWrapTotalPrice">
//                             <div>total&nbsp;</div>
//                             <div>$${this.total}</div>
//                         </div>
//
//                         <button type="button" class="productsButtonIndex">Checkout</button>
//                         <button type="button" class="productsButtonIndex">Go to cart</button>`;
//
//     },
//     add(item) {
//         let find = this.items.find(el => el.id == item.id);
//
//         if (!find) {
//             this.items.push(item);
//             this.total = this.total + Number(item.price);
//         } else {
//             find.amount++;
//             this.total = this.total + Number(find.price);
//         }
//         this._render();
//     },
//     remove(itemId) {
//
//         let find = this.items.find(el => el.id == itemId);
//
//         if (find.amount > 1) {
//             find.amount--;
//             this.total = this.total - Number(find.price);
//         } else {
//             this.items.splice(this.items.indexOf(find), 1);
//             this.total = this.total - Number(find.price);
//         }
//         this._render();
//     }
// }

// basket.init();
