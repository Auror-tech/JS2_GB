"use strict"
const goods = [
    { title: 'MANGO PEOPLE T-SHIRT', price: 150, imgSrc: 'img/bracket_1.jpg', color: 'RED', size: 'XII', quantity: 2, shippingType: 'FREE'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 50, imgSrc: 'img/bracket_2.jpg', color: 'BLUE', size: 'XI', quantity: 3, shippingType: 'FREE'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 350, imgSrc: 'img/bracket_3.jpg', color: 'GREEN', size: 'X', quantity: 7, shippingType: 'FREE'},
    { title: 'MANGO PEOPLE T-SHIRT', price: 450, imgSrc: 'img/bracket_3.jpg', color: 'YELLOW', size: 'IX', quantity: 4, shippingType: 'FREE'},
    { },
];
const renderGoodsItem = (title = "SOON", price = 0, imgSrc = "img/soon_placeholder.jpg", color = "???", size = "?", quantity = "0", shippingType = "???") => {
    return `<tr class="tr_br">
                <td class="td_br td_br1">
                    <img src="${imgSrc}" alt="" class="br_img">
                    <div class="br_description">
                        <div class="br_name">${title}</div>
                        <div class="br_color">
                        <span class="bold11_black">Color: </span>
                        <span class="thin11_gray">${color}</span> <br>
                        
                        </div>
                        <div class="br_size">
                            <span class="bold11_black">Size:</span>
                        <span class="thin11_gray">${size}</span>
                        </div>
                    </div>
                </td>
                <td class="td_br">&#36;${price}</td>
                <td class="td_br">
                    <input type="number" class="br_quantity" value="${quantity}">
                </td>
                <td class="td_br">${shippingType}</td>
                <td class="td_br">&#36;${price*quantity}</td>
                <td class="td_br">
                    <img src="img/delete_icon.png" alt="" class="br_delete">
                </td>
            </tr>`;
};
  
const renderGoodsList = (list) => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.imgSrc, item.color, item.size, item.quantity, item.shippingType));
    document.querySelector('.bracket_table').innerHTML = goodsList.join('');
}
  
renderGoodsList(goods);
