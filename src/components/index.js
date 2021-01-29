import basket from "./js/basket";
import Catalog from "./js/catalog";

export default () => {
    basket.init()
    let catalog = new Catalog('#catalog', basket, 'https://raw.githubusercontent.com/evsik/shop-ver.2/master/catalog.json')
}