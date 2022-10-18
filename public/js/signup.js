const signUpLink = document.querySelector(".signup");
const addBookEl = document.getElementById("signup-modal");

signUpLink
  .addEventListener("click", () => {
    console.log("click");
    displayModal();
  });

function makeModal(thumbnail, title, description, authors, categories, ownedBy, status) {
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
        <li class="book-info-item" id="bookimage">Test</li>
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

function displayModal() {
  // const bookClickID = e.target.id;

  // const bookByID = fetch(`/api/books/${bookClickID}`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
      const modalHTML = makeModal(
        // data.thumbnail_url,
        // data.title,
        // data.description,
        // data.authors,
        // data.categories,
        // data.owner.first_name + " " + data.owner.last_name,
        // data.available ? "Available" : "Unavailable"
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
      const bookAddedMessage = document.getElementById("book-borrowed-message");

      borrowBtn.addEventListener("click", (e) => {
        console.log("Triggering Twilio Fn Clientside");
        bookAddedMessage.innerHTML = `<p class="book-added-message">Request to borrow has been sent to ${data.owner.first_name} ${data.owner.last_name}</p>`;
      });

      // Configure read more link
      const readMoreLink = document.getElementById("read-more");
      const remainingDescription = document.getElementById("remaining-description");
        readMoreLink.addEventListener("click", () => {
        console.log("click");
        if (remainingDescription.style.display === "inline") {
          remainingDescription.style.display = "none";
          readMoreLink.innerHTML = `[Read More]`
        } else {
          remainingDescription.style.display = "inline";
          readMoreLink.innerHTML = `[Show Less]`;
        }
      });
    };
// }
