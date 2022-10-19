const searchModal = document.getElementById("add-book-modal");
const addBookButton = document.getElementById("add-book-button");
const addBookButtonLibrary = document.getElementById("add-book-button-library");
const close_add_modal = document.getElementById("add-modal-close");

// Launch search modal on click
function openSearchModal() {
  searchModal.classList.add("is-active");
}

// Hide search modal on Add Book click
function closeSearchModal() {
  searchModal.classList.remove("is-active");
}

// Close add book modal
close_add_modal.addEventListener("click", function () {
  closeSearchModal();
});

// Open add book modal
addBookButtonLibrary.addEventListener("click", function () {
  openSearchModal();
});

// Search and Add book to database from Add Book Modal
async function searchBook(isbnInput) {
  //   console.log("Searching Book..");
  console.log("ISBN:", isbnInput);
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbnInput,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      // Check if user enter invalid ISBN number
      if (data.totalItems === 0) {
        alert("Invalid ISBN. Please enter valid ISBN.");
      } else {
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
        const thumbnail_url = bookData.volumeInfo.imageLinks.thumbnail;

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
          published_date: publishedDate,
          description: description,
          categories: categories,
          thumbnail_url: thumbnail_url,
        };

        // Show object on screen
        const searchedBookInfo = document.getElementById("searched-book-info");
        //   console.log("Searched Book Info", searchedBookInfo);
        const bookAddedMessage = document.getElementById("book-added-message");
        searchedBookInfo.innerHTML = `
        <ul>
            <li class="search-book-result"><span class="search-book-result-title">Title</span>: ${title}</li>
            <li class="search-book-result"><span class="search-book-result-title">Description</span>:
            ${description.slice(
              0,
              500
            )}<span id ="remaining-description" class="remaining-description">${description.slice(
          500
        )}</span>...<span id="read-more" class="read-more">[Read More]</span></li>
            <li class="search-book-result"><span class="search-book-result-title">Authors</span>: ${authors}</li>
        </ul>
        `;

        // Configure read more link
        const readMoreLink = document.getElementById("read-more");
        const remainingDescription = document.getElementById(
          "remaining-description"
        );
        readMoreLink.addEventListener("click", () => {
          console.log("click");
          if (remainingDescription.style.display === "inline") {
            remainingDescription.style.display = "none";
            readMoreLink.innerHTML = `[Read More]`;
          } else {
            remainingDescription.style.display = "inline";
            readMoreLink.innerHTML = `[Show Less]`;
          }
        });

        // Activate Add Book button
        addBookButton.classList.remove("Disabled");

        addBookButton.addEventListener("click", () => {
          // console.log("Object to Post:", obj);
          const postRes = postBook(obj)
            .then(() => {
              bookAddedMessage.innerHTML = `<p class="book-added-message">Book Added</p>`;
              return;
            })
            .catch(() => {
              bookAddedMessage.innerHTML = `<p class="book-added-message">Error, Please Try Again/p>`;
            });
        });

        return;
      }
    })
    .catch((error) => console.log("error", error));
}

// Define function, post book data to backend
async function postBook(bookObj) {
  try {
    const response = await fetch("/api/books/", {
      method: "POST",
      body: JSON.stringify(bookObj),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    (err) => console.log("error", err);
  }
}

// Define search button
const searchBookButton = document.getElementById("search-book-button");

// On click, capture contents of search field
searchBookButton.addEventListener("click", async () => {
  // Define search field
  const isbnInput = document.getElementById("isbn-input").value;
  searchBook(isbnInput);
  const bookAddedMessage = document.getElementById("book-added-message");
  bookAddedMessage.innerHTML = ``;
  await new Promise((resolve) => setTimeout(resolve, 3000)); // delay for 3 seconds
  location.reload(); // reload
});
