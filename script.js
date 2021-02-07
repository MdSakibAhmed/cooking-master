// Display img and  ingredients
const displayIngredients = meal =>{

    const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    const ingridients = array.filter(number => {
      
      return meal[`strIngredient${number}`] !== "" && meal[`strIngredient${number}`]!== null;  

    })

    // Hide previous HTML on new click
  const mainDiv =   document.getElementById("ingridients");
   mainDiv.style.display = "block";
   mainDiv.style.background="white";
  mainDiv.innerHTML ="";
 

   
// Display meal img and name
  const html =`<img src="${meal[`strMealThumb`]}" alt="">
  <h1>${meal[`strMeal`]}</h1>
  <h3>Ingredients</h3>
  <ul></ul>`
 mainDiv.innerHTML = html;


// Display ingredients on the UI
  ingridients.forEach(number =>{
      const ulElement = document.querySelector("#ingridients ul");
  const li = document.createElement("li");

  li.innerText = `${meal[`strMeasure${number}`]} ${meal[`strIngredient${number}`]}`

  ulElement.appendChild(li);

  })
    console.log(ingridients);
}


// Get Ingredients of selected id from remote resource
const getIngridiens = (id) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url).then(response => response.json()).then(data => {
        const [meal] = data.meals;
        console.log(meal);
        displayIngredients(meal)
    }) 
}


// Display the all Meals on the UI 
const displayMeal = data =>{
    document.getElementById("no-meal-found").style.display ="none";
   document.getElementById("ingridients").innerHTML ="";
   document.getElementById("ingridients").style.background ="transparent"
const mealContainer = document.getElementById("allMeal");
mealContainer.innerHTML ="";

// Clear input field
document.getElementById("search-field").value ="";

    data.meals.forEach(meal => {
        const html = `<div onclick="(getIngridiens('${meal.idMeal}'))" class="meal">
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        </div>`

        mealContainer.insertAdjacentHTML("beforeend",html)

    });
}


// Get Meal Data from remote resource based on search in input field
 document.getElementById("search-button").addEventListener("click",function(){
    const searchValue = document.getElementById("search-field").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`).then(response => response.json()).then(data => {
        console.log(data);
        displayMeal(data);
        
    }).catch(error =>{
        console.log(error);
        document.getElementById("no-meal-found").style.display ="block";
    })
 })