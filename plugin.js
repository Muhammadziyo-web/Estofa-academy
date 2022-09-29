const $ = function (selector) {
    return document.querySelector(selector);
 }
 
 const $a = function (selector) {
    return document.querySelectorAll(selector);
 }
 
 
 // elements
 
 const createElement = function (tagName, className, content) {
    const newElement = document.createElement(tagName);
 
    if (className) {
       newElement.setAttribute('class',className);
    }
    if (content) {
       newElement.innerHTML = `${content}`;
    }
 
    return newElement;
 
 }