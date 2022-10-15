// // Login page
// // Handle login
// var loginButton = $('.loginButton');
// loginButton.on('click', function() {
//   window.location.replace("/browse");
// })

// // Handle logout
// var logOutButton = $('.logOutButton');
// logOutButton.on('click', function() {
//   window.location.replace("/");
// })

// Nav
// Handle library
var libraryTab = $(".yourLibraryButton");
libraryTab.on("click", function () {
  window.location.replace("/library");
});

// // Browse
// // Handle browse
// var browseTab = $('.browseButton');
// browseTab.on('click', function() {
//   window.location.replace("/browse");
// })

// Handle book click
var browse_book = $(".browse-book");
browse_book.on("click", function () {
  openBrowseModal();
});

// Library
// Handle drop down toggle
var readStatus = $(".dropdown");
readStatus.on("click", function () {
  $(".dropdown").addClass("is-active");
});

// Handle drop down toggle
var readStatusDropdown = $(".read-status-dropdown");
readStatusDropdown.on("mouseover", function () {
  $(".dropdown").addClass("is-active");
});

// Handle hide drop down on selection
readStatusDropdown.on("click", function () {
  $(".dropdown").removeClass("is-active");
});

// Handle hide drop down on selection
var readStatusDropdownItem = $(".dropdown-item");
readStatusDropdownItem.on("click", function () {
  $(".dropdown").removeClass("is-active");
});

// Handle hide drop down on selection
readStatusDropdownItem.on("mouseout", function () {
  $(".dropdown").removeClass("is-active");
});

// Handle dropdown coloring
if (readStatus.val() === "You have not read this book.") {
  $(".dropdown").css("background-color", "red");
}

// // Steps
// var step_one = $('.step-one');
// step_one.on('click', function() {
//   openSearchModal();;
// })

// var step_two = $('.step-two');
// step_two.on('click', function() {
//   window.location.replace("/public/browse.html");
// })

var step_three = $(".step-three");
step_three.on("click", function () {
  window.location.replace("/public/library.html");
});

// Modal
var searchModal = $(".add-book-modal");
var browseModal = $(".browse-book-modal");
var addBookButton = $(".addBookButton");
var searchBookButton = $(".searchBookButton");
var addBookButtonLibrary = $(".addBookButtonLibrary");
var borrowBookButton = $(".borrow-book-button");
var close_modal_x = $(".modal-close");
var close_borrow_modal = $(".borrow-modal-close");

// Launch search modal on click
function openSearchModal() {
  searchModal.addClass("is-active");
}

// Hide search modal on Add Book click
function closeSearchModal() {
  searchModal.removeClass("is-active");
}

addBookButton.on("click", function () {
  closeSearchModal();
});

close_modal_x.on("click", function () {
  closeSearchModal();
});

addBookButtonLibrary.on("click", function () {
  openSearchModal();
});

// Launch browse book modal
function openBrowseModal() {
  browseModal.addClass("is-active");
}

// Hide browse book modal on Add Book click
function closeBrowseModal() {
  browseModal.removeClass("is-active");
}

borrowBookButton.on("click", function () {
  closeBrowseModal();
});

close_borrow_modal.on("click", function () {
  closeBrowseModal();
});

// Search and Add book to database from Add Book Modal
async function searchBook() {
  console.log("Searching Book..");
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  await fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:9781936594115", requestOptions)
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
      const description = bookData.volumeInfo.description;
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

      console.log(obj);

      // return response as stringified object
      return JSON.stringify(obj);
    })
    .catch(error => console.log('error', error));
};

searchBookButton.on("click", function () {
  searchBook();
});
