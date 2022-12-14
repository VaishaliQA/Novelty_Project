const bookContainer = document.getElementById("all-books");
const addBookEl = document.getElementById("add-book-modal");
bookContainer.addEventListener("click", displayModal);

function makeModal(
  thumbnail,
  title,
  description,
  authors,
  categories,
  ownedBy,
  status
) {
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
        src="${thumbnail}"
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
          ${description.slice(
            0,
            500
          )}<span id ="remaining-description" class="remaining-description">${description.slice(
    500
  )}</span>...<span id="read-more" class="read-more">[Read More]</span></li>
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
        data.thumbnail_url,
        data.title,
        data.description,
        data.authors,
        data.categories,
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
        console.log("Triggering MailTo Form");

        const sendEmail= async () => {
          
          response = await fetch("/api/email/sendEmail/", {
          method: 'post',
          body: new URLSearchParams({
            'email': data.owner.email,
            'name': data.owner.first_name,
            'title': data.title,
            'thumbnail': data.thumbnail_url,
            'id': data.id
            }),
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          
          if (response.ok) {
              document.location.reload()
              alert("Email Request Sent! Once the owner approves your request, the book will show up in your Library Page");
            } else {
              alert("Failed to send email");
            }
          }
        
        if (data.available === true) {
          sendEmail();
        } else {
          alert("This book is currently unavailable. Please check back later!");
        }
      });

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
    });
}
