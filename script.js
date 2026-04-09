const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryBar = document.getElementById("categoryBar");

let products = [];
let selectedCategory = "Tümü";

async function getCategories() {
  try {
    const response = await fetch("https://dummyjson.com/products/categories");
    const categories = await response.json();

    renderCategories(categories);
  } catch (error) {
    console.log("Kategori yükleme hatası:", error);
  }
}

function renderCategories(allCategories) {
  categoryBar.innerHTML = "";

  const usedCategories = getUsedCategories(products);

  // Tümü butonu
  const allBtn = document.createElement("button");
  allBtn.classList.add("category-btn", "active");
  allBtn.textContent = "Tümü";
  allBtn.dataset.category = "Tümü";
  categoryBar.appendChild(allBtn);

  allCategories.forEach((category) => {
    if (!usedCategories.includes(category.slug)) return;

    const btn = document.createElement("button");
    btn.classList.add("category-btn");

    btn.textContent = translateCategory(category.slug);
    btn.dataset.category = category.slug;

    categoryBar.appendChild(btn);
  });

  addCategoryEvents();
}

function addCategoryEvents() {
  const categoryButtons = document.querySelectorAll(".category-btn");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      selectedCategory = button.dataset.category;
      filterProducts();
    });
  });
}

async function getProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    products = data.products;
    renderProducts(products);
  } catch (error) {
    productList.innerHTML = `<p class="empty-message">Ürünler yüklenirken hata oluştu.</p>`;
    console.log("Ürün yükleme hatası:", error);
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

  addFavoriteEvents();
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

function addFavoriteEvents() {
  const favButtons = document.querySelectorAll(".favorite-btn");

  favButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      btn.textContent = btn.classList.contains("active") ? "♥" : "♡";
    });
  });
}
function getUsedCategories(products) {
  return [...new Set(products.map(product => product.category))];
}
function translateCategory(category) {
  const map = {
    "beauty": "Kozmetik",
    "fragrances": "Parfüm",
    "furniture": "Mobilya",
    "groceries": "Market",
    
    
  };

  return map[category] || category;
}
searchInput.addEventListener("input", filterProducts);
async function init() {
  await getProducts();   
  await getCategories(); 
}

init();