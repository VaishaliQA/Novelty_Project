// Nav
// Handle library
var libraryTab = $(".yourLibraryButton");
libraryTab.on("click", function () {
  window.location.replace("/library");
});

// // Browse
// Handle book click
// var browse_book = $(".browse-book");
// browse_book.on("click", function () {
//   openBrowseModal();
// });

// Library
// Handle drop down toggle
var readStatus = $(".dropdown");
readStatus.on("click", function () {
  $(".dropdown").addClass("is-active");
});

// Handle drop down toggle
var readStatusDropdown = $(".read-status-dropdown");
readStatusDropdown.on("mouseover", function () {
  $(".dropdown").addClass("is-active");
});

// Handle hide drop down on selection
readStatusDropdown.on("click", function () {
  $(".dropdown").removeClass("is-active");
});

// Handle hide drop down on selection
var readStatusDropdownItem = $(".dropdown-item");
readStatusDropdownItem.on("click", function () {
  $(".dropdown").removeClass("is-active");
});

// Handle hide drop down on selection
readStatusDropdownItem.on("mouseout", function () {
  $(".dropdown").removeClass("is-active");
});

// Handle dropdown coloring
if (readStatus.val() === "You have not read this book.") {
  $(".dropdown").css("background-color", "red");
}

// // Steps
var step_three = $(".step-three");
step_three.on("click", function () {
  window.location.replace("/public/library.html");
});

// Modal
var browseModal = $(".browse-book-modal");
var borrowBookButton = $(".borrow-book-button");
var close_borrow_modal = $(".borrow-modal-close");

// Launch browse book modal
function openBrowseModal() {
  browseModal.addClass("is-active");
}

// Hide browse book modal on Add Book click
function closeBrowseModal() {
  browseModal.removeClass("is-active");
}

borrowBookButton.on("click", function () {
  closeBrowseModal();
});

close_borrow_modal.on("click", function () {
  closeBrowseModal();
});
