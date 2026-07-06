import {
  all,
  egypt,
  filterapi,
  German,
  Greek,
  Indian,
  Irish,
  Japanese,
  Lebanese,
  Mexican,
  Moroccan,
  SouthKorean,
  Spanish,
  Turkish,
} from "./api/areafilter.js";

import {
  beef,
  Breakfast,
  Chicken,
  Dessert,
  filtercategory,
  Goat,
  Lamb,
  Pasta,
  Pork,
  recipes,
  Seafood,
  Side,
  Starter,
  Vegan,
} from "./api/categoryfilter.js";
import { randomealsapi } from "./api/mealdb.js";
import {
  barcodeinput,
  lookup,
  parcodelookup,
  productcontainer,
} from "./api/parcode.js";
import {
  allcategoryproducts,
  beverages,
  biscuits,
  braekfast,
  breads,
  categoryproducts,
  cheeses,
  chocolates,
  displaycatregoryproduct,
  fliternutrigradeAproduct,
  fliternutrigradeBproduct,
  fliternutrigradeCproduct,
  fliternutrigradeDproduct,
  fliternutrigradeEproduct,
  ice_creams,
  snacks,
  waters,
  x,
  yogurts,
} from "./api/productscategory.js";
import { seacrhapi, searchinput } from "./api/searchapi.js";
import {
  searchbtn,
  searchproinput,
  searchproduct,
  e,
  fliternutrigradeE,
  allproductsSearch,
  fliternutrigradeA,
  fliternutrigradeB,
  fliternutrigradeC,
  fliternutrigradeD,
  a,
  b,
  c,
  d,
  allnutri,
  displayproduct,
} from "./api/searchproduct.js";
import { ui } from "./ui/components.js";
ui();
randomealsapi();
let currentmode = "";
export let loggedmeal = [];
const gridbtn = document.getElementById("grid-view-btn");
const listbtn = document.getElementById("list-view-btn");
const logbtn = document.getElementById("log-meal-btn");
const modalcontent = document.getElementById("log-meal-modal");
const loggedcontainer = document.getElementById("logged-items-list");
const clearall = document.getElementById("clear-foodlog");
const numberlogged = document.getElementById("numberlogged");
const Progressbar = document.getElementById("Progressbar");
const datetoday = document.getElementById("foodlog-date");
const logbtnlast = document.getElementById("lastbtn1");
const weeklyreview = document.getElementById("weekly-chart");
///**************************************************************** */
datetoday.innerHTML = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

if (localStorage.getItem("container") !== null) {
  loggedmeal = JSON.parse(localStorage.getItem("container"));
  show();
}

if (loggedmeal.length == 0) {
  loggedcontainer.innerHTML = ` <div class="text-center py-8 text-gray-500">
                  <i
                    class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"
                  ></i>
                  <p class="font-medium">No meals logged today</p>
                  <p class="text-sm">
                    Add meals from the Meals page or scan products
                  </p>
                </div>`;
}

