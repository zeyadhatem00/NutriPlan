import { loggedmeal, show } from "../main.js";
export const braekfast = document.getElementById("breakfast-cereals");
export const snacks = document.getElementById("snacks");
export const beverages = document.getElementById("beverages");
export const cheeses = document.getElementById("cheeses");
export const yogurts = document.getElementById("yogurts");
export const chocolates = document.getElementById("chocolates");
export const biscuits = document.getElementById("biscuits");
export const ice_creams = document.getElementById("ice-creams");
export const breads = document.getElementById("breads");
export const waters = document.getElementById("waters");
const productcontainer = document.getElementById("products-grid");
const productcount = document.getElementById("products-count");
export let allcategoryproducts;
export let x;
let newarray2E;
let newarray2A;
let newarray2B;
let newarray2C;
let newarray2D;
const productmodal = document.getElementById("log-product-modal");
let servValue = 1.0;

export async function categoryproducts(term) {
  try {
    let req = await fetch(
      `https://nutriplan-api.vercel.app/api/products/category/${term}`,
    );
    let response = await req.json();
    allcategoryproducts = response.results;
    if (allcategoryproducts.length == 0) {
      productcount.innerHTML = `  No products found in ${term}`;
      productcontainer.classList.remove(
        "grid",
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-4",
        "gap-5",
      );
      productcontainer.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No product found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>`;
    } else {
      displaycatregoryproduct(term);
    }
  } catch (error) {
    productcontainer.classList.remove(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      "gap-5",
    );
    productcontainer.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">something went wrong </p>
    <p class="text-gray-400 text-sm mt-2">please refresh</p>
</div>`;
  }
}

export function displaycatregoryproduct(name) {
  x = name;
  let cart = "";
  for (let i = 0; i < allcategoryproducts.length; i++) {
    cart += `<div
    onclick="appearmodal2(${i})"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${allcategoryproducts[i].image ? allcategoryproducts[i].image : "images/Adobe Express - file.png"}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute  ${!allcategoryproducts[i].nutritionGrade || allcategoryproducts[i].nutritionGrade == "unknown" ? "loading" : ""}    top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${allcategoryproducts[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class=" ${!allcategoryproducts[i].novaGroup || allcategoryproducts[i].novaGroup == "unknown" ? "loading" : ""}    absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${allcategoryproducts[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${allcategoryproducts[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${allcategoryproducts[i].name}
                  </h3>

                  <div
                    class="flex items-center  text-xs text-gray-500 mb-3"
                  >
                    
                      <i class="fa-solid fa-fire "></i> ${Math.round(allcategoryproducts[i].nutrients.calories)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Math.round(allcategoryproducts[i].nutrients.protein)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Math.round(allcategoryproducts[i].nutrients.carbs)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Math.round(allcategoryproducts[i].nutrients.fat)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Math.round(allcategoryproducts[i].nutrients.sugar)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`;
  }
  productcontainer.classList.add(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = cart;
  productcount.innerHTML = `  Found ${allcategoryproducts.length} products in ${name}`;
}

export function fliternutrigradeEproduct() {
  newarray2E = allcategoryproducts.filter((item) => {
    return item.nutritionGrade == "e";
  });
  console.log(newarray2E);
  if (newarray2E.length == 0) {
    productcount.innerHTML = `  No products found in ${x}`;
    productcontainer.classList.remove(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      "gap-5",
    );
    productcontainer.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No product found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>`;
  } else {
    let cart = "";
    for (let i = 0; i < newarray2E.length; i++) {
      cart += `<div
      onclick="appearmodal2E(${i})"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${newarray2E[i].image ? newarray2E[i].image : "images/Adobe Express - file.png"}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute  ${!newarray2E[i].nutritionGrade || newarray2E[i].nutritionGrade == "unknown" ? "loading" : ""}    top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${newarray2E[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class=" ${!newarray2E[i].novaGroup || newarray2E[i].novaGroup == "unknown" ? "loading" : ""}    absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${newarray2E[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${newarray2E[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${newarray2E[i].name}
                  </h3>

                  <div
                    class="flex items-center  text-xs text-gray-500 mb-3"
                  >
                    
                      <i class="fa-solid fa-fire "></i> ${Math.round(newarray2E[i].nutrients.calories)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Math.round(newarray2E[i].nutrients.protein)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Math.round(newarray2E[i].nutrients.carbs)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Math.round(newarray2E[i].nutrients.fat)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Math.round(newarray2E[i].nutrients.sugar)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    productcontainer.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      "gap-5",
    );
    productcontainer.innerHTML = cart;
    productcount.innerHTML = `  Found ${newarray2E.length} products for ${x}`;
  }
}
export function fliternutrigradeAproduct() {
  newarray2A = allcategoryproducts.filter((item) => {
    return item.nutritionGrade == "a";
  });
  console.log(newarray2A);
  if (newarray2A.length == 0) {
    productcount.innerHTML = `  No products found in ${x}`;
    productcontainer.classList.remove(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      "gap-5",
    );
    productcontainer.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No product found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>`;
  } else {
    let cart = "";
    for (let i = 0; i < newarray2A.length; i++) {
      cart += `<div
       onclick="appearmodal2A(${i})"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${newarray2A[i].image ? newarray2A[i].image : "images/Adobe Express - file.png"}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute  ${!newarray2A[i].nutritionGrade || newarray2A[i].nutritionGrade == "unknown" ? "loading" : ""}    top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${newarray2A[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class=" ${!newarray2A[i].novaGroup || newarray2A[i].novaGroup == "unknown" ? "loading" : ""}    absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${newarray2A[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${newarray2A[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${newarray2A[i].name}
                  </h3>

                  <div
                    class="flex items-center  text-xs text-gray-500 mb-3"
                  >
                    
                      <i class="fa-solid fa-fire "></i> ${Math.round(newarray2A[i].nutrients.calories)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Math.round(newarray2A[i].nutrients.protein)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Math.round(newarray2A[i].nutrients.carbs)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Math.round(newarray2A[i].nutrients.fat)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Math.round(newarray2A[i].nutrients.sugar)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    productcontainer.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      "gap-5",
    );
    productcontainer.innerHTML = cart;
    productcount.innerHTML = `  Found ${newarray2A.length} products for ${x}`;
  }
}
export function fliternutrigradeBproduct() {
  newarray2B = allcategoryproducts.filter((item) => {
    return item.nutritionGrade == "b";
  });
  console.log(newarray2B);
  if (newarray2B.length == 0) {
    productcount.innerHTML = `  No products found in ${x}`;
    productcontainer.classList.remove(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      "gap-5",
    );
    productcontainer.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No product found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>`;
  } else {
    let cart = "";
    for (let i = 0; i < newarray2B.length; i++) {
      cart += `<div
      onclick="appearmodal2B(${i})"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${newarray2B[i].image ? newarray2B[i].image : "images/Adobe Express - file.png"}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute  ${!newarray2B[i].nutritionGrade || newarray2B[i].nutritionGrade == "unknown" ? "loading" : ""}    top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${newarray2B[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class=" ${!newarray2B[i].novaGroup || newarray2B[i].novaGroup == "unknown" ? "loading" : ""}    absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${newarray2B[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${newarray2B[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${newarray2B[i].name}
                  </h3>

                  <div
                    class="flex items-center  text-xs text-gray-500 mb-3"
                  >
                    
                      <i class="fa-solid fa-fire "></i> ${Math.round(newarray2B[i].nutrients.calories)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Math.round(newarray2B[i].nutrients.protein)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Math.round(newarray2B[i].nutrients.carbs)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Math.round(newarray2B[i].nutrients.fat)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Math.round(newarray2B[i].nutrients.sugar)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    productcontainer.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      "gap-5",
    );
    productcontainer.innerHTML = cart;
    productcount.innerHTML = `  Found ${newarray2B.length} products for ${x}`;
  }
}
export function fliternutrigradeCproduct() {
  newarray2C = allcategoryproducts.filter((item) => {
    return item.nutritionGrade == "c";
  });
  console.log(newarray2C);
  if (newarray2C.length == 0) {
    productcount.innerHTML = `  No products found in ${x}`;
    productcontainer.classList.remove(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      "gap-5",
    );
    productcontainer.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No product found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>`;
  } else {
    let cart = "";
    for (let i = 0; i < newarray2C.length; i++) {
      cart += `<div
       onclick="appearmodal2C(${i})"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${newarray2C[i].image ? newarray2C[i].image : "images/Adobe Express - file.png"}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute  ${!newarray2C[i].nutritionGrade || newarray2C[i].nutritionGrade == "unknown" ? "loading" : ""}    top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${newarray2C[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class=" ${!newarray2C[i].novaGroup || newarray2C[i].novaGroup == "unknown" ? "loading" : ""}    absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${newarray2C[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${newarray2C[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${newarray2C[i].name}
                  </h3>

                  <div
                    class="flex items-center  text-xs text-gray-500 mb-3"
                  >
                    
                      <i class="fa-solid fa-fire "></i> ${Math.round(newarray2C[i].nutrients.calories)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Math.round(newarray2C[i].nutrients.protein)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Math.round(newarray2C[i].nutrients.carbs)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Math.round(newarray2C[i].nutrients.fat)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Math.round(newarray2C[i].nutrients.sugar)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    productcontainer.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      "gap-5",
    );
    productcontainer.innerHTML = cart;
    productcount.innerHTML = `  Found ${newarray2C.length} products for ${x}`;
  }
}
export function fliternutrigradeDproduct() {
  newarray2D = allcategoryproducts.filter((item) => {
    return item.nutritionGrade == "d";
  });
  console.log(newarray2D);
  if (newarray2D.length == 0) {
    productcount.innerHTML = `  No products found in ${x}`;
    productcontainer.classList.remove(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      "gap-5",
    );
    productcontainer.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No product found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>`;
  } else {
    let cart = "";
    for (let i = 0; i < newarray2D.length; i++) {
      cart += `<div
      onclick="appearmodal2D(${i})"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${newarray2D[i].image ? newarray2D[i].image : "images/Adobe Express - file.png"}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute  ${!newarray2D[i].nutritionGrade || newarray2D[i].nutritionGrade == "unknown" ? "loading" : ""}    top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${newarray2D[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class=" ${!newarray2D[i].novaGroup || newarray2D[i].novaGroup == "unknown" ? "loading" : ""}    absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${newarray2D[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${newarray2D[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${newarray2D[i].name}
                  </h3>

                  <div
                    class="flex items-center  text-xs text-gray-500 mb-3"
                  >
                    
                      <i class="fa-solid fa-fire "></i> ${Math.round(newarray2D[i].nutrients.calories)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Math.round(newarray2D[i].nutrients.protein)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Math.round(newarray2D[i].nutrients.carbs)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Math.round(newarray2D[i].nutrients.fat)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Math.round(newarray2D[i].nutrients.sugar)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    productcontainer.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      "gap-5",
    );
    productcontainer.innerHTML = cart;
    productcount.innerHTML = `  Found ${newarray2D.length} products for ${x}`;
  }
}

window.log7 = function (index) {
  let details = {
    image: allcategoryproducts[index].image,
    name: allcategoryproducts[index].name,
    cal: Math.round(allcategoryproducts[index].nutrients.calories) * servValue,
    fat: Math.round(allcategoryproducts[index].nutrients.fat) * servValue,
    protein:
      Math.round(allcategoryproducts[index].nutrients.protein) * servValue,
    carb: Math.round(allcategoryproducts[index].nutrients.carbs) * servValue,
    serv: servValue,
    date: new Date().toISOString(), // 2026-07-06T10:15:32...
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  loggedmeal.push(details);
  localStorage.setItem("container", JSON.stringify(loggedmeal));

  productmodal.classList.add("loading");
  Swal.fire({
    title: "Meal Logged!",
    html: `
    <p class="text-gray-600 mb-2">
      ${allcategoryproducts[index].name} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${Math.round(allcategoryproducts[index].nutrients.calories) * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};

window.appearmodal2 = function (index) {
  productmodal.classList.remove("loading");
  productmodal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${allcategoryproducts[index].image ? allcategoryproducts[index].image : "images/Adobe Express - file.png"}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${allcategoryproducts[index].name}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease7()"
        id="decrease-servings-product-product"
        class="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <i class="fa-solid fa-minus" style="color: rgb(0, 0, 0);"></i>
      </button>
      <input
        type="number"
        id="product-servings"
        value="1"
        min="0.5"
        max="10"
        step="0.5"
        class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-1g py-2"
      />

      <button
      onclick="increase7()"
        id="increase-servings-pr-productoduct"
        class="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
       <i class="fa-solid fa-plus" style="color: rgb(0, 0, 0);"></i>
      </button>
    </div>

    <div class="bg-emerald-50 rounded-xl p-4 mb-6">
      <p class="text-sm text-gray-600 mb-2">
        Estimated nutrition per serving :
      </p>
      <div class="grid grid-cols-4 gap-2 text-center">
        <div>
          <p class="text-1g font-bold text-emerald-600" id="modal-calories">
           ${Math.round(allcategoryproducts[index].nutrients.calories)}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${Math.round(allcategoryproducts[index].nutrients.protein)}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${Math.round(allcategoryproducts[index].nutrients.carbs)}</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${Math.round(allcategoryproducts[index].nutrients.fat)}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal7()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log7(${index})"
      id="confirm-log-meal"
      class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
    >
      <i class="mr-2" data-fa-i2svg></i>

      Log Meal
    </button>
  </div>
</div>`;
  servValue = 1.0;
};

window.log7E = function (index) {
  let details = {
    image: newarray2E[index].image,
    name: newarray2E[index].name,
    cal: Math.round(newarray2E[index].nutrients.calories) * servValue,
    fat: Math.round(newarray2E[index].nutrients.fat) * servValue,
    protein: Math.round(newarray2E[index].nutrients.protein) * servValue,
    carb: Math.round(newarray2E[index].nutrients.carbs) * servValue,
    serv: servValue,
    date: new Date().toISOString(), // 2026-07-06T10:15:32...
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  loggedmeal.push(details);
  localStorage.setItem("container", JSON.stringify(loggedmeal));

  productmodal.classList.add("loading");
  Swal.fire({
    title: "Meal Logged!",
    html: `
    <p class="text-gray-600 mb-2">
      ${newarray2E[index].name} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${Math.round(newarray2E[index].nutrients.calories) * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};

window.appearmodal2E = function (index) {
  productmodal.classList.remove("loading");
  productmodal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${newarray2E[index].image ? newarray2E[index].image : "images/Adobe Express - file.png"}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${newarray2E[index].name}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease7()"
        id="decrease-servings-product"
        class="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <i class="fa-solid fa-minus" style="color: rgb(0, 0, 0);"></i>
      </button>
      <input
        type="number"
        id="product-servings"
        value="1"
        min="0.5"
        max="10"
        step="0.5"
        class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-1g py-2"
      />

      <button
      onclick="increase7()"
        id="increase-servings-product"
        class="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
       <i class="fa-solid fa-plus" style="color: rgb(0, 0, 0);"></i>
      </button>
    </div>

    <div class="bg-emerald-50 rounded-xl p-4 mb-6">
      <p class="text-sm text-gray-600 mb-2">
        Estimated nutrition per serving :
      </p>
      <div class="grid grid-cols-4 gap-2 text-center">
        <div>
          <p class="text-1g font-bold text-emerald-600" id="modal-calories">
           ${Math.round(newarray2E[index].nutrients.calories)}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${Math.round(newarray2E[index].nutrients.protein)}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${Math.round(newarray2E[index].nutrients.carbs)}</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${Math.round(newarray2E[index].nutrients.fat)}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal7()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log7E(${index})"
      id="confirm-log-meal"
      class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
    >
      <i class="mr-2" data-fa-i2svg></i>

      Log Meal
    </button>
  </div>
</div>`;
  servValue = 1.0;
};

window.log7A = function (index) {
  let details = {
    image: newarray2A[index].image,
    name: newarray2A[index].name,
    cal: Math.round(newarray2A[index].nutrients.calories) * servValue,
    fat: Math.round(newarray2A[index].nutrients.fat) * servValue,
    protein: Math.round(newarray2A[index].nutrients.protein) * servValue,
    carb: Math.round(newarray2A[index].nutrients.carbs) * servValue,
    serv: servValue,
    date: new Date().toISOString(), // 2026-07-06T10:15:32...
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  loggedmeal.push(details);
  localStorage.setItem("container", JSON.stringify(loggedmeal));

  productmodal.classList.add("loading");
  Swal.fire({
    title: "Meal Logged!",
    html: `
    <p class="text-gray-600 mb-2">
      ${newarray2A[index].name} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${Math.round(newarray2A[index].nutrients.calories) * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};

window.appearmodal2A = function (index) {
  productmodal.classList.remove("loading");
  productmodal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${newarray2A[index].image ? newarray2A[index].image : "images/Adobe Express - file.png"}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${newarray2A[index].name}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease7()"
        id="decrease-servings-product"
        class="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <i class="fa-solid fa-minus" style="color: rgb(0, 0, 0);"></i>
      </button>
      <input
        type="number"
        id="product-servings"
        value="1"
        min="0.5"
        max="10"
        step="0.5"
        class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-1g py-2"
      />

      <button
      onclick="increase7()"
        id="increase-servings-product"
        class="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
       <i class="fa-solid fa-plus" style="color: rgb(0, 0, 0);"></i>
      </button>
    </div>

    <div class="bg-emerald-50 rounded-xl p-4 mb-6">
      <p class="text-sm text-gray-600 mb-2">
        Estimated nutrition per serving :
      </p>
      <div class="grid grid-cols-4 gap-2 text-center">
        <div>
          <p class="text-1g font-bold text-emerald-600" id="modal-calories">
           ${Math.round(newarray2A[index].nutrients.calories)}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${Math.round(newarray2A[index].nutrients.protein)}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${Math.round(newarray2A[index].nutrients.carbs)}</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${Math.round(newarray2A[index].nutrients.fat)}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal7()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log7A(${index})"
      id="confirm-log-meal"
      class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
    >
      <i class="mr-2" data-fa-i2svg></i>

      Log Meal
    </button>
  </div>
</div>`;
  servValue = 1.0;
};

window.log7B = function (index) {
  let details = {
    image: newarray2B[index].image,
    name: newarray2B[index].name,
    cal: Math.round(newarray2B[index].nutrients.calories) * servValue,
    fat: Math.round(newarray2B[index].nutrients.fat) * servValue,
    protein: Math.round(newarray2B[index].nutrients.protein) * servValue,
    carb: Math.round(newarray2B[index].nutrients.carbs) * servValue,
    serv: servValue,
    date: new Date().toISOString(), // 2026-07-06T10:15:32...
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  loggedmeal.push(details);
  localStorage.setItem("container", JSON.stringify(loggedmeal));

  productmodal.classList.add("loading");
  Swal.fire({
    title: "Meal Logged!",
    html: `
    <p class="text-gray-600 mb-2">
      ${newarray2B[index].name} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${Math.round(newarray2B[index].nutrients.calories) * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};

window.appearmodal2B = function (index) {
  productmodal.classList.remove("loading");
  productmodal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${newarray2B[index].image ? newarray2B[index].image : "images/Adobe Express - file.png"}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${newarray2B[index].name}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease7()"
        id="decrease-servings-product"
        class="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <i class="fa-solid fa-minus" style="color: rgb(0, 0, 0);"></i>
      </button>
      <input
        type="number"
        id="product-servings"
        value="1"
        min="0.5"
        max="10"
        step="0.5"
        class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-1g py-2"
      />

      <button
      onclick="increase7()"
        id="increase-servings-product"
        class="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
       <i class="fa-solid fa-plus" style="color: rgb(0, 0, 0);"></i>
      </button>
    </div>

    <div class="bg-emerald-50 rounded-xl p-4 mb-6">
      <p class="text-sm text-gray-600 mb-2">
        Estimated nutrition per serving :
      </p>
      <div class="grid grid-cols-4 gap-2 text-center">
        <div>
          <p class="text-1g font-bold text-emerald-600" id="modal-calories">
           ${Math.round(newarray2B[index].nutrients.calories)}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${Math.round(newarray2B[index].nutrients.protein)}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${Math.round(newarray2B[index].nutrients.carbs)}</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${Math.round(newarray2B[index].nutrients.fat)}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal7()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log7B(${index})"
      id="confirm-log-meal"
      class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
    >
      <i class="mr-2" data-fa-i2svg></i>

      Log Meal
    </button>
  </div>
</div>`;
  servValue = 1.0;
};

window.log7C = function (index) {
  let details = {
    image: newarray2C[index].image,
    name: newarray2C[index].name,
    cal: Math.round(newarray2C[index].nutrients.calories) * servValue,
    fat: Math.round(newarray2C[index].nutrients.fat) * servValue,
    protein: Math.round(newarray2C[index].nutrients.protein) * servValue,
    carb: Math.round(newarray2C[index].nutrients.carbs) * servValue,
    serv: servValue,
    date: new Date().toISOString(), // 2026-07-06T10:15:32...
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  loggedmeal.push(details);
  localStorage.setItem("container", JSON.stringify(loggedmeal));

  productmodal.classList.add("loading");
  Swal.fire({
    title: "Meal Logged!",
    html: `
    <p class="text-gray-600 mb-2">
      ${newarray2C[index].name} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${Math.round(newarray2C[index].nutrients.calories) * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};

window.appearmodal2C = function (index) {
  productmodal.classList.remove("loading");
  productmodal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${newarray2C[index].image ? newarray2C[index].image : "images/Adobe Express - file.png"}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${newarray2C[index].name}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease7()"
        id="decrease-servings-product"
        class="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <i class="fa-solid fa-minus" style="color: rgb(0, 0, 0);"></i>
      </button>
      <input
        type="number"
        id="product-servings"
        value="1"
        min="0.5"
        max="10"
        step="0.5"
        class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-1g py-2"
      />

      <button
      onclick="increase7()"
        id="increase-servings-product"
        class="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
       <i class="fa-solid fa-plus" style="color: rgb(0, 0, 0);"></i>
      </button>
    </div>

    <div class="bg-emerald-50 rounded-xl p-4 mb-6">
      <p class="text-sm text-gray-600 mb-2">
        Estimated nutrition per serving :
      </p>
      <div class="grid grid-cols-4 gap-2 text-center">
        <div>
          <p class="text-1g font-bold text-emerald-600" id="modal-calories">
           ${Math.round(newarray2C[index].nutrients.calories)}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${Math.round(newarray2C[index].nutrients.protein)}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${Math.round(newarray2C[index].nutrients.carbs)}</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${Math.round(newarray2C[index].nutrients.fat)}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal7()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log7C(${index})"
      id="confirm-log-meal"
      class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
    >
      <i class="mr-2" data-fa-i2svg></i>

      Log Meal
    </button>
  </div>
</div>`;
  servValue = 1.0;
};

window.log7D = function (index) {
  let details = {
    image: newarray2D[index].image,
    name: newarray2D[index].name,
    cal: Math.round(newarray2D[index].nutrients.calories) * servValue,
    fat: Math.round(newarray2D[index].nutrients.fat) * servValue,
    protein: Math.round(newarray2D[index].nutrients.protein) * servValue,
    carb: Math.round(newarray2D[index].nutrients.carbs) * servValue,
    serv: servValue,
    date: new Date().toISOString(), // 2026-07-06T10:15:32...
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  loggedmeal.push(details);
  localStorage.setItem("container", JSON.stringify(loggedmeal));

  productmodal.classList.add("loading");
  Swal.fire({
    title: "Meal Logged!",
    html: `
    <p class="text-gray-600 mb-2">
      ${newarray2D[index].name} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${Math.round(newarray2D[index].nutrients.calories) * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};

window.appearmodal2D = function (index) {
  productmodal.classList.remove("loading");
  productmodal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${newarray2D[index].image ? newarray2D[index].image : "images/Adobe Express - file.png"}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${newarray2D[index].name}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease7()"
        id="decrease-servings-product"
        class="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <i class="fa-solid fa-minus" style="color: rgb(0, 0, 0);"></i>
      </button>
      <input
        type="number"
        id="product-servings"
        value="1"
        min="0.5"
        max="10"
        step="0.5"
        class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-1g py-2"
      />

      <button
      onclick="increase7()"
        id="increase-servings-product"
        class="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
       <i class="fa-solid fa-plus" style="color: rgb(0, 0, 0);"></i>
      </button>
    </div>

    <div class="bg-emerald-50 rounded-xl p-4 mb-6">
      <p class="text-sm text-gray-600 mb-2">
        Estimated nutrition per serving :
      </p>
      <div class="grid grid-cols-4 gap-2 text-center">
        <div>
          <p class="text-1g font-bold text-emerald-600" id="modal-calories">
           ${Math.round(newarray2D[index].nutrients.calories)}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${Math.round(newarray2D[index].nutrients.protein)}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${Math.round(newarray2D[index].nutrients.carbs)}</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${Math.round(newarray2D[index].nutrients.fat)}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal7()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log7D(${index})"
      id="confirm-log-meal"
      class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
    >
      <i class="mr-2" data-fa-i2svg></i>

      Log Meal
    </button>
  </div>
</div>`;
  servValue = 1.0;
};

window.increase7 = function () {
  const increaseBtn = document.getElementById("increase-servings-product");
  const servingsInput = document.getElementById("product-servings");

  let currentValue = parseFloat(servingsInput.value);
  if (currentValue < parseFloat(servingsInput.max)) {
    servingsInput.value = (
      currentValue + parseFloat(servingsInput.step)
    ).toFixed(1);
  }
  servValue = servingsInput.value;
};
window.decrease7 = function () {
  const decreaseBtn = document.getElementById("decrease-servings-product");
  const servingsInput = document.getElementById("product-servings");

  let currentValue = parseFloat(servingsInput.value);
  if (currentValue > parseFloat(servingsInput.min)) {
    servingsInput.value = (
      currentValue - parseFloat(servingsInput.step)
    ).toFixed(1);
  }

  servValue = servingsInput.value;
};

window.closemodal7 = function () {
  productmodal.classList.add("loading");
};
