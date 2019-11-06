import $ from 'jquery';

import 'normalize.css';
import './index.css';

import bookmark from './bookmark';
import api from './api';
import store from './store';

const main = function() {
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach(bookmark => store.addBookmark(bookmark));
      bookmark.render();
    });
  bookmark.bindEventHandlers();
  bookmark.render();
};

$(main);