export function show() {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  let cart = "";
  for (let i = 0; i < loggedmeal.length; i++) {
    cart += `
<div class="flex items-center justify-between bg-gray-50 rounded-x1 p-4 hover:bg-gray-100 transition-all"> 
<div class="flex items-center gap-4">


<img src="${loggedmeal[i].image}" alt="Anzac biscuits" class="w-14 h-14 rounded-xl object-cover">



<div>
<p class="font-semibold text-gray-900">${loggedmeal[i].name}</p>



<p class="text-sm text-gray-500">
" ${loggedmeal[i].serv} serving "



<span class="mx-1"></span>
<span class="text-emerald-600">Recipe</span>
</p>


<p class="text-xs text-gray-400 mt-1">${loggedmeal[i].time}</p>
</div>



</div>
<div class="flex items-center gap-4"> 
<div class="text-right">
<p class="text-1g font-bold text-emerald-600">${loggedmeal[i].cal}</</p>



<p class="text-xs text-gray-500">kcal</p>
</div>



<div class="hidden md:flex gap-2 text-xs text-gray-500"> 
<span class="px-2 py-1 bg-blue-50 rounded">${loggedmeal[i].protein}g P</span>



<span class="px-2 py-1 bg-amber-50 rounded">${loggedmeal[i].carb}g C</span>
<span class="px-2 py-1 bg-purple-50 rounded">${loggedmeal[i].fat}g F</span>
</div>



<button  onclick="deleteitem(${i})" class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="0">
<i class="fa-solid fa-trash"></i>
</button>
</div>



</div>`;

    totalCalories += loggedmeal[i].cal;
    totalProtein += loggedmeal[i].protein;
    totalCarbs += loggedmeal[i].carb;
    totalFat += loggedmeal[i].fat;
  }
  if (loggedmeal.length == 0) {
    cart = ` <div class="text-center py-8 text-gray-500">
                  <i
                    class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"
                  ></i>
                  <p class="font-medium">No meals logged today</p>
                  <p class="text-sm">
                    Add meals from the Meals page or scan products
                  </p>
                </div>`;
  }
  loggedcontainer.innerHTML = cart;
  numberlogged.innerHTML = `Logged Items (${loggedmeal.length})`;
  Progressbar.innerHTML = `
   <!-- Calories Progress -->
              <div class="bg-emerald-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700"
                    >Calories</span
                  >
                  <span class="text-sm text-gray-500">${totalCalories}/ 2000 kcal</span>
                </div>
                <div class="w-full overflow-hidden bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-emerald-500 h-2.5 rounded-full"
                    style="width: ${(totalCalories / 2000) * 100}%"
                  ></div>
                </div>
              </div>
              <!-- Protein Progress -->
              <div class="bg-blue-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700"
                    >Protein</span
                  >
                  <span class="text-sm text-gray-500">${totalProtein} / 50 g</span>
                </div>
                <div class="w-full overflow-hidden bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-blue-500 h-2.5 rounded-full"
                    style="width:${(totalProtein / 50) * 100}%"
                  ></div>
                </div>
              </div>
              <!-- Carbs Progress -->
              <div class="bg-amber-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Carbs</span>
                  <span class="text-sm text-gray-500">${totalCarbs} / 250 g</span>
                </div>
                <div class="w-full overflow-hidden bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-amber-500  h-2.5 rounded-full"
                    style="width: ${(totalCarbs / 250) * 100}%"
                  ></div>
                </div>
              </div>
              <!-- Fat Progress -->
              <div class="bg-purple-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Fat</span>
                  <span class="text-sm text-gray-500">${totalFat} / 65 g</span>
                </div>
                <div class="w-full overflow-hidden bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-purple-500 h-2.5 rounded-full"
                    style="width: ${(totalFat / 65) * 100}%"
                  ></div>
                </div>
              </div>
`;
  weekdaycontent();
}

clearall.addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed)
      Swal.fire({
        title: "Deleted!",
        text: "Your logged meals have been deleted.",
        icon: "success",
      });
    loggedmeal = [];
    localStorage.setItem("container", JSON.stringify(loggedmeal));
    show();
  });
});

window.deleteitem = function (index) {
  loggedmeal.splice(index, 1);
  show();
  localStorage.setItem("container", JSON.stringify(loggedmeal));
};

//********************************************************* */

function weekdaycontent(params) {
  function getLast7Days(loggedmeal) {
    const week = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // آخر 7 أيام (من 6 أيام فاتوا لحد النهارده)
    for (let i = 6; i >= 0; i--) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i);

      week.push({
        fullDate: currentDate.toDateString(),
        day: currentDate.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        date: currentDate.getDate(),
        calories: 0,
        items: 0,
      });
    }

    loggedmeal.forEach((meal) => {
      const mealDate = new Date(meal.date).toDateString();

      const found = week.find((d) => d.fullDate === mealDate);

      if (found) {
        found.calories += Number(meal.cal);
        found.items++;
      }
    });

    return week;
  }

  const week = getLast7Days(loggedmeal);

  let cart = "";
  weeklyreview.classList.add(
    "grid",
    "grid-cols-7",
    "overflow-x-auto",
    "gap-5",
    "md:gap-2",
    "py-5",
  );
  weeklyreview.classList.remove("h-64");

  week.forEach((day) => {
    cart += `
    <div class="text-center flex flex-col items-center justify-center ">
<p class="text-xs text-gray-500 mb-1">${day.day}</p>
<p class="text-sm font-medium text-gray-900">${day.date}</p>



<div class="mt-2 text-emerald-600"> 
<p class="text-lg font-bold">${day.calories}</p>
<p class="text-xs">kcal</p>


</div>
<p class="text-xs text-gray-400 mt-1">${day.items} items</p>
</div>

`;
  });

  weeklyreview.innerHTML = cart;
}

