//sets a variable to hold the base url for the api
const baseUrl = 'https://thinkful-list-api.herokuapp.com/stephen';

//creates a wrapper to hold the fetch arguments helps to DRY up the code
const apiFetch = function(...args) {
  
  //creates an error variable to help track error outside of promises
  let error;

  //creates the fetch
  return fetch(...args)

    //starts the promise chain and converts initial response
    .then(response => {

      //if the response does not come back as ok
      if (!response.ok) {

        //sets the error variable to an object containing the response status
        error = { code: response.status };

        //if the response is not json
        if (!response.headers.get('content-type').includes('json')) {

          //sets the error message to the status of the response
          error.message = response.statusText;

          //rejects the promise
          return Promise.reject(error);
        }
      }

      //returns the parsed json
      return response.json();
    })

    //starts the next promise to retrieve the data from the json
    .then(data => {

      //if there's an error
      if (error) {

        //sets the error message to the message contained in the data
        error.message = data.message;

        //rejects the promise
        return Promise.reject(error);
      }

      //returns the json as usable data
      return data;
    });
};

//gets the bookmarks form the api
const getBookmarks = function() {
  
  //returns the apiFetch function with needed arguments
  return apiFetch(`${baseUrl}/bookmarks`);
};

//posts a new bookmark to the api
const createBookmark = function(bookmark) {

  //creates a variable to hold the new bookmark object
  const newBookmark = bookmark;

  //returns the apiFetch with necessary headers and the new bookmark object in the body
  return apiFetch(`${baseUrl}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newBookmark
  });
};

//deletes a bookmark from the api
const deleteBookmark = function(id) {

  //returns api fetch with the item id and the delete method
  return apiFetch(`${baseUrl}/bookmarks/${id}`, {
    method: 'DELETE'
  });
};

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark
};