
"use strict";

/**
 * Imports
 */

import { fetchData } from './api.js';
import { $skeletonCard, cardQueries } from './global.js'
import { getTime } from "./module.js";


/**
 * Accordion
 */

const /** {NodeList} */ $accordions = document.querySelectorAll("[data-accordion]");



/**
 * @param {NodeElement} $element  Accordion node
 */

const initAccordion = function ($element) {

    const /** {NodeElement} */ $button = $element.querySelector("[data-accordion-btn]");

    let isExpanded = false;

    $button.addEventListener("click", function () {
        isExpanded = isExpanded ? false : true;
        this.setAttribute("aria-expanded", isExpanded);
    });
}


for (const $accordion of $accordions) {
    initAccordion($accordion);
}


/**
 * Filter bar toggle for mobile screen
 */

const /** {NodeElement} */ $filterBar = document.querySelector("[data-filter-bar]");

const /** {NodeList} */ $filterTogglers = document.querySelectorAll("[data-filter-toggler]");

const /** {NodeElement} */ $overlay = document.querySelector("[data-overlay]");

addEventOnElements($filterTogglers, "click", function () {
    $filterBar.classList.toggle("active");
    $overlay.classList.toggle("active");
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = bodyOverflow === "hidden" ? "visible" : "hidden";

});