//*********************************************************** */

logbtn.addEventListener("click", () => {
  modalcontent.classList.remove("loading");
});

gridbtn.addEventListener("click", () => {
  recipes.classList.add("grid-cols-4");
  recipes.classList.remove("grid-cols-2");

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");
});

listbtn.addEventListener("click", () => {
  recipes.classList.remove("grid-cols-4");
  recipes.classList.add("grid-cols-2");

  listbtn.classList.add("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
});
//************************************************************************* */

searchinput.addEventListener("input", () => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  let name = document.getElementById("search-input").value;
  seacrhapi(name);
});

//*********************** country filter******************************** */
//********************************************************************* */

all.addEventListener("click", (e) => {
  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;
  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  randomealsapi();

  all.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");
  all.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");

  egypt.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  egypt.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  German.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  German.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Greek.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Greek.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Indian.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Indian.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Irish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Irish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Japanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Japanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Lebanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Lebanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Mexican.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Mexican.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Moroccan.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Moroccan.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  SouthKorean.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  SouthKorean.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Spanish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Spanish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Turkish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Turkish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
});

egypt.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filterapi(e.target.id);

  all.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
  all.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");

  egypt.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  egypt.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");

  German.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  German.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Greek.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Greek.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Indian.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Indian.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Irish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Irish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Japanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Japanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Lebanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Lebanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Mexican.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Mexican.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Moroccan.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Moroccan.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  SouthKorean.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  SouthKorean.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Spanish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Spanish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Turkish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Turkish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
});

German.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filterapi(e.target.id);

  all.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
  all.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");

  egypt.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  egypt.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  German.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  German.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");

  Greek.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Greek.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Indian.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Indian.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Irish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Irish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Japanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Japanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Lebanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Lebanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Mexican.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Mexican.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Moroccan.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Moroccan.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  SouthKorean.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  SouthKorean.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Spanish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Spanish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Turkish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Turkish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
});

Greek.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filterapi(e.target.id);

  all.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
  all.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");

  egypt.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  egypt.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  German.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  German.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Greek.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Greek.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");

  Indian.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Indian.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Irish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Irish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Japanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Japanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Lebanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Lebanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Mexican.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Mexican.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Moroccan.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Moroccan.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  SouthKorean.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  SouthKorean.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Spanish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Spanish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Turkish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Turkish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
});

Indian.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filterapi(e.target.id);

  all.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
  all.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");

  egypt.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  egypt.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  German.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  German.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Greek.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Greek.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Indian.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Indian.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");

  Irish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Irish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Japanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Japanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Lebanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Lebanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Mexican.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Mexican.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Moroccan.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Moroccan.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  SouthKorean.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  SouthKorean.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Spanish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Spanish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Turkish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Turkish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
});

Irish.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filterapi(e.target.id);

  all.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
  all.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");

  egypt.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  egypt.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  German.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  German.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Greek.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Greek.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Indian.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Indian.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Irish.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Irish.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");

  Japanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Japanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Lebanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Lebanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Mexican.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Mexican.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Moroccan.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Moroccan.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  SouthKorean.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  SouthKorean.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Spanish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Spanish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Turkish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Turkish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
});

