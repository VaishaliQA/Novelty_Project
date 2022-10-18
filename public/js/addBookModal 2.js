const bookContainer = document.getElementById("all-books");
const addBookEl = document.getElementById("add-book-modal");
bookContainer.addEventListener("click", displayModal);

function makeModal(imageLink, title, description, authors, categories, ownedBy, status) {
  return `<div class="modal browse-book-modal is-active">
<div class="modal-background"></div>
<div class="modal-content">
  <!-- Any other Bulma elements you want -->

  <!-- Begin browse Modal -->
  <section class="browseModal">

    <!-- Begin left -->
    <section class="browseLeft">
      <img
        class="logo"
        src="./assets/img/novelty-logo.png"
        alt="Novelty Logo"
      />
    </section>

    <!-- Begin right -->
    <section class="browseRight">

    <!-- Borrow a Book -->
    <section class="modal-header borrow-book-modal-header">
      <h1>BORROW A BOOK</h1>
    </section>

    <!-- Begin book info -->
      <section class="browse-info">
        <ul>
        <li class="book-info-item" id="bookimage"><img
        src="http://books.google.com/books/content?id=I12oPwAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
        alt="Placeholder image"
        /></li>
          <li class="book-info-item" id="booktitle"><span class="browse-book-title">Title</span>:
            ${title}</li>
          <li class="book-info-item" id="bookauthors"><span class="browse-book-title">Authors</span>:
            ${authors}</li>
          <li class="book-info-item" id="bookcategories"><span class="browse-book-title">Categories</span>:
            ${categories}</li>
          <li class="book-info-item" id="ownedby"><span class="browse-book-title">Owned By</span>:
            ${ownedBy}</li>
          <li class="book-info-item" id="bookstatus"><span class="browse-book-title">Status</span>:
            ${status}</li>
          <li class="book-info-item" id="bookdesc"><span class="browse-book-title">Description</span>:
          ${description}</li>
        </ul>
        <section id ="book-borrowed-message" class="book-borrowed-message">
        </section>
        <button class="button is-normal borrow-book-button" id="borrowBtn">Borrow Book</button>
      </section>
    </section>

  </section>
</div>
<button
  class="modal-close borrow-modal-close is-large"
  aria-label="close" id="modal-close"
></button>
</div>
`;
}

function displayModal(e) {
  const bookClickID = e.target.id;

  const bookByID = fetch(`/api/books/${bookClickID}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const modalHTML = makeModal(
        data.title,
        data.description,
        data.authors.slice(3, -3),
        data.categories.slice(3, -3),
        data.owner.first_name + " " + data.owner.last_name,
        data.available ? "Available" : "Unavailable"
      );

      // structure response into object
      const obj = {
        // title: title,
        // authors: authors,
        // publishedDate: publishedDate,
        // description: description,
        // categories: categories,
        // imageLink: imageLink,
      };

      // display modal
      addBookEl.innerHTML = ""; // reset container content to delete previous render
      const divModal = document.createElement("div"); // create new div to insert html
      divModal.innerHTML = modalHTML; // set div contents to modal string
      addBookEl.appendChild(divModal); // append div with modal content to container

      // configure close button
      const closeBtn = document.getElementById("modal-close");

      closeBtn.addEventListener("click", (e) => {
        divModal.firstChild.classList.remove("is-active");
      });

      // configure borrow button
      const borrowBtn = document.getElementById("borrowBtn");
      const bookAddedMessage = document.getElementById("book-borrowed-message");

      borrowBtn.addEventListener("click", (e) => {
        console.log("Triggering Twilio Fn Clientside");
        console.log("Object to Post:", obj);
        bookAddedMessage.innerHTML = `<p class="book-added-message">Request to borrow has been sent to ${data.owner.first_name} ${data.owner.last_name}</p>`;
      });
    });
}
