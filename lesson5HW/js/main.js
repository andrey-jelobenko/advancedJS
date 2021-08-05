const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    basketUrl: '/getBasket.json',
    products: [],
    filtered: [],
    productList: [],
    baskets: {},
    imgCatalog: 'https://via.placeholder.com/200x150',
    imgBasket: 'https://via.placeholder.com/50x100',
    searchLine: '',
    isVisibleCart: false,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product) {
      console.log(product);
    },
    /**
 * метод поиска товаров
 * @param value - поисковый запрос
 */
    filter() {
      value = this.searchLine;
      const regexp = new RegExp(value, 'i');
      this.filtered = this.products.filter(product => regexp.test(product.product_name));
      if (this.filtered.length) this.productList = this.filtered;
      else this.productList = [];
    }
  },
  beforeCreated() {

  },
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        this.products = data;
        this.productList = this.products;
      });
    this.getJson(`${API + this.basketUrl}`)
      .then(data => {
        this.baskets = data;
      });
  },
});
