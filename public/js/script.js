// Nav
// Handle library
// var libraryTab = $(".yourLibraryButton");
// libraryTab.on("click", function () {
//   window.location.replace("/library");
// });

// // Browse
// Handle book click
// var browse_book = $(".browse-book");
// browse_book.on("click", function () {
//   openBrowseModal();
// });

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
