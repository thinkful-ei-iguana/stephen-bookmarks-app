const STORE = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};

//adds bookmarks to the store
const addBookmark = function(item) {
  console.log('add bookmark function');
  return STORE.bookmarks.push(item);
};

//sets the filter value in the store object
const setFilter = function(rating) {
  STORE.filter = rating;
};



export default {
  addBookmark,
  setFilter
};