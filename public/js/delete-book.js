// Delete request for saving borrower to db
const libEl = document.querySelector(".library")

async function deleteBook(event){
    const target = event.target
    const bookId = target.dataset.deletebookid;

    if (bookId) {
        const response = await fetch(`/api/books/${bookId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
        if (response.ok) {
            window.location.reload();
        } else {
            console.log(response);
          };
    } else {
        console.log("error");
    }

    
}
libEl.addEventListener("click", deleteBook);

