// Put request for saving borrower to db
async function saveBorrowerStatus(event){
    const bookId = event.target.getAttribute("data-bookId");
    const borrower_id = document.querySelector(`#singleBorrower${bookId}`).value;
    const response = await fetch(`/api/books/${bookId}`, {
        method: "PUT",
        body: JSON.stringify({ borrower_id }),
        headers: { "Content-Type": "application/json" },
      });
    if (response.ok) {
      window.location.reload();
    } else {
      console.log(response);
    };
};
const saveBtn = document
  .querySelectorAll("#statusSave")

  for (let index = 0; index < saveBtn.length; index++) {
    saveBtn[index].addEventListener("click", saveBorrowerStatus);
  };