Japanese.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filterapi(e.target.id);

  all.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
  all.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");

  egypt.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  egypt.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  German.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  German.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Greek.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Greek.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Indian.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Indian.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Irish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Irish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Japanese.classList.remove(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  Japanese.classList.add(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Lebanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Lebanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Mexican.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Mexican.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Moroccan.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Moroccan.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  SouthKorean.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  SouthKorean.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Spanish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Spanish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Turkish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Turkish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
});

Lebanese.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filterapi(e.target.id);

  all.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
  all.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");

  egypt.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  egypt.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  German.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  German.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Greek.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Greek.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Indian.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Indian.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Irish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Irish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Japanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Japanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Lebanese.classList.remove(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  Lebanese.classList.add(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Mexican.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Mexican.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Moroccan.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Moroccan.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  SouthKorean.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  SouthKorean.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Spanish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Spanish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Turkish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Turkish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
});

Mexican.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filterapi(e.target.id);

  all.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
  all.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");

  egypt.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  egypt.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  German.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  German.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Greek.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Greek.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Indian.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Indian.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Irish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Irish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Japanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Japanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Lebanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Lebanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Mexican.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Mexican.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");

  Moroccan.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Moroccan.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  SouthKorean.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  SouthKorean.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Spanish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Spanish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Turkish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Turkish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
});

Moroccan.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filterapi(e.target.id);

  all.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
  all.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");

  egypt.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  egypt.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  German.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  German.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Greek.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Greek.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Indian.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Indian.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Irish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Irish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Japanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Japanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Lebanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Lebanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Mexican.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Mexican.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Moroccan.classList.remove(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  Moroccan.classList.add(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  SouthKorean.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  SouthKorean.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Spanish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Spanish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Turkish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Turkish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
});

SouthKorean.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filterapi(e.target.id);

  all.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
  all.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");

  egypt.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  egypt.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  German.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  German.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Greek.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Greek.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Indian.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Indian.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Irish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Irish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Japanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Japanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Lebanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Lebanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Mexican.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Mexican.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Moroccan.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Moroccan.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  SouthKorean.classList.remove(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  SouthKorean.classList.add(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Spanish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Spanish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Turkish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Turkish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
});

Spanish.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filterapi(e.target.id);

  all.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
  all.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");

  egypt.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  egypt.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  German.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  German.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Greek.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Greek.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Indian.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Indian.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Irish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Irish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Japanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Japanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Lebanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Lebanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Mexican.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Mexican.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Moroccan.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Moroccan.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  SouthKorean.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  SouthKorean.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Spanish.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Spanish.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");

  Turkish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Turkish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );
});

Turkish.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filterapi(e.target.id);

  all.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
  all.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");

  egypt.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  egypt.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  German.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  German.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Greek.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Greek.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Indian.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Indian.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Irish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Irish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Japanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Japanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Lebanese.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Lebanese.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Mexican.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Mexican.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Moroccan.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Moroccan.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  SouthKorean.classList.add(
    "bg-gray-100",
    "text-gray-700",
    "hover:bg-gray-200",
  );
  SouthKorean.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Spanish.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Spanish.classList.remove(
    "bg-emerald-600",
    "text-white",
    "hover:bg-emerald-700",
  );

  Turkish.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  Turkish.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");
});

//***************************category meal filter *************************************** */
//*************************************************************************************** */

beef.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filtercategory(e.currentTarget.id);
});
Chicken.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filtercategory(e.currentTarget.id);
});
Dessert.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filtercategory(e.currentTarget.id);
});
Lamb.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filtercategory(e.currentTarget.id);
});
Starter.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filtercategory(e.currentTarget.id);
});
Pasta.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filtercategory(e.currentTarget.id);
});
Pork.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filtercategory(e.currentTarget.id);
});
Seafood.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filtercategory(e.currentTarget.id);
});
Vegan.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filtercategory(e.currentTarget.id);
});
Breakfast.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filtercategory(e.currentTarget.id);
});
Goat.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filtercategory(e.currentTarget.id);
});
Side.addEventListener("click", (e) => {
  logbtn.innerHTML = ` <i class="fa-solid fa-clipboard-list"></i>
              <span>calculating...</span>`;

  listbtn.classList.remove("rounded-md", "bg-white", "shadow-sm");
  gridbtn.classList.add("rounded-md", "bg-white", "shadow-sm");

  document.getElementById("search-input").value = null;

  recipes.innerHTML = `       <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>`;
  recipes.classList.remove("grid", "grid-cols-4", "gap-5");
  filtercategory(e.currentTarget.id);
});

