// Put request for saving borrower to db
async function saveBorrowerStatus(event){
    const borrower_id = document.querySelector("#singleBorrower").value;
    const bookId = event.target.getAttribute("data-bookId");
    const response = await fetch(`/api/books/${bookId}`, {
        method: "PUT",
        body: JSON.stringify({ borrower_id }),
        headers: { "Content-Type": "application/json" },
      });
}
document
  .querySelector("#statusSave")
  .addEventListener("click", saveBorrowerStatus);

saveBorrowerStatus();