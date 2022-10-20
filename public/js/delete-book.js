// Delete request for saving borrower to db
async function deleteBook(event){

    const deleteBookId = event.target.getAttribute("data-deleteBookId");
    console.log(deleteBookId);

    if (deleteBookId) {
        const response = await fetch(`/api/books/${deleteBookId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
    } else {
        console.log("error");
    }
}
document
  .querySelector(".library")
  .addEventListener("click", deleteBook);