const searchMeals = () => {
  const searchText = document.getElementById("search-field").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
  document.getElementById("search-field").value = "";
};

const displayMeals = (meals) => {
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerText = "";
  if (meals == null) {
    mealsContainer.innerHTML = `
    <p class="w-50 text-center mx-auto fs-3 fw-bold"> There is no data to show </p>
    `;
  } else {
    meals.forEach((meal) => {
      // console.log(meal)
      const mealDiv = document.createElement("div");
      mealDiv.classList.add("col");
      mealDiv.innerHTML = `
          <div class="card h-100">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">${
                    meal.strInstructions.slice(0, 100) + "..."
                  }</p>
                  <button onclick="loadMealDetail2(${
                    meal.idMeal
                  })"  type="button" class="btn" data-bs-toggle="modal" data-bs-target="#mealDetails">
                      Details
                  </button>
              </div>
          </div>
          `;
      mealsContainer.appendChild(mealDiv);
    });
  }
};

const loadMealDetail2 = async (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
  } catch (error) {
    console.log(error);
  }
};

const displayMealDetails = (meal) => {
  const mealsDetails = document.getElementById("mealDetailsBody");
  mealsDetails.innerText = "";
  const div = document.createElement("div")
  div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
          <p class="card-text"><small class="text-body-secondary"></small></p>
        </div>
    `;
    mealsDetails.appendChild(div);
};
