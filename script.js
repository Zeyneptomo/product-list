const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");

let products = [];
let selectedCategory = "Tümü";

async function getProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    products = data.products;
    renderProducts(products);
  } catch (error) {
    productList.innerHTML = `<p class="empty-message">Ürünler yüklenirken hata oluştu.</p>`;
    console.log("Hata:", error);
  }
}

function renderProducts(productArray) {
  productList.innerHTML = "";

  if (productArray.length === 0) {
    productList.innerHTML = `<p class="empty-message">Ürün bulunamadı.</p>`;
    return;
  }

  productArray.forEach((product) => {
    const oldPrice = product.price / (1 - product.discountPercentage / 100);

    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <span class="discount-badge">%${Math.round(product.discountPercentage)}</span>
      
      <img src="${product.thumbnail}" alt="${product.title}">
      
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>

        <div class="price-area">
          <span class="product-price">${product.price} $</span>
          <span class="old-price">${oldPrice.toFixed(2)} $</span>
        </div>
      </div>

      <button class="favorite-btn">♡</button>
    `;

    productList.appendChild(card);
  });

  favoriteButtonEvents();
}

function filterProducts() {
  const searchText = searchInput.value.toLowerCase().trim();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "Tümü" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filteredProducts);
}

function favoriteButtonEvents() {
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

searchInput.addEventListener("input", filterProducts);

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    selectedCategory = button.dataset.category;
    filterProducts();
  });
});

getProducts();