import $ from 'jquery';

import store from './store';

//builds template for add item container
const renderAddItem = function() {
  let store = store.STORE;

  //if store.adding is true this generates the form
  if (store.adding) {
    return `
      <form class='add-item-form js-add-item-form'>      
        <label for='new-bookmark-title'>Add New Bookmark:</label>
        <input type='text' id='new-bookmark-title' name='title' required>
              
        <label for='new-bookmark-url'>URL:</label>
        <input type='url' id='new-bookmark-url' name='url' required>
              
        <label for='new-bookmark-rating'>Rating:</label>
        <select name='set-rating' id='new-bookmark-rating' name='rating' required>
          <option value=''>Set rating</option>
          <option value='5'>5 stars</option>
          <option value='4'>4 stars</option>
          <option value='3'>3 stars</option>
          <option value='2'>2 stars</option>
          <option value='1'>1 star</option>
        </select>
              
        <label for='new-bookmark-description'>Description:</label'>
        <textarea id='new-bookmark-description' name='description' placeholder='Give a brief description' rows='6' cols='34' wrap='hard' required></textarea>
              
        <button type='submit' class='button submit-form js-submit-form><span>Add Bookmark</span></button>
    `;
  }

  //if store.adding is false this renders the add item button
  return `
    <button type="button" class="button add-item-button         js-add-item-button"><span>Add item</span></button>
    `;
};

//generates the html for each item based on if the item is expanded
const bookmarkTemplate = function(item) {

  //returns the expanded view if expanded is true
  if (item.expanded) {
    return `
      <li class='bookmark-item' data-item-id='item.id'>
        <div class='expanded-title-container'>
          <h2 class='bookmark-title'>${item.title}</h2>
          <button class='button delete-item js-delete-item'>
          <span>Delete Item</span></button>
        </div>
        <div class='expanded-body'>
          <p class='description'>${item.description}</p>
        </div>
       <div class='rating-url'>
        <a href='${item.url}' target='_blank'>Visit Site</a>
        <p class'bookmark-rating'>${item.rating}/5</p>
       </div>
      </li>
    `;
  }

  //returns condensed bookmark view
  return `
    <li class='bookmark-item'>
      <div class='title-container'>
        <h2 class='bookmark-title'>${item.title}</h2>
        <p class='condensed-rating'>${item.rating}/5</p>
      </div>
    </li>
  `;
};

//makes a string of the bookmark elements
const bookmarkString = function(bookmarkArray) {

  //runs bookmarks through the template function
  const bookmarks = bookmarkArray.map((item) => bookmarkTemplate(item));

  //joins each of the templates together
  return bookmarks.join('');
};

//creates the error message to be displayed
const createError = function(errorMessage) {
  return `
    <div class='error-content'>
      <p>${errorMessage}</p>
      <button id='cancel-error js-cancel-error'>Clear</button>
    </div>
    `;
};

