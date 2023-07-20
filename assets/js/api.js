
"use strict";

window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";
const /** {String} */ APP_ID = "fa8281bc";
const  /** {String} */ API_KEY = "accd068cfb0fd1aa6616324c37d10774";
const /**{String} */ TYPE = "public";



/**
 * @param {Array} queries  Query Array
 * @param {Function} successCallback  success callback function
 */

export const fetchData = async function (queries, successCallback) {
    const /** {String} */ query = queries?.join("&")
        .replace(/,/g, "=")
        .replace(/ /g, "%20")
        .replace(/\+/g, "%2B");

    // console.log(queries, query);
    const /** {String} */ url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${query ? `&${query}` : ""}`;


    const /** {Object} */ response = await fetch(url);


    if (response.ok) {
        const data = await response.json();
        successCallback(data);
    }

}