import $ from 'jquery';

import store from './store';
import api from './api';

//builds html for add item container
const addItemForm = function() {
  return `
    <form class='add-bookmark-form js-add-bookmark-form'>       
      <div class='form-input'>
        <label for='new-bookmark-title'>Title:</label>
        <input type='text' id='new-bookmark-title' name='title' required>
      </div>
      
      <div class='form-input'>
        <label for='new-bookmark-url'>URL:</label>
        <input type='url' id='new-bookmark-url' name='url' required>
      </div>
      
      <div class='form-input'>
        <label for='new-bookmark-rating'>Rating:</label>
        <select name='rating' id='new-bookmark-rating' name='rating' required>
          <option value=''>Set rating</option>
          <option value='5'>5 stars</option>
          <option value='4'>4 stars</option>
          <option value='3'>3 stars</option>
          <option value='2'>2 stars</option>
          <option value='1'>1 star</option>
        </select>
      </div>
       
      <div class='form-input'>
        <label for='new-bookmark-description' class='desc'>Description:</label'>
        <textarea id='new-bookmark-description' name='desc' placeholder='Give a brief description' rows='6' cols='20' wrap='hard' required></textarea>
      </div>
       
      <div class='form-button'>
        <button class='button submit-form js-submit-form'>
          <span>Add Bookmark</span>
        </button>
      </div>
    </form>
  `;
};

//generates the html for the add item button
const addItemButton = function() {
  return `
    <button type="button" class="button add-bookmark-button js-add-bookmark-button">
      <span>New Bookmark</span>
    </button>
    `;
};

//renders either the form or button to the add item container
const renderAddItem = function() {
  
  //if adding is true in store renders form
  if (store.adding) {
    $('.js-add-bookmark').html(addItemForm());
  } else {
    $('.js-add-bookmark').html(addItemButton());
  }
};

//generates the html for expanded items
const createBookmarkElement = function(item) {
  
  //if item is expanded returns the expanded view
  if (item.expand) {
    return `
        <section class='bookmark-item js-bookmark-item' data-item-id='${item.id}'>
          <button type='button' class='expanded-title-container js-title-container'>
            <span class='bookmark-title'>${item.title}</span>
            <span class'bookmark-rating'>${item.rating}/5 Stars</span>
          </button>
          <div class='expanded-container'>
            <div class='expanded-body'>
              <p class='description'>${item.desc}</p>
            </div>
            <div class='rating-url'>
            <a href='${item.url}' target='_blank'>Visit Site</a>
            </div>
            <button class='button delete-bookmark js-delete-bookmark'>
              <span>Delete</span>
            </button>
          </div>
        </section>
    `;
  }
  
  //else it returns the condensed view
  else {
    return `
      <section class='bookmark-item js-bookmark-item' data-item-id='${item.id}'>
        <button type='button' class='title-container js-title-container'>
          <span class='bookmark-title'>${item.title}</span>
          <span class='bookmark-rating'>${item.rating}/5 Stars</span>
        </button>
    </section>
  `;
  }
};

//makes a string of the bookmark elements
const bookmarkString = function(bookmarkArray) {

  //runs bookmarks through the template function
  const bookmarks = bookmarkArray.map(item => {
  
    //if rating >= filter value creates the element
    if (item.rating >= store.filter) {
      return createBookmarkElement(item);
    }
  });
  
  //joins each of the templates together
  return bookmarks.join('');
};

//returns the error message to be displayed in the DOM
const createError = function(errorMessage) {
  return `
    <div class='error-content'>
      <p>${errorMessage}</p>
      <button class='cancel-error js-cancel-error'>Clear</button>
    </div>
  `;
};

//renders the error message in the DOM
const renderError = function() {

  //if error exists in store renders it in the DOM
  if (store.error) {
    const error = createError(store.error);
    $('.js-error-window').html(error);
  }

  //else it empties the error container in the DOM
  else {
    $('.js-error-window').empty();
  }
};

//renders all necessary data to the DOM
const render = function() {

  //calls the renderError and renderAddItem functions every time the page is rendered
  renderError();
  renderAddItem();

  //sets a variable equal to the bookmarks in the store
  const bookmarks = [...store.bookmarks];
  
  //creates a variable equal to the bookmarks html string
  const newString = bookmarkString(bookmarks);
  
  //inserts the string into the DOM
  $('.js-bookmarks').html(newString);
};

//clears the error from the store after the user closes the error window
const handleClearError = function() {

  $('.js-error-window').on('click', '.js-cancel-error', event => {
    event.preventDefault();
    store.setError(null);
    renderError();
  });
};

//handles user clicking the add bookmark button
const handleAddButton = function() {
  //when the add button is clicked toggles the adding variable then renders the page
  $('.js-add-bookmark').click('.js-add-bookmark-button', () => {
    if (!store.adding) {
      store.toggleAdding();
      render();
    }
  });
};

//uses FormData to create an object that we can use to update the store and api
const serializeJson = function(form) {
  //creates a variable to hols the data from the form
  const formData = new FormData(form);
  //creates an object to put the form data into
  const obj = {
    expand: false
  };
  //for each piece of data in the form creates a key/value pair
  formData.forEach((val, name) => obj[name] = val);
  //returns the object as json
  return JSON.stringify(obj);
};

//handles form submit
const handleBookmarkSubmit = function() {

  //listens for user submitting form
  $('.js-add-bookmark').submit('.js-add-bookmark-form', event => {
    //prevents default
    event.preventDefault();
    //creates a variable to hold the form data
    const formData = event.target;
    //creates a variable to hold the serialized form data
    const serializedFormData = serializeJson(formData);
    //posts the new object to the api then adds the item to the store
    
    store.toggleAdding();
    
    api.createBookmark(serializedFormData)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

//gets the id of the bookmark
const getBookmarkId = function(bookmark) {
  return $(bookmark).closest('section').attr('data-item-id');
};

//handles switching between expanded and condensed views
const handleExpandedView = function() {
  //listens for user clicking the item title
  $('.js-bookmarks').on('click', '.js-title-container', (event) => {
    const id = getBookmarkId(event.currentTarget);
    store.toggleExpanded(id);
    render();
  });
};

//handles the user deleting a bookmark
const handleDeleteBookmark = function() {
  //listens for the user clicking the delete button
  $('.js-bookmarks').on('click', '.js-delete-bookmark', event => {
    const id = getBookmarkId(event.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store.deleteBookmark(id);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

const handleFilter = function() {
  $('.js-filter').change(event => {
    let ratingFilter = $(event.currentTarget).val();
    store.filter = ratingFilter;
    render();
  });
};

//binds all of the event handlers together to export them to index.js
const bindEventHandlers = function() {
  handleClearError();
  handleAddButton();
  handleBookmarkSubmit();
  handleExpandedView();
  handleDeleteBookmark();
  handleFilter();
};

export default {
  render,
  bindEventHandlers
};