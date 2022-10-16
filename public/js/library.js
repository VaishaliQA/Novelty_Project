const booksYouOwn = document.getElementById("books-you-own");

// Search and Add book to database from Add Book Modal
const isbnInput = "1604698373";
async function loadBooks(isbnInput) {
    console.log("Searching Book..");
    console.log("ISBN:", isbnInput);
    const requestOptions = {
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
        const searchedBookInfo = document.getElementById("searched-book-info");
        console.log("Searched Book Info", searchedBookInfo);
        const bookAddedMessage = document.getElementById("book-added-message");
        searchedBookInfo.innerHTML = booksYouOwn.innerHTML = `
            <section class="library-title">
            <h1>Books You Own</h1>
            </section>
            <button id="add-book-button-library" class="button is-normal add-book-button-library">ADD A BOOK</button>
            <section class="card">
            <header class="card-content">
                <section class="media-left">
                <figure class="image is-96x128">
                    <img
                    src="http://books.google.com/books/content?id=WyZeDgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
                    alt="Placeholder image"
                    />
                </figure>
                </section>
                <section class="owned-book-header">
                    <h2>TITLE</h2>
                </section>
            </header>
            <section class="card-content">
                <section class="content">
                <ul>
                    <li><span class="library-book-title">Description</span>: {{Description}}</li>
                    <li><span class="library-book-title">Authors</span>: {{Authors}}</li>
                    <li><span class="library-book-title">Categories</span>: {{Categories}}</li>
                    <li><span class="library-book-title">Status</span>: Borrowed by {{Borrower}}</li>
                </ul>
                </section>
            </section>
            <footer class="card-footer">
                <a href="#" class="card-footer-item">Share</a>
            </footer>
            </section>
        `;

        // Activate Add Book button
        addBookButton.classList.remove("Disabled");
        
        // Post book to DB (TODO: Finish POST route)
        addBookButton.addEventListener("click", () => {
        console.log("Object to Post:", obj);
        bookAddedMessage.innerHTML = `<p class="book-added-message">Book added</p>`;
        });

        // return response as stringified object
        return JSON.stringify(obj);
        })
        .catch(error => console.log('error', error));
  }; loadBooks(isbnInput);

// Library
// // Handle drop down toggle
// var readStatus = $(".dropdown");
// readStatus.on("click", function () {
//   $(".dropdown").addClass("is-active");
// });

// // Handle drop down toggle
// var readStatusDropdown = $(".read-status-dropdown");
// readStatusDropdown.on("mouseover", function () {
//   $(".dropdown").addClass("is-active");
// });

// // Handle hide drop down on selection
// readStatusDropdown.on("click", function () {
//   $(".dropdown").removeClass("is-active");
// });

// // Handle hide drop down on selection
// var readStatusDropdownItem = $(".dropdown-item");
// readStatusDropdownItem.on("click", function () {
//   $(".dropdown").removeClass("is-active");
// });

// // Handle hide drop down on selection
// readStatusDropdownItem.on("mouseout", function () {
//   $(".dropdown").removeClass("is-active");
// });

// // Handle dropdown coloring
// if (readStatus.val() === "You have not read this book.") {
//   $(".dropdown").css("background-color", "red");
// }