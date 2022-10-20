const signUpLink = document.querySelector(".signup");
const signUpEl = document.getElementById("signup-modal");

signUpLink.addEventListener("click", () => {
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

      <!-- Email -->
      <section class="field email-field">
        <label class="label">Email</label>
        <p class="control has-icons-left has-icons-right">
          <input
            id="signup-input-email"
            class="input signup-input"
            type="text"
            placeholder="Email"
            required/>
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
          <p id="emailMsg" style="color:red; display:none;"> *Email is required. </p> <!-- Handle Error Message -->
        </p>
      </section>

      <!-- Password -->
      <section class="field first-name-field">
        <label class="label">Password</label>
        <p class="control has-icons-left has-icons-right">
          <input
            id="signup-input-password"
            class="input signup-input"
            type="password"
            placeholder="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-address-card"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
          <p id="passwordMsg" style="color:red; display:none;"> *Password length must be 8 character or more. </p> <!-- Handle Error Message -->
        </p>
      </section>      

      <!-- First Name -->
      <section class="field first-name-field">
        <label class="label">First Name</label>
        <p class="control has-icons-left has-icons-right">
          <input
            id="signup-input-first_name"
            class="input signup-input"
            type="text"
            placeholder="First Name"
            required/>
          <span class="icon is-small is-left">
            <i class="fas fa-address-card"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
          <p id="firstNameMsg" style="color:red; display:none;"> *First name is required. </p> <!-- Handle Error Message -->
        </p>
      </section>

      <!-- Last Name -->
      <section class="field last-name-field">
        <label class="label">Last Name</label>
        <p class="control has-icons-left has-icons-right">
          <input
            id="signup-input-last_name"
            class="input signup-input"
            type="text"
            placeholder="Last Name"
            required/>
          <span class="icon is-small is-left">
            <i class="fas fa-address-card"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
          <p id="lastNameMsg" style="color:red; display:none;"> *Last name is required. </p> <!-- Handle Error Message -->
   
        </p>
      </section>

      <!-- Location -->
      <section class="field last-name-field">
        <label class="label">Location</label>
        <p class="control has-icons-left has-icons-right">
          <input
            id="signup-input-location"
            class="input signup-location"
            type="text"
            placeholder="Austin, Tx"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-address-card"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </section>

        <section id="signup-message" class="signup-message">
        </section>
        <button type="submit" class="button is-normal signupButton" id="signupButton">Sign Up</button>
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
  const modalHTML = makeModal();
  // We can add dynamic data here later

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

  // Define function, post book data to backend
  async function postUser(userObj) {
    try {
      const response = await fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      (err) => console.log("error", err);
    }
  }

  signupButton.addEventListener("click", (e) => {
    // Start - Validation of rquired field in signup
    var passwordMsg = document.getElementById("passwordMsg");
    var password = document.getElementById("signup-input-password");
    var emailMsg = document.getElementById("emailMsg");
    var email = document.getElementById("signup-input-email");
    var firstNameMsg = document.getElementById("firstNameMsg");
    var firstName = document.getElementById("signup-input-first_name");
    var lastNameMsg = document.getElementById("lastNameMsg");
    var lastName = document.getElementById("signup-input-last_name");
    var count = 0;
    if (password.value.length < 8) {
      passwordMsg.style.display = "block";
      count = 1;
    } else {
      passwordMsg.style.display = "none";
      count = 0;
    }
    if (email.value.length === 0) {
      emailMsg.style.display = "block";
      count = 1;
    } else {
      emailMsg.style.display = "none";
      count = 0;
    }
    if (firstName.value.length === 0) {
      firstNameMsg.style.display = "block";
      count = 1;
    } else {
      firstNameMsg.style.display = "none";
      count = 0;
    }
    if (lastName.value.length === 0) {
      lastNameMsg.style.display = "block";
      count = 1;
    } else {
      lastNameMsg.style.display = "none";
      count = 0;
    }
    if (count === 1) {
      console.log("one of required field is blank.");
    } else {
      // End Here
      const email = document.getElementById("signup-input-email").value;
      const password = document.getElementById("signup-input-password").value;
      const firstName = document.getElementById(
        "signup-input-first_name"
      ).value;
      const lastName = document.getElementById("signup-input-last_name").value;
      const location = document.getElementById("signup-input-location").value;

      const userObj = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        location: location,
      };

      postUser(userObj)
        .then(() => {
          // Updated error message and close signup dialog
          alert("New user is created.");
          sectionModal.firstChild.classList.remove("is-active");
        })
        .catch((e) => {
          signUpMessage.innerHTML = `<p class="book-added-message">Password Must Be 8 Characters or More!</p>`;
        });
    }
  });
}
