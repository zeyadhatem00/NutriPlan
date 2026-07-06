import { loggedmeal, show } from "../main.js";

const recipes = document.getElementById("recipes-grid");
let count = document.getElementById("recipes-count");
let randomeals;
const searchfilters = document.getElementById("search-filters-section");
const mealcategories = document.getElementById("meal-categories-section");
const mealssection = document.getElementById("all-recipes-section");
export const layer = document.getElementById("meal-details");
const hero = document.getElementById("hero");
const ingred = document.getElementById("ingredient");
const ingredcount = document.getElementById("ingredcount");
const instructions = document.getElementById("Instructions");
const vedio = document.getElementById("Video");
let analysis;
const nutrition = document.getElementById("nutrition");
const logbtn = document.getElementById("log-meal-btn");
const modalcontent = document.getElementById("log-meal-modal");
let servValue = 1.0;
const loadingoverlay = document.getElementById("app-loading-overlay");

//******************************************************************************* */
export async function randomealsapi() {
  try {
    let req = await fetch(
      "https://nutriplan-api.vercel.app/api/meals/random?count=25",
    );
    let response = await req.json();

    randomeals = response.results;
    displayrandom();
  } catch (error) {
    loadingoverlay.classList.add("loading");
    recipes.classList.remove("grid", "grid-cols-4", "gap-5");
    recipes.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">something went wrong</p>
    <p class="text-gray-400 text-sm mt-2">please refresh</p>
</div>`;
  }
}

function displayrandom() {
  let cart = "";
  for (let i = 0; i < randomeals.length; i++) {
    cart += ` 
    
    <div
    
    onclick=" layerappear(${i}) "
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${randomeals[i].id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${randomeals[i].thumbnail}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${randomeals[i].category}
                  </span>
                  <span
                    class=" ${randomeals[i].area == null ? "loading" : ""}  px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                     ${randomeals[i].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                   ${randomeals[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                   ${randomeals[i].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${randomeals[i].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                     ${randomeals[i].area == null ? "international" : randomeals[i].area} 
                  </span>
                </div>
              </div>
            </div>
            `;
  }
  count.innerHTML = ` Showing ${randomeals.length} recipes`;
  recipes.classList.add("grid", "grid-cols-4", "gap-5");
  recipes.innerHTML = cart;
}

window.layerappear = function (index) {
  let cart = "";
  cart = `
        

          <!-- Hero Section -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
              <img
                src="${randomeals[index].thumbnail}"
                
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${randomeals[index].category}</span
                  >
                  <span
                    class="px-3 py-1  ${randomeals[index].area == null ? "loading" : ""}  bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${randomeals[index].area}</span
                  >
                  
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                 ${randomeals[index].name}
                </h1>
                    <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
               
                </div>
              </div>
            </div>
          </div>

`;
  let cart2 = "";
  for (let i = 0; i < randomeals[index].ingredients.length; i++) {
    cart2 += ` <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${randomeals[index].ingredients[i].measure} </span>
                      ${randomeals[index].ingredients[i].ingredient}
                    </span>
                  </div>`;
  }

  let cart3 = "";
  let num = 0;
  for (let i = 0; i < randomeals[index].instructions.length; i++) {
    num += 1;
    cart3 += ` <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      ${num}
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                       ${randomeals[index].instructions[i]}
                    </p>
                  </div>`;
  }

  vedio.innerHTML = `  <iframe
                    src="${randomeals[index].youtube.replace("watch?v=", "embed/")}"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="
                      accelerometer;
                      autoplay;
                      clipboard-write;
                      encrypted-media;
                      gyroscope;
                      picture-in-picture;
                    "
                    allowfullscreen
                  >
                  </iframe>`;

  let cart5 = ` <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  calculating...
                </h2>               
              <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  nutrition.innerHTML = cart5;
  instructions.innerHTML = cart3;
  ingredcount.innerHTML = `${randomeals[index].ingredients.length} items`;
  ingred.innerHTML = cart2;
  hero.innerHTML = cart;
  layer.classList.remove("loading");
  searchfilters.classList.add("loading");
  mealcategories.classList.add("loading");
  mealssection.classList.add("loading");
  anylayze(index);
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;
  servValue = 1.0;
};

async function anylayze(index) {
try {
    const ingredients = randomeals[index].ingredients.map(
    (item) => `${item.measure} ${item.ingredient}`,
  );

  const req = await fetch(
    "https://nutriplan-api.vercel.app/api/nutrition/analyze",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "BJPeZipETV33IdBd4oQO9afh7NKTFzaUSOwvSGuF",
      },
      body: JSON.stringify({
        recipeName: randomeals[index].name,
        ingredients: ingredients,
      }),
    },
  );

  const response = await req.json();
  analysis = response.data;

  let cart4 = ``;
  cart4 = `  <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                  <p class="text-sm text-gray-500 mb-4">Per serving</p>

                  <div
                    class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                  >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">${analysis.perServing.calories}</p>
                    <p class="text-xs text-gray-500 mt-1">Total: ${analysis.totals.calories} cal</p>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">${analysis.perServing.protein}g</span>
                    </div>
                    <div class=" overflow-hidden -hidden  w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width: ${(analysis.perServing.protein / 100) * 100}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">${analysis.perServing.carbs}g</span>
                    </div>
                    <div class="  overflow-hidden -hidden  w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: ${(analysis.perServing.carbs / 100) * 100}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">${analysis.perServing.fat}g</span>
                    </div>
                    <div class=" overflow-hidden  w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: ${(analysis.perServing.fat / 100) * 100}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">${analysis.perServing.fiber}g</span>
                    </div>
                    <div class=" overflow-hidden   w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width: ${(analysis.perServing.fiber / 100) * 100}%"
                      ></div>
                    </div>


                      <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <span class="text-gray-700">saturatedFat</span>
                      </div>
                      <span class="font-bold text-gray-900">${analysis.perServing.saturatedFat}g</span>
                    </div>
                    <div class=" overflow-hidden   w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-red-500 h-2 rounded-full"
                        style="width: ${(analysis.perServing.saturatedFat / 100) * 100}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">${analysis.perServing.sugar}g</span>
                    </div>
                    <div class="overflow-hidden   w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-pink-500 h-2 rounded-full"
                        style="width: ${(analysis.perServing.sugar / 100) * 100}%"
                      ></div>
                    </div>
                  </div>

                  <div class="mt-6 pt-6 border-t border-gray-100">
                    <h3 class="text-sm font-semibold text-gray-900 mb-3">
                     others
                    </h3>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">cholesterol</span>
                        <span class="font-medium">${analysis.perServing.cholesterol}g</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">sodium</span>
                        <span class="font-medium">${analysis.perServing.sodium}g</span>
                      </div>
                      
                    </div>
                  </div>
                </div>`;

  nutrition.innerHTML = cart4;
  logbtn.innerHTML = `<i class="fa-solid fa-clipboard-list"></i>
              <span>Log this meal</span>`;

  modalcontent.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
  <div class="flex items-center gap-4 mb-6">
    <img
      src="${randomeals[index].thumbnail}"
      alt="Ableskiver"
      class="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
      <p class="text-gray-500 text-sm"> ${analysis.recipeName}</p>
    </div>
  </div>
  <div class="mb-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2"
      >Number of Servings</label
    >
    <div class="flex mb-4 items-center gap-3">
      <button
      onclick="decrease()"
        id="decrease-servings"
        class="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <i class="fa-solid fa-minus" style="color: rgb(0, 0, 0);"></i>
      </button>
      <input
        type="number"
        id="meal-servings"
        value="1"
        min="0.5"
        max="10"
        step="0.5"
        class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-1g py-2"
      />

      <button
      onclick="increase()"
        id="increase-servings"
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
            ${analysis.perServing.calories}
          </p>
          <p class="text-xs text-gray-500">Calories</p>
        </div>
        <div>
          <p class="text-1g font-bold text-blue-600" id="modal-protein"> ${analysis.perServing.protein}g</p>

          <p class="text-xs text-gray-500">Protein</p>
        </div>

        <div>
          <p class="text-1g font-bold text-amber-600" id="modal-carbs">${analysis.perServing.carbs}g</p>

          <p class="text-xs text-gray-500">Carbs</p>
        </div>
        <div>
          <p class="text-1g font-bold text-purple-600" id="modal-fat">${analysis.perServing.fat}g</p>

          <p class="text-xs text-gray-500">Fat</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-3">
    <button
    onclick="closemodal()"
      id="cancel-log-meal"
      class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>

    <button
    onclick="log(${index})"
      id="confirm-log-meal"
      class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
    >
      <i class="mr-2" data-fa-i2svg></i>

      Log Meal
    </button>
  </div>
</div>`;
} catch (error) {
     nutrition.innerHTML = ` <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  calculating...
                </h2>               
              <div class="flex flex-col items-center justify-center py-12">
    <p class="text-gray-500 text-lg">something went wrong</p>
    <p class="text-gray-400 text-sm mt-2">please refresh</p>
</div>`;
  logbtn.innerHTML = `<i class="fa-solid fa-clipboard-list"></i>
              <span>something went wrong</span>`;
}
}

window.increase = function () {
  const increaseBtn = document.getElementById("increase-servings");
  const servingsInput = document.getElementById("meal-servings");

  let currentValue = parseFloat(servingsInput.value);
  if (currentValue < parseFloat(servingsInput.max)) {
    servingsInput.value = (
      currentValue + parseFloat(servingsInput.step)
    ).toFixed(1);
  }
  servValue = servingsInput.value;
};
window.decrease = function () {
  const decreaseBtn = document.getElementById("decrease-servings");
  const servingsInput = document.getElementById("meal-servings");

  let currentValue = parseFloat(servingsInput.value);
  if (currentValue > parseFloat(servingsInput.min)) {
    servingsInput.value = (
      currentValue - parseFloat(servingsInput.step)
    ).toFixed(1);
  }

  servValue = servingsInput.value;
};

window.closemodal = function () {
  modalcontent.classList.add("loading");
};

window.log = function (index) {
  let details = {
    image: randomeals[index].thumbnail,
    name: analysis.recipeName,
    cal: analysis.perServing.calories * servValue,
    fat: analysis.perServing.fat * servValue,
    protein: analysis.perServing.protein * servValue,
    carb: analysis.perServing.carbs * servValue,
    serv: servValue,
    date: new Date().toISOString(), // 2026-07-06T10:15:32...
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  loggedmeal.push(details);
  localStorage.setItem("container", JSON.stringify(loggedmeal));

  modalcontent.classList.add("loading");
  Swal.fire({
    title: "Meal Logged!",
    html: `
    <p class="text-gray-600 mb-2">
      ${analysis.recipeName} has been added to your daily log.
    </p>

    <p class="text-green-600 font-bold text-lg">
      +${analysis.perServing.calories * servValue} calories
    </p>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });

  show();
};
