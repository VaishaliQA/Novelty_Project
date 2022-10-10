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