class Basket {
  constructor(container, obj) {
    this.basket = document.querySelector(container);
    this.basketList = this.basket.querySelector(".basket-list");
    this.basketPrice = this.basket.querySelector(".basket-price");
    this.countProd = document.querySelector(".count-cart");
    this.obj = JSON.parse(obj);
  }

  _initProp() {
    this.basketBtn = document.querySelector(".btn-cart");
    this.basketTotal = this.basket.querySelector(".basket-total");
    this.basketCount = this.basket.querySelector(".basket-count");
    this.resetBtn = this.basket.querySelector(".btn-reset");
    this.continueBtn = this.basket.querySelector(".btn-next");
    this.checkoutBtn = this.basket.querySelector(".btn-checkout");

    this.totalPrice = 0;
    this.totalCount = 0;
    this.isNull = false;
  }

  _initBasketList() {
    for (let i = 0; i < this.obj.length; i++) {
      let item = document.createElement("li");
      item.dataset.art = i;
      this.basketList.appendChild(item);
    }
    this.basketItem = this.basketList.querySelectorAll("li");
  }

  _initBasketItem(e) {
    sessionStorage.setItem(e.article, JSON.stringify(e));
    this.session = JSON.parse(sessionStorage.getItem(e.article));
    this.basketItem.forEach((el) => {
      if (el.dataset.art == this.session.article) {
        this.totalItemPrice = this.session.count * this.session.price;
        el.innerHTML = `
        <span>${this.session.name}</span>
        <span>- ${this.session.count} шт</span>
        <span>цена ${this.session.price}$</span>
        <span>сумма: ${this.totalItemPrice.toFixed(2)}$</span>
        <button class="btn btn-primary del" data-id="${e.article}"></button>
        `;
      }
    });
  }

  _initListeners() {
    this.basketBtn.addEventListener("click", this._showBasket.bind(this));
    this.basketList.addEventListener("click", this.deleteItem.bind(this));
    this.continueBtn.addEventListener("click", this.continue.bind(this));
    this.resetBtn.addEventListener("click", this.reset.bind(this));
    this.checkoutBtn.addEventListener("click", this.checkout.bind(this));
  }

  addToBasket(e) {
    this.obj[e].count++;
    this._initBasketItem(this.obj[e]);

    this.isNull = true;
    this.visibleElem();
  }

  continue = () => this.basket.classList.remove("active");

  checkout = () => window.open("./checkout.html", "_blank");

  deleteFromStorage = (i) => {
    this.session = JSON.parse(sessionStorage.getItem(i));
    this.obj[i].count = 0;
    sessionStorage.removeItem(i);
    this.basketItem[i].innerHTML = "";
    if (sessionStorage.length == 0) {
      this.hiddenElem();
    }
  };

  visibleElem() {
    this.basket.classList.remove("active");
    this.resetBtn.classList.remove("btn-none");
    this.checkoutBtn.classList.remove("btn-none");
    this.basketList.classList.remove("d-none");
    this.basketPrice.classList.remove("d-none");
    this.countProd.classList.add("active");
  }

  hiddenElem() {
    this.basketList.classList.add("d-none");
    this.basketPrice.classList.add("d-none");
    this.resetBtn.classList.add("btn-none");
    this.checkoutBtn.classList.add("btn-none");
    this.countProd.classList.remove("active");
  }

  deleteItem(event) {
    let target = event.target;
    if (target.classList.contains("del")) {
      this.deleteFromStorage(target.dataset.id);
    }
    this.showTotal();
    this.showTotalCount();
  }

  getTotalCount = () =>
    Object.values(sessionStorage)
      .map((el) => JSON.parse(el).count)
      .reduce((a, b) => a + b, 0);

  getTotalPrice = () =>
    Object.values(sessionStorage)
      .map((el) => JSON.parse(el).count * JSON.parse(el).price)
      .reduce((a, b) => a + b, 0);

  reset = () => {
    sessionStorage.clear();
    this.basketItem.forEach((el) => (el.innerHTML = ""));
    this.obj.forEach((el) => (el.count = 0));
    this.basketTotal.innerHTML = 0;
    this.basketCount.innerHTML = 0;
    this.hiddenElem();
    this.showTotalCount();
  };

  showTotalCount = () => (this.countProd.innerHTML = this.getTotalCount());

  showTotal() {
    this.basketTotal.innerHTML = this.getTotalPrice();
    this.basketCount.innerHTML = this.getTotalCount();
  }

  _showBasket() {
    this.basket.classList.toggle("active");
    !this.isNull || this.showTotal();
  }

  init() {
    this._initProp();
    this._initBasketList();
    this._initListeners();
  }
}

export default Basket;
