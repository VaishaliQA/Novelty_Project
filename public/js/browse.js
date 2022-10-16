// This method is called when user click on login button
const openDialog = async (event) => {
  event.preventDefault();

  // Open book modal
  openBrowseModal();
  // api route call
  const response = await fetch("/api/books/1", {
    method: "GET",
  });

  const bookRes = await response.json();

  document.querySelector("#booktitle").textContent = "Title: " + bookRes.title;
  document.querySelector("#bookdesc").textContent =
    "Description: " + bookRes.description;
  document.querySelector("#bookauthors").textContent =
    "Authors: " + bookRes.authors.replace("[ '", "").replace("' ]", "");
  document.querySelector("#bookcategories").textContent =
    "Categories: " + bookRes.categories.replace("[ '", "").replace("' ]", "");
  document.querySelector("#ownedby").textContent =
    "Owned By: " + bookRes.owner.first_name + " " + bookRes.owner.last_name;
  document.querySelector("#bookstatus").textContent =
    "Status: " + bookRes.available;
};

document.querySelector("#step1").addEventListener("click", openDialog);
