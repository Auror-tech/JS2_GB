"use strict"

const api = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const goods = [
    { title: 'MANGO PEOPLE T-SHIRT', price: 150, imgSrc: 'img/product1.png'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 50, imgSrc: 'img/product2.png'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 350, imgSrc: 'img/product3.png'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 450, imgSrc: 'img/product4.png'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 150, imgSrc: 'img/product5.png'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 50, imgSrc: 'img/product6.png'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 350, imgSrc: 'img/product7.png'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 450, imgSrc: 'img/product8.png'},
    { },
];


class GoodsItem {
    constructor(id_product = 0, product_name = "SOON", price = 0, imgSrc = "img/soon_placeholder.jpg"){
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.imgSrc = imgSrc;
    }
    render() {
        return `
        <div class="item_block">
            <a href="#" class="featured_link"> <img src="${this.imgSrc}" alt="" class="featured_link_img">
                <a href="#" class="add_to_cart_link">
                    <div class="add_to_cart"><img src="img/bracket_white.svg" alt="">
                        <div class="add_to_cart_text">Add to Cart</div>
                    </div>
                </a>
                <div class="description_featured">
                    <div class="featured_name">${this.product_name}</div>
                    <div class="featured_price">$${this.price}.00</div>
                </div>
            </a>
        </div>`;
    }
}
class GoodsList {
    constructor () {
        this.goods = [];
        this.filteredGoods = [];
    }
    fetchGoods (){
        makeGETRequest(`${api}/catalogData.json`)
        .then((data) => {this.goods = data})
        .then(() => this.render(this.goods))
    }
    render (listToRender) {
        let html = "";
        listToRender.forEach(({id_product, product_name, price}) => {
            const goodItem = new GoodsItem(id_product, product_name, price);
            html += goodItem.render();
        });
        document.querySelector ('.products').innerHTML = html;
    }
    filterGoods(currentInput) {
        const regexp = new RegExp(currentInput, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render(this.filteredGoods);
    }
}
new Vue( {
    el: '.search_text1',
    data: {
        currentInput: 'search...'
    },
    methods: {
        filter(event) {
            this.currentInput = event.target.value;
            console.log(this.currentInput);
            itemslist.filterGoods(this.currentInput);
        }
    }
});

const makeGETRequest = (url) => {
    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if  (window.ActiveXObject) {
      xhr = new ActiveXObject ("Microsoft.XMLHTTP");
    };

    xhr.open('GET', url);
    xhr.send();

    return new Promise ((resolve, reject) => {
        xhr.onreadystatechange = function (){
            if (xhr.readyState === xhr.DONE && xhr.status === 200 ) {
                let data  = JSON.parse(xhr.response);
                resolve(data);
            } else if (xhr.status != 200) {}
        }
    });
  }
    const itemslist = new GoodsList();
    itemslist.fetchGoods();


class BracketItem {
    constructor (id_product = 0, product_name = "NotFound", price = 0, quantity = 404 , imgSrc = 'img/soon_placeholder.jpg'){
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.imgSrc = imgSrc;
        this.quantity = quantity;
    }
    render () {
        return `
        <div class="drop_item"> <img src="${this.imgSrc}" class="cart_img" alt="">
        <div class="cart_description">
            <div class="cart_item_name">${this.product_name}</div> <img src="img/cart_stars.png" alt="" class="cart_stars">
            <div class="cart_item_price">${this.quantity} x &#36;${this.price}</div> <img src="img/delete_icon.png" alt="" class="cart_delete"> </div>
        <div class="cart_line"></div>
        </div>`
    }
}

class BracketList {
    constructor() {
        this.itemsList = [];
        this.summ = 0;
    }
    fetchGoods () {
        makeGETRequest(`${api}/getBasket.json`)
        .then((data) => {
            this.summ = data.amount;
            this.countGoods = data.countGoods;
            this.itemsList = data.contents;
        })
        .then(() => this.renderSumm())
        .then(() => this.render())
    }
    render (){
        let html = "";
        this.itemsList.forEach(({id_product, product_name, price, quantity, imgSrc}) => {
            const bracketItem = new BracketItem(id_product, product_name, price, quantity, imgSrc);
            html += bracketItem.render();
        });
        document.querySelector ('.drop_bracketList').innerHTML = html;
    }
    renderSumm () {
        document.querySelectorAll('.summ_text')[1].innerHTML = `&#36;${this.summ}`;
    }
}

const bracketList = new BracketList();
bracketList.fetchGoods();
