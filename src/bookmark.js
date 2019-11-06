import $ from 'jquery';

import store from './store';

//builds template for add item container
const addItemTemplate = function() {
  let store = store.STORE;

  //if store.adding is true this generates the form
  if (store.adding) {
    return `<form class='add-item-form js-add-item-form>
                <label>`
  }

};

//generates the html for each item based on if the item is expanded
const bookmarkTemplate = function(item) {

  //returns the expanded view if expanded is true
  if (item.expanded) {
    return `<li class='bookmark-item' data-item-id='item.id'>
      <div class='expanded-title-container'>
        <h2 class='bookmark-title'>${item.title}</h2>
        <button class='button delete-item js-delete-item'>
          <span>Delete Item</span>
        </button>
      </div>
      <div class='expanded-body'>
        <p class='description'>${item.description}</p>
      </div>
      <div class='rating-url'>
        <a href='${item.url}' target='_blank'>Visit Site</a>
        <p class'bookmark-rating'>${item.rating}/5</p>
      </div>
    </li>`;
  }

  //returns condensed bookmark view
  return `<li class='bookmark-item'>
            <div class='title-container'>
              <h2 class='bookmark-title'>${item.title}</h2>
              <p class='condensed-rating'>${item.rating}/5</p>
            </div>
          </li>`;
};

//makes a string of the bookmark elements
const bookmarkString = function(bookmarkArray) {

  //runs bookmarks through the template function
  const bookmarks = bookmarkArray.map((item) => bookmarkTemplate(item));

  //joins each of the templates together
  return bookmarks.join('');
};