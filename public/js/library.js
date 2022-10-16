const booksYouOwn = document.getElementById("books-you-own");

function loadOwnedBooks() {
    booksYouOwn.innerHTML = `
    <section class="library-title">
    <h1>Books You Own</h1>
    </section>
    <button id="add-book-button-library" class="button is-normal add-book-button-library">ADD A BOOK</button>
    <section class="card">
    <header class="card-content">
        <section class="media-left">
        <figure class="image is-96x96">
            <img
            src="https://bulma.io/images/placeholders/96x96.png"
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
    `
}; loadOwnedBooks();

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