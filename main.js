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
    }
    fetchGoods (){
        makeGETRequest(`${api}/catalogData.json`)
        //.then((data) => {console.log(data)})
        // .then((data) => {console.log(data.contents)})
        .then((data) => {this.goods = data})
        .then(() => this.render())
        // .then((data) => (this.goods = [1, 2, 3]))
        // .then(() => {console.log(this.goods)})
        // .then(() => {console.log(this)})
        
        // .catch(() => {console.log('Error')})
    }
    render () {
        let html = "";
        console.log(this.goods);
        this.goods.forEach(({id_product, product_name, price}) => {
            const goodItem = new GoodsItem(id_product, product_name, price);
            html += goodItem.render();
        });
        document.querySelector ('.products').innerHTML = html;
    }
}

const makeGETRequest = (url) => {
    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if  (window.ActiveXObject) {
      xhr = new ActiveXObject ("Microsoft.XMLHTTP");
    };

    xhr.open('GET', url);
    xhr.send();
    console.log('2');

    return new Promise ((resolve, reject) => {
        xhr.onreadystatechange = function (){
            if (xhr.readyState === xhr.DONE && xhr.status === 200 ) {
                let data  = JSON.parse(xhr.response);
                console.log('jobs done');
                resolve(data);
            } else if (xhr.status != 200) {}
        }
    });
  }
// makeGETRequest(`${api}/`)
//     .then((data) => {console.log(data)})
//     .catch(() => {console.log('Error')})

    const itemslist = new GoodsList();
    itemslist.fetchGoods();
// itemslist.render();
