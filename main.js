"use strict"
const goods = [
    { title: 'MANGO PEOPLE T-SHIRT', price: 150, imgSrc: 'img/bracket_1.jpg', color: 'RED', size: 'XII', quantity: 2, shippingType: 'FREE'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 50, imgSrc: 'img/bracket_2.jpg', color: 'BLUE', size: 'XI', quantity: 3, shippingType: 'FREE'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 350, imgSrc: 'img/bracket_3.jpg', color: 'GREEN', size: 'X', quantity: 7, shippingType: 'FREE'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 450, imgSrc: 'img/bracket_3.jpg', color: 'YELLOW', size: 'IX', quantity: 4, shippingType: 'FREE'},
    { },
];
const products = [
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
    constructor(title = "SOON",
                price = 0,
                imgSrc = "img/soon_placeholder.jpg",
                color = "???",
                size = "?",
                quantity = 0,
                shippingType = "???"
                ){
        this.title = title;
        this.price = price;
        this.imgSrc = imgSrc;
        this.color = color;
        this.size = size;
        this.quantity = quantity;
        this.shippingType = shippingType;
    }
    render() {
        return `<tr class="tr_br">
        <td class="td_br td_br1">
            <img src="${this.imgSrc}" alt="" class="br_img">
            <div class="br_description">
                <div class="br_name">${this.title}</div>
                <div class="br_color">
                <span class="bold11_black">Color: </span>
                <span class="thin11_gray">${this.color}</span> <br>
                
                </div>
                <div class="br_size">
                    <span class="bold11_black">Size:</span>
                <span class="thin11_gray">${this.size}</span>
                </div>
            </div>
        </td>
        <td class="td_br">&#36;${this.price}</td>
        <td class="td_br">
            <input type="number" class="br_quantity" value="${this.quantity}">
        </td>
        <td class="td_br">${this.shippingType}</td>
        <td class="td_br">&#36;${this.price*this.quantity}</td>
        <td class="td_br">
            <img src="img/delete_icon.png" alt="" class="br_delete">
        </td>
    </tr>`;
    }
}

class GoodsList {
    constructor () {
        this.goods = [];
    }
    fetchGoods (){
        this.goods = goods;
        console.log(goods);
    }
    deleteGoods(id) {
        this.goods.splice(id, 1);
    }
    
    render () {
        //это же и есть получение списка товаров корзины
        let html = "";
        this.goods.forEach(({title, price, imgSrc, color, size, quantity, shippingType}) => {
            const goodItem = new GoodsItem(title, price, imgSrc, color, size, quantity, shippingType);
            html += goodItem.render();
        });
        document.querySelector ('.bracket_table').innerHTML = html;
    }
    calculateAndRenderSummary () {
        let summ = 0;
        this.goods.forEach(({price = 0, quantity = 1}) => {
            summ += price*quantity;
            console.log(price);
        });
        document.querySelector ('.sub_total').innerHTML = "Sub total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#36;" + summ;
        document.querySelector ('.grand_total').innerHTML = "&#36;" + summ;
    }
}
// const list = new GoodsList();
// list.fetchGoods();
// list.deleteGoods(1);
// list.render();
// list.calculateAndRenderSummary ();


class ProductItem {
    constructor(title = "SOON", price = 0, imgSrc = "img/soon_placeholder.jpg"){
        this.title = title;
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
                    <div class="featured_name">${this.title}</div>
                    <div class="featured_price">$${this.price}.00</div>
                </div>
            </a>
        </div>`;
    }
}
class ProductList {
    constructor () {
        this.goods = [];
    }
    fetchGoods (itemsArray = []){
        this.goods = itemsArray;
    }
    render () {
        let html = "";
        this.goods.forEach(({title, price, imgSrc}) => {
            const goodItem = new ProductItem(title, price, imgSrc);
            html += goodItem.render();
        });
        document.querySelector ('.products').innerHTML = html;
    }
    // calculateAndRenderSummary () {
    //     let summ = 0;
    //     this.goods.forEach(({price = 0, quantity = 1}) => {
    //         summ += price*quantity;
    //         console.log(price);
    //     });
    //     document.querySelector ('.sub_total').innerHTML = "Sub total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#36;" + summ;
    //     document.querySelector ('.grand_total').innerHTML = "&#36;" + summ;
    // }
}
const itemslist = new ProductList();
itemslist.fetchGoods(products);
itemslist.render();


const api = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json";

const makeGETRequest = (url, cb ) => {
    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if  (window.ActiveXObject) {
      xhr = new ActiveXObject ("Microsoft.XMLHTTP");
    };

    xhr.open('GET', url);
    xhr.send();
    console.log('2');

    let request = new Promise ((resolve, reject) => {
        xhr.onreadystatechange = function (){
            if (xhr.readyState === xhr.DONE && xhr.status === 200 ) {
                let data  = JSON.parse(xhr.response);
                resolve({data});
            } else if (xhr.status != 200) {
                reject(console.log('Error'));
            }
        }
    });
    request
        .then((data) => {
            cb(data);
        })
        .catch(() => {
            console.log('Error');
        });
  }

makeGETRequest(api, (data) => {
    console.log(data);
});

