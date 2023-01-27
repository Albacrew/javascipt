'use strict';

const cartCounterEl = document.querySelector('.counter');
const cartTotalEl = document.querySelector('.CartBoxTotal');
const cartTotalValueEl = document.querySelector('.CartBoxTotalValue');
const cartBoxEl = document.querySelector('.SmallCartBox');

document.querySelector('.number-in-circle')
.addEventListener('click', (event) => {
   cartBoxEl.classList.toggle('hidden');
});

const cart = {};

document.querySelector('.product-item-box')
.addEventListener('click', (event) => {
    if (!event.target.closest('.product-item-add-box')) {
        event.preventDefault();
        return;
      }
    event.preventDefault();
    const productItemEl = event.target.closest('.product-item');
    const id = +productItemEl.dataset.id;
    const name = productItemEl.dataset.name; 
    const price = +productItemEl.dataset.price;
    console.log(id, name, price);
    addProductToCart(id, name, price);
});

/**
 * Функция добавления продукта в корзину.
 * @param {number} id - Id продукта.
 * @param {string} name - название продукта.
 * @param {number} price - цена продукта.
 */
function addProductToCart(id, name, price) {
    if (!(id in cart)) {
        cart[id] = {
            id: id,
            name: name,
            price: price,
            count: 0,
        };
    }
    cart[id].count++;
    cartCounterEl.textContent = getCartTotalCount();
    cartTotalValueEl.textContent = getCartTotalPrice().toFixed(2);
    createProductInCart(id);
}

/**
 * Функция подсчитывает количество продуктов в корзине.
 * @returns {number} - количество продуктов в корзине.
 */
function getCartTotalCount() {
//   return Object.values(cart).reduce((acc, product) => acc + product.count, 0);
   const productsArr = Object.values(cart);
   let count = 0;
   for (const product of productsArr) {
    count = count + product.count;
   }
   return count;
}

/**
 * Функция подсчитывает итоговую сумму, выбранных продуктов в корзине.
 * @returns {number} - итоговая сумма, выбранных продуктов в корзине.
 */
function getCartTotalPrice() {
    return Object.values(cart)
    .reduce((acc, product) => acc + product.count * product.price, 0);
}

/**
 * Функция создает новую информацию о выбранном продукте в корзине.
 * @param {number} productId - Id продукта.
 */
function createNewProductInCart(productId) {
    const productRow = `
    <div class="cartBoxRow" data-id="${productId}">
    <div>${cart[productId].name}</div>
    <div>
      <span class="productCount">${cart[productId].count}</span> шт.
    </div>
    <div>$${cart[productId].price}</div>
    <div>
      $<span class="productTotalRow">${(cart[productId].price * cart[productId].count).toFixed(2)}</span>
    </div>
  </div>
  `;
  cartTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

/**
 * Функция добавляет информацию о выбранном продукте в корзину.
 * @param {number} productId - Id продукта.
 */
function createProductInCart(productId) {
    const cartBoxRowEl = cartBoxEl
    .querySelector(`.cartBoxRow[data-id="${productId}"]`);
    if (!cartBoxRowEl) {
      createNewProductInCart(productId);
      return;
    }
    cartBoxRowEl.querySelector('.productCount').textContent = cart[productId].count;
    cartBoxRowEl.querySelector('.productTotalRow')
    .textContent = cart[productId].count * cart[productId].price;
}