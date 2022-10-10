// Login page
// Handle login
var loginButton = $('.loginButton');
loginButton.on('click', function() {
  window.location.replace("/public/browse.html");
})

// Handle logout
var logOutButton = $('.logOutButton');
logOutButton.on('click', function() {
  window.location.replace("/public/index.html");
})

// Nav
// Handle library
var libraryTab = $('.yourLibraryButton');
libraryTab.on('click', function() {
  window.location.replace("/public/library.html");
})

// Handle browse
var browseTab = $('.browseButton');
browseTab.on('click', function() {
  window.location.replace("/public/browse.html");
})

// Library
// Handle drop down toggle
var readStatus = $('.dropdown');
readStatus.on('click', function() {
  $(".dropdown").addClass( "is-active");
})

// Handle drop down toggle
var readStatusDropdown = $('.read-status-dropdown');
readStatusDropdown.on('mouseover', function() {
  $(".dropdown").addClass( "is-active");
})

// Handle hide drop down on selection
readStatusDropdown.on('click', function() {
  $(".dropdown").removeClass( "is-active");
})

// Handle hide drop down on selection
var readStatusDropdownItem = $('.dropdown-item');
readStatusDropdownItem.on('click', function() {
  $(".dropdown").removeClass( "is-active");
})

// Handle hide drop down on selection
readStatusDropdownItem.on('mouseout', function() {
  $(".dropdown").removeClass( "is-active");
})

// Handle dropdown coloring
if (readStatus.val() === "You have not read this book.") {
    $(".dropdown").css("background-color", "red");
}

// Steps
var step_one = $('.step-one');
step_one.on('click', function() {
  openSearchModal();;
})

var step_two = $('.step-two');
step_two.on('click', function() {
  window.location.replace("/public/browse.html");
})

var step_three = $('.step-three');
step_three.on('click', function() {
  window.location.replace("/public/library.html");
})

// Modal
var searchModal = $('.add-book-modal');
var addBookButton = $('.addBookButton');
var addBookButtonLibrary = $('.addBookButtonLibrary');
var close_modal_x = $('.modal-close');

// Launch search modal on click
function openSearchModal() {
  searchModal.addClass("is-active");
}

// Hide search modal on Add Book click
function closeSearchModal() {
  searchModal.removeClass("is-active");
}

addBookButton.on('click', function() {
  closeSearchModal();
})

close_modal_x.on('click', function() {
  closeSearchModal();
})

addBookButtonLibrary.on('click', function() {
  openSearchModal();
})