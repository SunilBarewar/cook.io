
"use strict";


/**
 * Add event on multiple elements
 * @param {NodeList} $elements  nodeList
 * @param {String} eventType Event type string
 * @param {Function} callback  callback function
 */

window.addEventOnElements = ($elements, eventType, callback) => {
    for (const $element of $elements) {
        $element.addEventListener(eventType, callback);
    }
}