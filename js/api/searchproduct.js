import { loggedmeal, show } from "../main.js";
export const searchbtn = document.getElementById("search-product-btn");
export let searchproinput = document.getElementById("product-search-input");
export const e = document.getElementById("e");
export const a = document.getElementById("a");
export const b = document.getElementById("b");
export const c = document.getElementById("c");
export const d = document.getElementById("d");
export const allnutri = document.getElementById("allnutri");
const productmodal = document.getElementById("log-product-modal");
let servValue = 1.0;
const productcontainer = document.getElementById("products-grid");
const productcount = document.getElementById("products-count");
export let allproductsSearch;
let newarrayE;
let newarrayA;
let newarrayB;
let newarrayC;
let newarrayD;

export async function searchproduct(term) {
  try {
    let req = await fetch(
      `https://nutriplan-api.vercel.app/api/products/search?q=${term}&page=1&limit=24`,
    );
    let response = await req.json();
    allproductsSearch = response.results;

    if (allproductsSearch.length == 0) {
      productcount.innerHTML = `  Found ${allproductsSearch.length} products for "${searchproinput.value}"`;
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
      displayproduct();
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

export function displayproduct() {
  let cart = "";
  for (let i = 0; i < allproductsSearch.length; i++) {
    cart += `<div
    onclick="appearmodal(${i})"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${allproductsSearch[i].image ? allproductsSearch[i].image : "images/Adobe Express - file.png"}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute  ${!allproductsSearch[i].nutritionGrade || allproductsSearch[i].nutritionGrade == "unknown" ? "loading" : ""}    top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${allproductsSearch[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class=" ${!allproductsSearch[i].novaGroup || allproductsSearch[i].novaGroup == "unknown" ? "loading" : ""}    absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${allproductsSearch[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${allproductsSearch[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${allproductsSearch[i].name}
                  </h3>

                  <div
                    class="flex items-center  text-xs text-gray-500 mb-3"
                  >
                    
                      <i class="fa-solid fa-fire "></i> ${Math.round(allproductsSearch[i].nutrients.calories)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Math.round(allproductsSearch[i].nutrients.protein)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Math.round(allproductsSearch[i].nutrients.carbs)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Math.round(allproductsSearch[i].nutrients.fat)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Math.round(allproductsSearch[i].nutrients.sugar)}g</p>
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
  productcount.innerHTML = `  Found ${allproductsSearch.length} products for "${searchproinput.value}"`;
}

export function fliternutrigradeE() {
  newarrayE = allproductsSearch.filter((item) => {
    return item.nutritionGrade == "e";
  });
  console.log(newarrayE);

  if (newarrayE.length == 0) {
    productcount.innerHTML = `  No products found in ${searchproinput.value}`;
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
    for (let i = 0; i < newarrayE.length; i++) {
      cart += `<div
        onclick="appearmodalE(${i})"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${newarrayE[i].image ? newarrayE[i].image : "images/Adobe Express - file.png"}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute  ${!newarrayE[i].nutritionGrade || newarrayE[i].nutritionGrade == "unknown" ? "loading" : ""}    top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${newarrayE[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class=" ${!newarrayE[i].novaGroup || newarrayE[i].novaGroup == "unknown" ? "loading" : ""}    absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${newarrayE[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${newarrayE[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${newarrayE[i].name}
                  </h3>

                  <div
                    class="flex items-center  text-xs text-gray-500 mb-3"
                  >
                    
                      <i class="fa-solid fa-fire "></i> ${Math.round(newarrayE[i].nutrients.calories)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Math.round(newarrayE[i].nutrients.protein)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Math.round(newarrayE[i].nutrients.carbs)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Math.round(newarrayE[i].nutrients.fat)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Math.round(newarrayE[i].nutrients.sugar)}g</p>
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
    productcount.innerHTML = `  Found ${newarrayE.length} products for "${searchproinput.value}"`;
  }
}

export function fliternutrigradeA() {
  newarrayA = allproductsSearch.filter((item) => {
    return item.nutritionGrade == "a";
  });
  console.log(newarrayA);

  if (newarrayA.length == 0) {
    productcount.innerHTML = `  No products found in ${searchproinput.value}`;
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
    for (let i = 0; i < newarrayA.length; i++) {
      cart += `<div
       onclick="appearmodalA(${i})"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${newarrayA[i].image ? newarrayA[i].image : "images/Adobe Express - file.png"}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute  ${!newarrayA[i].nutritionGrade || newarrayA[i].nutritionGrade == "unknown" ? "loading" : ""}    top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${newarrayA[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class=" ${!newarrayA[i].novaGroup || newarrayA[i].novaGroup == "unknown" ? "loading" : ""}    absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${newarrayA[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${newarrayA[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${newarrayA[i].name}
                  </h3>

                  <div
                    class="flex items-center  text-xs text-gray-500 mb-3"
                  >
                    
                      <i class="fa-solid fa-fire "></i> ${Math.round(newarrayA[i].nutrients.calories)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Math.round(newarrayA[i].nutrients.protein)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Math.round(newarrayA[i].nutrients.carbs)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Math.round(newarrayA[i].nutrients.fat)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Math.round(newarrayA[i].nutrients.sugar)}g</p>
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
    productcount.innerHTML = `  Found ${newarrayA.length} products for "${searchproinput.value}"`;
  }
}
export function fliternutrigradeB() {
  newarrayB = allproductsSearch.filter((item) => {
    return item.nutritionGrade == "b";
  });
  console.log(newarrayB);

  if (newarrayB.length == 0) {
    productcount.innerHTML = `  No products found in ${searchproinput.value}`;
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
    for (let i = 0; i < newarrayB.length; i++) {
      cart += `<div
       onclick="appearmodalB(${i})"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${newarrayB[i].image ? newarrayB[i].image : "images/Adobe Express - file.png"}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute  ${!newarrayB[i].nutritionGrade || newarrayB[i].nutritionGrade == "unknown" ? "loading" : ""}    top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${newarrayB[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class=" ${!newarrayB[i].novaGroup || newarrayB[i].novaGroup == "unknown" ? "loading" : ""}    absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${newarrayB[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${newarrayB[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${newarrayB[i].name}
                  </h3>

                  <div
                    class="flex items-center  text-xs text-gray-500 mb-3"
                  >
                    
                      <i class="fa-solid fa-fire "></i> ${Math.round(newarrayB[i].nutrients.calories)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Math.round(newarrayB[i].nutrients.protein)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Math.round(newarrayB[i].nutrients.carbs)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Math.round(newarrayB[i].nutrients.fat)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Math.round(newarrayB[i].nutrients.sugar)}g</p>
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
    productcount.innerHTML = `  Found ${newarrayB.length} products for "${searchproinput.value}"`;
  }
}
export function fliternutrigradeC() {
  newarrayC = allproductsSearch.filter((item) => {
    return item.nutritionGrade == "c";
  });
  console.log(newarrayC);

  if (newarrayC.length == 0) {
    productcount.innerHTML = `  No products found in ${searchproinput.value}`;
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
    for (let i = 0; i < newarrayC.length; i++) {
      cart += `<div
       onclick="appearmodalC(${i})"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${newarrayC[i].image ? newarrayC[i].image : "images/Adobe Express - file.png"}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute  ${!newarrayC[i].nutritionGrade || newarrayC[i].nutritionGrade == "unknown" ? "loading" : ""}    top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${newarrayC[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class=" ${!newarrayC[i].novaGroup || newarrayC[i].novaGroup == "unknown" ? "loading" : ""}    absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${newarrayC[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${newarrayC[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${newarrayC[i].name}
                  </h3>

                  <div
                    class="flex items-center  text-xs text-gray-500 mb-3"
                  >
                    
                      <i class="fa-solid fa-fire "></i> ${Math.round(newarrayC[i].nutrients.calories)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Math.round(newarrayC[i].nutrients.protein)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Math.round(newarrayC[i].nutrients.carbs)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Math.round(newarrayC[i].nutrients.fat)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Math.round(newarrayC[i].nutrients.sugar)}g</p>
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
    productcount.innerHTML = `  Found ${newarrayC.length} products for "${searchproinput.value}"`;
  }
}
export function fliternutrigradeD() {
  newarrayD = allproductsSearch.filter((item) => {
    return item.nutritionGrade == "d";
  });
  console.log(newarrayD);

  if (newarrayD.length == 0) {
    productcount.innerHTML = `  No products found in ${searchproinput.value}`;
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
    for (let i = 0; i < newarrayD.length; i++) {
      cart += `<div
       onclick="appearmodalD(${i})"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${newarrayD[i].image ? newarrayD[i].image : "images/Adobe Express - file.png"}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute  ${!newarrayD[i].nutritionGrade || newarrayD[i].nutritionGrade == "unknown" ? "loading" : ""}    top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${newarrayD[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class=" ${!newarrayD[i].novaGroup || newarrayD[i].novaGroup == "unknown" ? "loading" : ""}    absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${newarrayD[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${newarrayD[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${newarrayD[i].name}
                  </h3>

                  <div
                    class="flex items-center  text-xs text-gray-500 mb-3"
                  >
                    
                      <i class="fa-solid fa-fire "></i> ${Math.round(newarrayD[i].nutrients.calories)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Math.round(newarrayD[i].nutrients.protein)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Math.round(newarrayD[i].nutrients.carbs)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Math.round(newarrayD[i].nutrients.fat)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Math.round(newarrayD[i].nutrients.sugar)}g</p>
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
    productcount.innerHTML = `  Found ${newarrayD.length} products for "${searchproinput.value}"`;
  }
}

window.increase6 = function () {
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
window.decrease6 = function () {
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

window.closemodal6 = function () {
  productmodal.classList.add("loading");
};

window.log6 = function (index) {
  let details = {
    image: allproductsSearch[index].image,
    name: allproductsSearch[index].name,
    cal: Math.round(allproductsSearch[index].nutrients.calories) * servValue,
    fat: Math.round(allproductsSearch[index].nutrients.fat) * servValue,
    protein: Math.round(allproductsSearch[index].nutrients.protein) * servValue,
    carb: Math.round(allproductsSearch[index].nutrients.carbs) * servValue,
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
      ${allproductsSearch[index].name} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${Math.round(allproductsSearch[index].nutrients.calories) * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};

window.appearmodal = function (index) {
  productmodal.classList.remove("loading");
  productmodal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${allproductsSearch[index].image ? allproductsSearch[index].image : "images/Adobe Express - file.png"}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${allproductsSearch[index].name}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease6()"
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
      onclick="increase6()"
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
           ${Math.round(allproductsSearch[index].nutrients.calories)}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${Math.round(allproductsSearch[index].nutrients.protein)}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${Math.round(allproductsSearch[index].nutrients.carbs)}</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${Math.round(allproductsSearch[index].nutrients.fat)}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal6()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log6(${index})"
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

window.log6E = function (index) {
  let details = {
    image: newarrayE[index].image,
    name: newarrayE[index].name,
    cal: Math.round(newarrayE[index].nutrients.calories) * servValue,
    fat: Math.round(newarrayE[index].nutrients.fat) * servValue,
    protein: Math.round(newarrayE[index].nutrients.protein) * servValue,
    carb: Math.round(newarrayE[index].nutrients.carbs) * servValue,
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
      ${newarrayE[index].name} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${Math.round(newarrayE[index].nutrients.calories) * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};

window.appearmodalE = function (index) {
  productmodal.classList.remove("loading");
  productmodal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${newarrayE[index].image ? newarrayE[index].image : "images/Adobe Express - file.png"}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${newarrayE[index].name}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease6()"
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
      onclick="increase6()"
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
           ${Math.round(newarrayE[index].nutrients.calories)}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${Math.round(newarrayE[index].nutrients.protein)}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${Math.round(newarrayE[index].nutrients.carbs)}</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${Math.round(newarrayE[index].nutrients.fat)}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal6()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log6E(${index})"
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
window.log6A = function (index) {
  let details = {
    image: newarrayA[index].image,
    name: newarrayA[index].name,
    cal: Math.round(newarrayA[index].nutrients.calories) * servValue,
    fat: Math.round(newarrayA[index].nutrients.fat) * servValue,
    protein: Math.round(newarrayA[index].nutrients.protein) * servValue,
    carb: Math.round(newarrayA[index].nutrients.carbs) * servValue,
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
      ${newarrayA[index].name} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${Math.round(newarrayA[index].nutrients.calories) * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};

window.appearmodalA = function (index) {
  productmodal.classList.remove("loading");
  productmodal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${newarrayA[index].image ? newarrayA[index].image : "images/Adobe Express - file.png"}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${newarrayA[index].name}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease6()"
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
      onclick="increase6()"
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
           ${Math.round(newarrayA[index].nutrients.calories)}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${Math.round(newarrayA[index].nutrients.protein)}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${Math.round(newarrayA[index].nutrients.carbs)}</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${Math.round(newarrayA[index].nutrients.fat)}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal6()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log6A(${index})"
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

window.log6B = function (index) {
  let details = {
    image: newarrayB[index].image,
    name: newarrayB[index].name,
    cal: Math.round(newarrayB[index].nutrients.calories) * servValue,
    fat: Math.round(newarrayB[index].nutrients.fat) * servValue,
    protein: Math.round(newarrayB[index].nutrients.protein) * servValue,
    carb: Math.round(newarrayB[index].nutrients.carbs) * servValue,
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
      ${newarrayB[index].name} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${Math.round(newarrayB[index].nutrients.calories) * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};

window.appearmodalB = function (index) {
  productmodal.classList.remove("loading");
  productmodal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${newarrayB[index].image ? newarrayB[index].image : "images/Adobe Express - file.png"}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${newarrayB[index].name}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease6()"
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
      onclick="increase6()"
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
           ${Math.round(newarrayB[index].nutrients.calories)}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${Math.round(newarrayB[index].nutrients.protein)}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${Math.round(newarrayB[index].nutrients.carbs)}</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${Math.round(newarrayB[index].nutrients.fat)}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal6()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log6B(${index})"
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

window.log6C = function (index) {
  let details = {
    image: newarrayC[index].image,
    name: newarrayC[index].name,
    cal: Math.round(newarrayC[index].nutrients.calories) * servValue,
    fat: Math.round(newarrayC[index].nutrients.fat) * servValue,
    protein: Math.round(newarrayC[index].nutrients.protein) * servValue,
    carb: Math.round(newarrayC[index].nutrients.carbs) * servValue,
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
      ${newarrayC[index].name} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${Math.round(newarrayC[index].nutrients.calories) * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};

window.appearmodalC = function (index) {
  productmodal.classList.remove("loading");
  productmodal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${newarrayC[index].image ? newarrayC[index].image : "images/Adobe Express - file.png"}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${newarrayC[index].name}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease6()"
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
      onclick="increase6()"
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
           ${Math.round(newarrayC[index].nutrients.calories)}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${Math.round(newarrayC[index].nutrients.protein)}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${Math.round(newarrayC[index].nutrients.carbs)}</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${Math.round(newarrayC[index].nutrients.fat)}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal6()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log6C(${index})"
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

window.log6D = function (index) {
  let details = {
    image: newarrayD[index].image,
    name: newarrayD[index].name,
    cal: Math.round(newarrayD[index].nutrients.calories) * servValue,
    fat: Math.round(newarrayD[index].nutrients.fat) * servValue,
    protein: Math.round(newarrayD[index].nutrients.protein) * servValue,
    carb: Math.round(newarrayD[index].nutrients.carbs) * servValue,
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
      ${newarrayD[index].name} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${Math.round(newarrayD[index].nutrients.calories) * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};

window.appearmodalD = function (index) {
  productmodal.classList.remove("loading");
  productmodal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${newarrayD[index].image ? newarrayD[index].image : "images/Adobe Express - file.png"}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${newarrayD[index].name}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease6()"
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
      onclick="increase6()"
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
           ${Math.round(newarrayD[index].nutrients.calories)}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${Math.round(newarrayD[index].nutrients.protein)}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${Math.round(newarrayD[index].nutrients.carbs)}</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${Math.round(newarrayD[index].nutrients.fat)}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal6()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log6D(${index})"
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
