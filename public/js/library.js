const booksYouOwn = document.getElementById("books-you-own");
const booksYouBorrow = document.getElementById("books-you-borrow");

const browseButton = document.querySelector("#browseButton");

// Redirect to browsepage
browseButton.addEventListener("click", () => {
  document.location.replace("/");
});

// Load owned books
const sampleISBN = "9780340960196"; // Remove this after we can pull from the DB's api route
const sampleBorrowedISBN = "0-7475-3269-9";
// TODO: Need to load both columns at the same time
async function loadBooksOwned(sampleISBN) {
  console.log("Getting owned books..");
  console.log("ISBN:", sampleISBN);
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=isbn:" + sampleISBN,
    requestOptions
  )
    .then((response) => response.json())
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

      // Show object on screen
      booksYouOwn.innerHTML = `
            <section class="card">
            <header class="card-content">
                <section class="media-left">
                <figure class="image is-96x128">
                    <img
                    src="${imageLink}"
                    alt="Placeholder image"
                    />
                </figure>
                </section>
                <section class="owned-book-header">
                    <h2>${title}</h2>
                </section>
            </header>
            <section class="card-content">
                <section class="content">
                <ul>
                    <li><span class="library-book-title">Description</span>: ${description.slice(
                      0,
                      500
                    )}...[Read More]</li>
                    <li><span class="library-book-title">Authors</span>: ${authors}</li>
                    <li><span class="library-book-title">Categories</span>: ${categories}</li>
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
    .catch((error) => console.log("error", error));
}
loadBooksOwned(sampleISBN);

// Lood Borrows books
async function loadBooksBorrowed(sampleBorrowedISBN) {
  console.log("Searching Book..");
  console.log("ISBN:", sampleBorrowedISBN);
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=isbn:" + sampleBorrowedISBN,
    requestOptions
  )
    .then((response) => response.json())
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
      booksYouBorrow.innerHTML = `
            <section class="card">
            <header class="card-content">
                <section class="media-left">
                <figure class="image is-96x128">
                    <img
                    src="${imageLink}"
                    alt="Placeholder image"
                    />
                </figure>
                </section>
                <section class="owned-book-header">
                    <h2>${title}</h2>
                </section>
            </header>
            <section class="card-content">
                <section class="content">
                <ul>
                    <li><span class="library-book-title">Owned By</span>: {Owner}</li>
                </ul>
                </section>
            </section>
            <footer class="card-footer">
                <a href="#" class="card-footer-item">Return Book</a>
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
    .catch((error) => console.log("error", error));
}
loadBooksBorrowed(sampleBorrowedISBN);
