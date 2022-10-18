const signUpLink = document.querySelector(".signup");
const signUpEl = document.getElementById("signup-modal");

signUpLink
  .addEventListener("click", () => {
    console.log("click");
    displayModal();
  });

function makeModal() {
  return `<section class="modal signup-modal is-active">
<section class="modal-background"></section>
<section class="modal-content">
  <!-- Any other Bulma elements you want -->

  <!-- Begin Signup Modal -->
  <section class="signupModal">

    <!-- Begin left -->
    <section class="searchLeft">
      <img
        class="logo"
        src="./assets/img/novelty-logo.png"
        alt="Novelty Logo"
      />
    </section>

    <!-- Begin right -->
    <section class="searchRight">

    <!-- Sign Up -->
    <section class="modal-header borrow-book-modal-header">
      <h1>SIGN UP TO GET STARTED</h1>
    </section>

    <!-- Welcome Message -->
    <p class="welcome-message"><span class="welcome-title">Welcome to NOVELty!</span><br>We're glad you're here. Enter your information below to begin sharing, borrowing, and reading with us.</p>

    
      <section class="search-info">
      <!-- First Name -->
      <section class="field first-name-field">
        <label class="label">First Name</label>
        <p class="control has-icons-left has-icons-right">
          <input
            id="signup-input"
            class="input signup-input"
            type="text"
            placeholder="First Name"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-address-card"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </section>

      <!-- Last Name -->
      <section class="field last-name-field">
        <label class="label">Last Name</label>
        <p class="control has-icons-left has-icons-right">
          <input
            id="signup-input"
            class="input signup-input"
            type="text"
            placeholder="Last Name"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-address-card"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </section>

      <!-- Email -->
      <section class="field email-field">
        <label class="label">Email</label>
        <p class="control has-icons-left has-icons-right">
          <input
            id="signup-input"
            class="input signup-input"
            type="text"
            placeholder="Email"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </section>

        <section id="signup-message" class="signup-message">
        </section>
        <button class="button is-normal signupButton" id="signupButton">Sign Up</button>
      </section>
    </section>

  </section>
</section>
<button
  class="modal-close signup-modal-close is-large"
  aria-label="close" id="modal-close"
></button>
</section>
`;
}

function displayModal() {

      const modalHTML = makeModal(
        // We can add dynamic data here later
      );

      // Display modal
      signUpEl.innerHTML = ""; // reset container content to delete previous render
      const sectionModal = document.createElement("section"); // create new section to insert html
      sectionModal.innerHTML = modalHTML; // set section contents to modal string
      signUpEl.appendChild(sectionModal); // append section with modal content to container

      // Configure close button
      const closeBtn = document.getElementById("modal-close");

      closeBtn.addEventListener("click", (e) => {
        sectionModal.firstChild.classList.remove("is-active");
      });

      // Configure signup button
      const signupButton = document.getElementById("signupButton");
      const signUpMessage = document.getElementById("signup-message");

      signupButton.addEventListener("click", (e) => {
        signUpMessage.innerHTML = `<p class="book-added-message">Request Submitted!</p>`;
      });

    };
// }
