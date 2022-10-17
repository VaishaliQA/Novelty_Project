const bookContainer = document.getElementById("all-books");
const addBookEl = document.getElementById("add-book-modal");
bookContainer.addEventListener("click", displayModal);

function makeModal(title, description, authors, categories, ownedBy, status) {
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
      <section class="browse-info">
        <ul>
          <li class="browse-book-title" id="booktitle">Title:
            ${title}</li>
          <li class="browse-book-title" id="bookauthors">Authors:
            ${authors}</li>
          <li class="browse-book-title" id="bookcategories">Categories:
            ${categories}</li>
          <li class="browse-book-title" id="ownedby">Owned By:
            ${ownedBy}</li>
          <li class="browse-book-title" id="bookstatus">Status:
            ${status}</li>
          <li class="browse-book-title" id="bookdesc">Description:
          ${description}</li>
        </ul>
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
      const modalHTML = makeModal(
        data.title,
        data.description,
        data.authors.slice(3, -3),
        data.categories.slice(3, -3),
        data.owner.first_name + " " + data.owner.last_name,
        data.available ? "Available" : "Unavailable"
      );

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

      borrowBtn.addEventListener("click", (e) => {
        console.log("Triggering Twilio Fn Clientside");
      });
    });
}
