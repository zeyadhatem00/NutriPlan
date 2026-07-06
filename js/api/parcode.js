import { loggedmeal, show } from "../main.js";
export const lookup = document.getElementById("lookup-barcode-btn");
export let barcodeinput = document.getElementById("barcode-input");

export const productcontainer = document.getElementById("products-grid");
const productcount = document.getElementById("products-count");
let parcodeproduct;
const productmodal = document.getElementById("log-product-modal");
let servValue = 1.0;

export async function parcodelookup(number) {
  try {
    let req = await fetch(
      `https://nutriplan-api.vercel.app/api/products/barcode/${number}`,
    );
    let response = await req.json();

    parcodeproduct = response.result;

    if (!response.result) {
      productcount.innerHTML = ` NOT FOUND`;
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

function displayproduct() {
  let cart = "";
  cart = `<div
  onclick="appearmodal3()"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${parcodeproduct.image ? parcodeproduct.image : "images/Adobe Express - file.png"}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute  ${!parcodeproduct.nutritionGrade || parcodeproduct.nutritionGrade == "unknown" ? "loading" : ""}    top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${parcodeproduct.nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class=" ${!parcodeproduct.novaGroup || parcodeproduct.novaGroup == "unknown" ? "loading" : ""}    absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${parcodeproduct.novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${parcodeproduct.brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${parcodeproduct.name}
                  </h3>

                  <div
                    class="flex items-center  text-xs text-gray-500 mb-3"
                  >
                    
                      <i class="fa-solid fa-fire "></i> ${Math.round(parcodeproduct.nutrients.calories)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Math.round(parcodeproduct.nutrients.protein)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Math.round(parcodeproduct.nutrients.carbs)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Math.round(parcodeproduct.nutrients.fat)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Math.round(parcodeproduct.nutrients.sugar)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`;

  productcontainer.classList.add(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = cart;
  productcount.innerHTML = `  Found product:   ${parcodeproduct.name}`;
}

window.increase8 = function () {
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
window.decrease8 = function () {
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

window.closemodal8 = function () {
  productmodal.classList.add("loading");
};

window.log8 = function () {
  let details = {
    image: parcodeproduct.image,
    name: parcodeproduct.name,
    cal: Math.round(parcodeproduct.nutrients.calories) * servValue,
    fat: Math.round(parcodeproduct.nutrients.fat) * servValue,
    protein: Math.round(parcodeproduct.nutrients.protein) * servValue,
    carb: Math.round(parcodeproduct.nutrients.carbs) * servValue,
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
      ${parcodeproduct.name} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${Math.round(parcodeproduct.nutrients.calories) * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};

window.appearmodal3 = function () {
  productmodal.classList.remove("loading");
  productmodal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${parcodeproduct.image ? parcodeproduct.image : "images/Adobe Express - file.png"}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${parcodeproduct.name}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease8()"
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
      onclick="increase8()"
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
           ${Math.round(parcodeproduct.nutrients.calories)}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${Math.round(parcodeproduct.nutrients.protein)}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${Math.round(parcodeproduct.nutrients.carbs)}</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${Math.round(parcodeproduct.nutrients.fat)}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal8()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log8()"
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
