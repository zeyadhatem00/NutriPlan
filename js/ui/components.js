import { layer } from "../api/mealdb.js";
const mealsbtn = document.getElementById("Meals&Recipes");
const searchfilters = document.getElementById("search-filters-section");
const mealcategories = document.getElementById("meal-categories-section");
const mealssection = document.getElementById("all-recipes-section");
const scannerbtn = document.getElementById("ProductScanner");
const scannersection = document.getElementById("products-section");
const foodlogbtn = document.getElementById("FoodLog");
const foodlogsection = document.getElementById("foodlog-section");
const menubtn = document.getElementById("header-menu-btn");
const sidebaroverlay = document.getElementById("sidebar-overlay");
const sidebar = document.getElementById("sidebar");
const body = document.querySelector("body");
const closebtn = document.getElementById("sidebar-close-btn");
const loadingoverlay = document.getElementById("app-loading-overlay");
const main = document.getElementById("main-content");
const back = document.getElementById("back-to-meals-btn");
const logbtnlast = document.getElementById("lastbtn1");
const scanbtnlast = document.getElementById("lastbtn2");
export function ui() {
  mealsbtn.addEventListener("click", () => {
    window.location.hash = "Meals";

    showmeal();
  });
  logbtnlast.addEventListener("click", () => {
    mealsbtn.classList.add("bg-emerald-50", "text-emerald-700");
    mealsbtn.classList.remove("text-gray-600", "hover:bg-gray-50");

    foodlogbtn.classList.remove("bg-emerald-50", "text-emerald-700");
    foodlogbtn.classList.add("text-gray-600", "hover:bg-gray-50");

    scannerbtn.classList.remove("bg-emerald-50", "text-emerald-700");
    scannerbtn.classList.add("text-gray-600", "hover:bg-gray-50");

    searchfilters.classList.remove("loading");
    mealcategories.classList.remove("loading");
    mealssection.classList.remove("loading");

    scannersection.classList.add("loading");
    foodlogsection.classList.add("loading");
    layer.classList.add("loading");

    sidebaroverlay.classList.remove("active");
    sidebar.classList.remove("open");
    body.style.cssText = "";
  });

  back.addEventListener("click", () => {
    mealsbtn.classList.add("bg-emerald-50", "text-emerald-700");
    mealsbtn.classList.remove("text-gray-600", "hover:bg-gray-50");

    foodlogbtn.classList.remove("bg-emerald-50", "text-emerald-700");
    foodlogbtn.classList.add("text-gray-600", "hover:bg-gray-50");

    scannerbtn.classList.remove("bg-emerald-50", "text-emerald-700");
    scannerbtn.classList.add("text-gray-600", "hover:bg-gray-50");

    searchfilters.classList.remove("loading");
    mealcategories.classList.remove("loading");
    mealssection.classList.remove("loading");

    scannersection.classList.add("loading");
    foodlogsection.classList.add("loading");
    layer.classList.add("loading");

    sidebaroverlay.classList.remove("active");
    sidebar.classList.remove("open");
    body.style.cssText = "";
  });

  scannerbtn.addEventListener("click", () => {
    window.location.hash = "Products";
    showproduct();
  });
  scanbtnlast.addEventListener("click", () => {
    scannerbtn.classList.add("bg-emerald-50", "text-emerald-700");
    scannerbtn.classList.remove("text-gray-600", "hover:bg-gray-50");

    foodlogbtn.classList.remove("bg-emerald-50", "text-emerald-700");
    foodlogbtn.classList.add("text-gray-600", "hover:bg-gray-50");

    mealsbtn.classList.remove("bg-emerald-50", "text-emerald-700");
    mealsbtn.classList.add("text-gray-600", "hover:bg-gray-50");

    searchfilters.classList.add("loading");
    mealcategories.classList.add("loading");
    mealssection.classList.add("loading");
    layer.classList.add("loading");

    scannersection.classList.remove("loading");
    foodlogsection.classList.add("loading");

    sidebaroverlay.classList.remove("active");
    sidebar.classList.remove("open");
    body.style.cssText = "";
  });

  foodlogbtn.addEventListener("click", () => {
    window.location.hash = "Food-Log";
    showlog();
  });

  menubtn.addEventListener("click", () => {
    sidebaroverlay.classList.add("active");
    sidebar.classList.add("open");
    body.style.cssText = "overflow : hidden";
  });

  closebtn.addEventListener("click", () => {
    sidebaroverlay.classList.remove("active");
    sidebar.classList.remove("open");
    body.style.cssText = "";
  });

  sidebaroverlay.addEventListener("click", () => {
    sidebaroverlay.classList.remove("active");
    sidebar.classList.remove("open");
    body.style.cssText = "";
  });

  setTimeout(() => {
    loadingoverlay.classList.add("loading");
    sidebar.classList.remove("loading");
    sidebaroverlay.classList.remove("loading");
    main.classList.remove("loading");
  }, 1500);
}
export function showmeal(params) {
  mealsbtn.classList.add("bg-emerald-50", "text-emerald-700");
  mealsbtn.classList.remove("text-gray-600", "hover:bg-gray-50");

  foodlogbtn.classList.remove("bg-emerald-50", "text-emerald-700");
  foodlogbtn.classList.add("text-gray-600", "hover:bg-gray-50");

  scannerbtn.classList.remove("bg-emerald-50", "text-emerald-700");
  scannerbtn.classList.add("text-gray-600", "hover:bg-gray-50");

  searchfilters.classList.remove("loading");
  mealcategories.classList.remove("loading");
  mealssection.classList.remove("loading");

  scannersection.classList.add("loading");
  foodlogsection.classList.add("loading");
  layer.classList.add("loading");

  sidebaroverlay.classList.remove("active");
  sidebar.classList.remove("open");
  body.style.cssText = "";
}

export function showproduct(params) {
  scannerbtn.classList.add("bg-emerald-50", "text-emerald-700");
  scannerbtn.classList.remove("text-gray-600", "hover:bg-gray-50");

  foodlogbtn.classList.remove("bg-emerald-50", "text-emerald-700");
  foodlogbtn.classList.add("text-gray-600", "hover:bg-gray-50");

  mealsbtn.classList.remove("bg-emerald-50", "text-emerald-700");
  mealsbtn.classList.add("text-gray-600", "hover:bg-gray-50");

  searchfilters.classList.add("loading");
  mealcategories.classList.add("loading");
  mealssection.classList.add("loading");
  layer.classList.add("loading");

  scannersection.classList.remove("loading");
  foodlogsection.classList.add("loading");

  sidebaroverlay.classList.remove("active");
  sidebar.classList.remove("open");
  body.style.cssText = "";
}

export function showlog(params) {
  foodlogbtn.classList.add("bg-emerald-50", "text-emerald-700");
  foodlogbtn.classList.remove("text-gray-600", "hover:bg-gray-50");

  mealsbtn.classList.remove("bg-emerald-50", "text-emerald-700");
  mealsbtn.classList.add("text-gray-600", "hover:bg-gray-50");

  scannerbtn.classList.remove("bg-emerald-50", "text-emerald-700");
  scannerbtn.classList.add("text-gray-600", "hover:bg-gray-50");

  searchfilters.classList.add("loading");
  mealcategories.classList.add("loading");
  mealssection.classList.add("loading");
  layer.classList.add("loading");

  scannersection.classList.add("loading");
  foodlogsection.classList.remove("loading");

  sidebaroverlay.classList.remove("active");
  sidebar.classList.remove("open");
  body.style.cssText = "";
}
