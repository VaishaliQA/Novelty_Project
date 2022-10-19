// const saveBtn = document.getElementById("statusSave");

async function saveBorrowerStatus(event){
    const borrower_id = document.querySelector("#singleBorrower").value;
    const bookId = event.target.getAttribute("data-bookId");
    const response = await fetch(`/api/books/${bookId}`, {
        method: "PUT",
        body: JSON.stringify({ borrower_id }),
        headers: { "Content-Type": "application/json" },
      });

    
    // Event listener on save button
    // saveBtn.addEventListener("click", () => {
    //   
    //   window.alert("Book checked out!");
    // });
}
document
  .querySelector("#statusSave")
  .addEventListener("click", saveBorrowerStatus);

// saveBorrowerStatus()