const STORE = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};

//returns the id of a bookmark
const findById = function(id) {
  return STORE.bookmarks.find(item => item.id === id);
};

//adds bookmarks to the store
const addBookmark = function(item) {
  return STORE.bookmarks.push(item);
};

//sets the filter value in the store object
const setFilter = function(rating) {
  STORE.filter = rating;
};

//toggles the adding value of the store object
const toggleAdding = function() {
  STORE.adding = !STORE.adding;
};

export default {
  STORE,
  addBookmark,
  setFilter,
  toggleAdding
};