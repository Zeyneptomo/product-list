const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");

const products = [
  {
    id: 1,
    name: "Redmi Buds 6 Play Siyah Kulakiçi Kulaklık",
    category: "Elektronik",
    price: 679,
    oldPrice: 700,
    discount: true,
    image: "images/id1.jpg.jpeg"
  },
  {
    id: 2,
    name: "Telefon-iPhone 17 ",
    category: "Elektronik",
    price: 114999,
    oldPrice: null,
    discount: false,
    image: "images/id2.jpeg"
  },
  {
    id: 3,
    name: "Puma Club II Unisex Günlük Spor Ayakkabı Sneaker",
    category: "Spor",
    price: 2699,
    oldPrice: 2800,
    discount: true,
    image: "images/id3.jpeg"
  },
  {
    id: 4,
    name: "Kadın Parfüm Edt 50 Ml.",
    category: "Kozmetik",
    price: 3369,
    oldPrice: null,
    discount: false,
    image: "images/id4.jpeg"
  },
  {
    id: 5,
    name: "KPSS ALES DGS Ezberbozan Paragraf Soru Bankası",
    category: "Diğer",
    price: 336,
    oldPrice: null,
    discount: false,
    image: "images/id5.jpeg"
  },
  {
    id: 6,
    name: "Kadın Giyim Kaşe Bomber Ceket",
    category: "Moda",
    price: 1299,
    oldPrice: 1500,
    discount: true,
    image: "images/id6.jpeg"
  },
  {
    id : 7 ,
    name : "Pantolon" ,
    category : "Moda",
    price: 3000 ,
    oldPrice : null,
    discount: false,
    image:"images/id7.jpeg"


  }
];

let selectedCategory = "Tümü";

function renderProducts(productArray) {
  productList.innerHTML = "";

  if (productArray.length === 0) {
    productList.innerHTML = `<p class="empty-message">Aradığınız kriterlere uygun ürün bulunamadı.</p>`;
    return;
  }

  productArray.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
card.innerHTML = `
  ${product.discount ? `<span class="discount-badge">İndirim</span>` : ""}
  <img src="${product.image}" alt="${product.name}">
  <div class="product-info">
    <h3 class="product-name">${product.name}</h3>
    <div class="price-area">
      <span class="new-price">${product.price.toLocaleString("tr-TR")} TL</span>
      ${
        product.oldPrice
          ? `<span class="old-price">${product.oldPrice.toLocaleString("tr-TR")} TL</span>`
          : ""
      }
    </div>
  </div>
  <button class="favorite-btn">♡</button>
  
`;

    productList.appendChild(card);
  });
  const favButtons = document.querySelectorAll(".favorite-btn");

favButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");

    if (btn.classList.contains("active")) {
      btn.textContent = "♥";
    } else {
      btn.textContent = "♡";
    }
  });
});
}

function filterProducts() {
  const searchText = searchInput.value.toLowerCase().trim();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "Tümü" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filteredProducts);
}

searchInput.addEventListener("input", filterProducts);

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    selectedCategory = button.dataset.category;
    filterProducts();
  });
});


renderProducts(products);