
"use strict";

/**
 * Import
 */

import { fetchData } from './api.js';
import { getTime } from './module.js'


/** 
 * Render data
 */

const /** {NodeElement} */ $detailContainer = document.querySelector("[data-detail-container]");

ACCESS_POINT += `/${window.location.search.slice(window.location.search.indexOf("=") + 1)}`;


fetchData(null, data => {
    // console.log(data);

    const {
        images: { REGULAR, LARGE, SMALL, THUMBNAIL },
        label: title,
        source: author,
        ingredients = [],
        totalTime: cookingTime = 0,
        calories = 0,
        cuisineType = [],
        dietLabels = [],
        disType = [],
        yield: servings = 0,
        ingredientsLines = [],
        uri
    } = data.recipe;

    document.title = `${title} - Cook.io`;

    const /** {Object} */ banner = LARGE ?? REGULAR ?? SMALL ?? THUMBNAIL;

    const { url: bannerUrl, width, height } = banner;

    const /** {Array} */ tags = [...cuisineType, ...dietLabels, ...disType];

    let /** {String} */ tagElements = "";

    let /** {String} */ ingredientItems = "";


    const /** {String} */ recipeId = uri.slice(uri.lastIndexOf("_") + 1);

    const /** {undefined | String} */ isSaved = window.localStorage.getItem(`cookio-recipe${recipeId}`);

    tags.map(tag => {
        let /** {String} */ type = "";
        if (cuisineType.includes(tag)) {
            type = "cuisineType";
        } else if (dietLabels.includes(tag)) {
            type = "diet";
        } else {
            type = "dishType";
        }

        tagElements += `
        <a href="./recipes.html?${type}=${tag.toLowerCase()}" class="filter-chip label-large">${tag}</a>`;
    });


    ingredients.map(ingredient => {
        ingredientItems += `
            <li class="ingr-item">${ingredient.text}</li>
        `;
    });

    $detailContainer.innerHTML = `
        <figure class="detail-banner img-holder">

            <img src="${bannerUrl}" alt="${title}" width="${width}"
                height="${height}" class="img-cover">

        </figure>

        <div class="detail-content">

            <div class="title-wrapper">

                <h1 class="display-small">${title ?? "Untitled"}</h1>

                <button class="btn btn-secondary has-state has-icon ${isSaved ? "saved" : "removed"}" onclick="saveRecipe(this,'${recipeId}')">

                    <span class="material-symbols-outlined bookmark-add" aria-hidden="true">bookmark_add</span>

                    <span class="material-symbols-outlined bookmark" aria-hidden="true">bookmark</span>

                    <span class="label-large saved-text">Save</span>
                    <span class="label-large unsaved-text">Unsaved</span>
                </button>

            </div>

            <div class="detail-author label-large">
                <span class="span">by</span> ${author}
            </div>

            <div class="detail-stats">
                <div class="stats-item">

                    <span class="display-medium">${ingredients.length}</span>

                    <span class="label-medium">Ingredients</span>

                </div>
                <div class="stats-item">

                    <span class="display-medium">${getTime(cookingTime).split(" ")[0]}</span>

                    <span class="label-medium">${getTime(cookingTime).split(" ")[1]}</span>

                </div>
                <div class="stats-item">

                    <span class="display-medium">${Math.round(calories)}</span>

                    <span class="label-medium">Calories</span>

                </div>
            </div>
            ${tagElements ? `<div class="tag-list">${tagElements}</div>` : ""}
            

            <h2 class="title-medium ingr-title">
                Ingredients
                <span class="label-medium">for ${servings} Servings</span>
            </h2>
            ${ingredientItems ? ` <ul class="body-large ingr-list">${ingredientItems}</ul>` : ""}
           
        </div>

    `;
});