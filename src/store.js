let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

//returns the id of a bookmark
const findById = function(id) {
  return this.bookmarks.find(item => item.id === id);
};

//adds bookmarks to the store
const addBookmark = function(item) {
  return this.bookmarks.push(item);
};

//filters the item with given id out of the bookmarks array
const deleteBookmark = function(id) {
  this.bookmarks = this.bookmarks.filter(item => item.id !== id);
};

//sets the filter value in the store object
const setFilter = function(rating) {
  this.filter = rating;
};

//toggles the adding value of the store object
const toggleAdding = function() {
  this.adding = !this.adding;
};

const setError = function(error) {
  this.error = error;
}

export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  deleteBookmark,
  addBookmark,
  setFilter,
  toggleAdding,
  setError
};