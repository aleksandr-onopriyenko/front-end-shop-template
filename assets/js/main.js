import Basket from './basket.js'

const BTN_TOUCH = 'ADD TO CART <i class="fas fa-shopping-cart"></i>'

let product
let responce = await fetch('assets/js/basket.json')
  .then(response => response.json())
  .then(data => product = data)

let card = document.querySelectorAll('.card')
let basket = new Basket('.basket', JSON.stringify([...Object.values(product)]))
basket.init()



// действия по нажатию кнопки добавить в корзину
const cardHeandler = (e) => {
  let targetArticle = e.target.dataset.art;
  if (e.target.classList.contains('btn-add')) {
    basket.addToBasket(targetArticle)
    showPrice(e.target)
    basket.showTotalCount(targetArticle)
  }
}

// временно показываем общую сумму добавленного товара
const showPrice = (target) => {
  let price = basket.obj[target.dataset.art].price;
  let count = basket.obj[target.dataset.art].count;
  let total = price * count;

  target.innerHTML = `ADDED ${total.toFixed(2)} $`
  setTimeout(() => popupText(target), 600)
  target.disabled = true
}

const popupText = (t) => {
  t.innerHTML = BTN_TOUCH
  t.disabled = false
}

// обработчик событий на кнопку карточки товара и при загрузки страницы
card.forEach(el => el.addEventListener('click', cardHeandler))
document.addEventListener("DOMContentLoaded", sessionStorage.clear());