//********************** product search*************************** */
//*************************************************************** */
searchbtn.addEventListener("click", () => {
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  searchproduct(searchproinput.value);
  currentmode = "search";
});

//**************************** parcode search ****************** */
//************************************************************* */

lookup.addEventListener("click", () => {
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  parcodelookup(barcodeinput.value);
});

//**************************************** product category****************************** */

braekfast.addEventListener("click", (e) => {
  barcodeinput.value = null;

  searchproinput.value = null;
  currentmode = "category";
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  categoryproducts(e.currentTarget.id);
});
beverages.addEventListener("click", (e) => {
  barcodeinput.value = null;
  searchproinput.value = null;
  currentmode = "category";
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  categoryproducts(e.currentTarget.id);
});
snacks.addEventListener("click", (e) => {
  barcodeinput.value = null;
  searchproinput.value = null;
  currentmode = "category";
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  categoryproducts(e.currentTarget.id);
});
cheeses.addEventListener("click", (e) => {
  barcodeinput.value = null;
  searchproinput.value = null;
  currentmode = "category";
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  categoryproducts(e.currentTarget.id);
});
yogurts.addEventListener("click", (e) => {
  barcodeinput.value = null;
  searchproinput.value = null;
  currentmode = "category";
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  categoryproducts(e.currentTarget.id);
});
chocolates.addEventListener("click", (e) => {
  barcodeinput.value = null;
  searchproinput.value = null;
  currentmode = "category";
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  categoryproducts(e.currentTarget.id);
});
ice_creams.addEventListener("click", (e) => {
  barcodeinput.value = null;
  searchproinput.value = null;
  currentmode = "category";
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  categoryproducts(e.currentTarget.id);
});
breads.addEventListener("click", (e) => {
  barcodeinput.value = null;
  searchproinput.value = null;
  currentmode = "category";
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  categoryproducts(e.currentTarget.id);
});
waters.addEventListener("click", (e) => {
  barcodeinput.value = null;
  searchproinput.value = null;
  currentmode = "category";
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  categoryproducts(e.currentTarget.id);
});
biscuits.addEventListener("click", (e) => {
  barcodeinput.value = null;
  searchproinput.value = null;
  currentmode = "category";
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  categoryproducts(e.currentTarget.id);
});

//****************************FILTER BY NUTRI GRADE ***************************//*************** */ */

e.addEventListener("click", () => {
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  if (currentmode == "search") {
    fliternutrigradeE();
  } else if (currentmode == "category") {
    fliternutrigradeEproduct();
  }
  console.log(currentmode);
});

a.addEventListener("click", () => {
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  if (currentmode == "search") {
    fliternutrigradeA();
  } else if (currentmode == "category") {
    fliternutrigradeAproduct();
  }
  console.log(currentmode);
});

b.addEventListener("click", () => {
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  if (currentmode == "search") {
    fliternutrigradeB();
  } else if (currentmode == "category") {
    fliternutrigradeBproduct();
  }
  console.log(currentmode);
});

c.addEventListener("click", () => {
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  if (currentmode == "search") {
    fliternutrigradeC();
  } else if (currentmode == "category") {
    fliternutrigradeCproduct();
  }
  console.log(currentmode);
});

d.addEventListener("click", () => {
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  if (currentmode == "search") {
    fliternutrigradeD();
  } else if (currentmode == "category") {
    fliternutrigradeDproduct();
  }
});
allnutri.addEventListener("click", () => {
  productcontainer.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-5",
  );
  productcontainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  if (currentmode == "search") {
    displayproduct();
  } else if (currentmode == "category") {
    displaycatregoryproduct(x);
  }
});
