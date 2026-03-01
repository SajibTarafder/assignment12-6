
// Cart
const cartCount = document.getElementById('cart-count');

// LocalStorage theke cart load
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// prothom count update
updateCartCount();

function addToCart(id) {

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(product => {

      cart.push(product);

      // save to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();

      alert("Product added to cart!");
    });
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}

// // Features
// const featureItems = document.getElementById('feature-items');
// const features = [
//   { icon: '🚚', title: 'Fast Delivery', text: 'Quick shipping to your door' },
//   { icon: '💳', title: 'Secure Payment', text: 'Safe & reliable payment options' },
//   { icon: '🛠️', title: '24/7 Support', text: 'We are here to help anytime' },
//   { icon: '⭐', title: 'Top Quality', text: 'Best products guaranteed' }
// ];
// features.forEach(f => {
//   const div = document.createElement('div');
//   div.className = 'card bg-base-100 shadow-lg p-6 relative hover:shadow-2xl transition duration-300';
//   div.innerHTML = `
//     <div class="card-body p-0">
//       <div class="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-lg absolute -top-7 left-6">${f.icon}</div>
//       <h2 class="card-title text-xl font-bold mt-10">${f.title}</h2>
//       <p class="text-gray-600">${f.text}</p>
//     </div>
//   `;
//   featureItems.appendChild(div);
// });



// Fetch Trending Products
const productsGrid = document.getElementById('trending-container');

// API data loadding
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(products => {
    // console.log(products)
    displayProducts(products);
  })
  .catch(err => {
    productsGrid.innerHTML = '<p>data load korte problem</p>';
    console.error(err);
  });

// product dekhano
function displayProducts(products) {
  productsGrid.innerHTML = '';

  // just 3 ta products dekhabe
  const firstThree = products.slice(0, 3);

  firstThree.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
    
 
<div class="card  shadow-sm h-full flex flex-col">
  <figure class="h-48 overflow-hidden">
    <img
      src="${product.image}"
      class="object-contain h-full w-full bg-slate-100 p-3"
      alt="${product.title}" />
  </figure>

  <div class="card-body flex flex-col flex-grow">
    <div class="flex justify-between items-center">
      <h2 class="bg-slate-200 text-blue-600 font-semibold rounded-4xl py-1 px-3 text-sm">
        ${product.category}
      </h2>

      <div class="flex gap-2 items-center text-sm">
        <i class="fa-solid fa-star text-yellow-400"></i>
        <p>${product.rating.rate} (${product.rating.count})</p>
      </div>
    </div>

    <h2 class="text-lg font-semibold line-clamp-2">
      ${product.title}
    </h2>

    <h2 class="text-lg font-semibold">$ ${product.price}</h2>

    <div class="card-actions justify-between mt-auto">
      <button  onclick="showDetails(${product.id})"  class="btn btn-sm btn-outline">
        <i class="fa-regular fa-eye"></i> Details
      </button>
      <button onclick="addToCart(${product.id})" class="btn btn-sm btn-primary">
        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
      </button>
      
    </div>
  </div>
</div>
`;

    productsGrid.appendChild(card);
  });
}

//  Products
const allProductsGrid = document.getElementById('products-grid');

// API data loadding
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(products => {
    // console.log(products)
    displayAllProducts(products);
  })
  .catch(err => {
    allProductsGrid.innerHTML = '<p>data load korte problem hocche</p>';
    console.error(err);
  });

  // product dekhano
function displayAllProducts(products) {
  allProductsGrid.innerHTML = '';

products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
    
 
<div class="card  shadow-sm h-full flex flex-col">
  <figure class="h-48 overflow-hidden">
    <img
      src="${product.image}"
      class="object-contain h-full w-full bg-slate-100 p-3"
      alt="${product.title}" />
  </figure>

  <div class="card-body flex flex-col flex-grow">
    <div class="flex justify-between items-center">
      <h2 class="bg-slate-200 text-blue-600 font-semibold rounded-4xl py-1 px-3 text-sm">
        ${product.category}
      </h2>

      <div class="flex gap-2 items-center text-sm">
        <i class="fa-solid fa-star text-yellow-400"></i>
        <p>${product.rating.rate} (${product.rating.count})</p>
      </div>
    </div>

    <h2 class="text-lg font-semibold line-clamp-2">
      ${product.title}
    </h2>

    <h2 class="text-lg font-semibold">$ ${product.price}</h2>

    <div class="card-actions justify-between mt-auto">
      <button  onclick="showDetails(${product.id})"  class="btn btn-sm btn-outline">
        <i class="fa-regular fa-eye"></i> Details
      </button>
      <button onclick="addToCart(${product.id})" class="btn btn-sm btn-primary">
        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
      </button>
    </div>
  </div>
</div>
`;

    allProductsGrid.appendChild(card);
  });
}


// product category
const categoryContainer = document.getElementById('level-container');

fetch('https://fakestoreapi.com/products/categories')
  .then(res => res.json())
  .then(categories => {
    displayCategories(categories);
  });

function displayCategories(categories) {
  categoryContainer.innerHTML = '';

  categories.forEach(category => {
    const button = document.createElement('button');
    button.className = 'btn btn-outline btn-primary';
    button.innerText = category;

    button.addEventListener('click', () => {
      loadProductsByCategory(category);
    });

    categoryContainer.appendChild(button);
  });
}

// category change 
function loadProductsByCategory(category) {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res => res.json())
    .then(products => {
      displayAllProducts(products);
    });
}



// product show details section
function showDetails(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(product => {

      const modalContent = document.getElementById("modal-content");

      modalContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div class="bg-slate-100 p-6 rounded-lg flex items-center justify-center">
            <img src="${product.image}" class="max-h-64 object-contain">
          </div>

          <div>
            <h2 class="text-2xl font-bold mb-2">${product.title}</h2>
            
            <p class="text-gray-600 mb-4">${product.description}</p>

            <div class="flex justify-between items-center mb-4">
              <span class="text-xl font-semibold">$ ${product.price}</span>
              
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-star text-yellow-400"></i>
                <span>${product.rating.rate} (${product.rating.count})</span>
              </div>
            </div>

            <button onclick="addToCart(${product.id})" class="btn btn-primary w-full">
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
          </div>

        </div>
      `;

      document.getElementById("product_modal").showModal();
    });
}