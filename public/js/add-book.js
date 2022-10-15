var searchModal = document.getElementById("add-book-modal");
var addBookButton = document.getElementById("add-book-button");
var addBookButtonLibrary = document.getElementById("add-book-button-library");
var close_add_modal = document.getElementById("add-modal-close");

// Launch search modal on click
function openSearchModal() {
    searchModal.classList.add("is-active");
  }
  
  // Hide search modal on Add Book click
  function closeSearchModal() {
    searchModal.classList.remove("is-active");
  }
  
  close_add_modal.addEventListener("click", function () {
    closeSearchModal();
  });
  
  addBookButtonLibrary.addEventListener("click", function () {
    openSearchModal();
  });

  // Search and Add book to database from Add Book Modal
async function searchBook(isbnInput) {
    console.log("Searching Book..");
    console.log("ISBN:", isbnInput);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
    await fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbnInput, requestOptions)
      .then(response => response.json())
      .then((data) => {
        // access first entry of response
        const bookData = data.items[0];
        console.log("Book Data:", bookData);
  
        // parse response
        const isbnList = bookData.volumeInfo.industryIdentifiers;
        const title = bookData.volumeInfo.title;
        const authors = bookData.volumeInfo.authors;
        const publishedDate = bookData.volumeInfo.publishedDate;
        const description = bookData.volumeInfo.description; // Show the first 500 characters
        const categories = bookData.volumeInfo.categories;
        const imageLink = bookData.volumeInfo.imageLinks.smallThumbnail;
  
        // grab 13 digit ISBN from array
        let isbn13 = "";
        isbnList.forEach((obj) => {
          if (obj.type === "ISBN_13") {
            isbn13 = obj.identifier;
          }
        });
  
        // structure response into object
        const obj = {
          isbn13: isbn13,
          title: title,
          authors: authors,
          publishedDate: publishedDate,
          description: description,
          categories: categories,
          imageLink: imageLink,
        };
  
        // Show object on screen
        const searchedBookInfo = document.getElementById("add-book-modal");
        const bookAddedMessage = document.getElementById("book-added-message");
        searchedBookInfo.innerHtml = `
        <ul>
          <li class="search-book-result"><span class="search-book-result-title">Title</span>: ${title}</li>
          <li class="search-book-result"><span class="search-book-result-title">Description</span>: ${description.slice(0, 500)}...[Read More]</li>
          <li class="search-book-result"><span class="search-book-result-title">Authors</span>: ${authors}</li>
        </ul>
      `;
      // Activate Add Book button
      addBookButton.classList.remove("Disabled");
  
      addBookButton.addEventListener("click", () => {
        console.log("Object to Post:", obj);
        bookAddedMessage.html(`<p class="book-added-message">Book added</p>`);
      });
  
        // return response as stringified object
        return JSON.stringify(obj);
      })
      .catch(error => console.log('error', error));
  };
  
  // Define search button
  const searchBookButton = document.getElementById("search-book-button");
  
  // On click, capture contents of search field
  searchBookButton.addEventListener("click", () => {
      // Define search field
      const isbnInput = document.getElementById("isbn-input").value;
      searchBook(isbnInput);
      // Reset book added message
      const bookAddedMessage = document.getElementById("book-added-message");
      bookAddedMessage.innerHTML = ``;
    }
  );