"use strict"
const goods = [
    { title: 'MANGO PEOPLE T-SHIRT', price: 150, imgSrc: 'img/bracket_1.jpg', color: 'RED', size: 'XII', quantity: 2, shippingType: 'FREE'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 50, imgSrc: 'img/bracket_2.jpg', color: 'BLUE', size: 'XI', quantity: 3, shippingType: 'FREE'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 350, imgSrc: 'img/bracket_3.jpg', color: 'GREEN', size: 'X', quantity: 7, shippingType: 'FREE'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 450, imgSrc: 'img/bracket_3.jpg', color: 'YELLOW', size: 'IX', quantity: 4, shippingType: 'FREE'},
    { },
];

class GoodsItem {
    constructor(title = "SOON", price = 0, imgSrc = "img/soon_placeholder.jpg", color = "???", size = "?", quantity = 0, shippingType = "???"){
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
    }
    render () {
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
const list = new GoodsList();
list.fetchGoods();
list.render();
list.calculateAndRenderSummary ();
