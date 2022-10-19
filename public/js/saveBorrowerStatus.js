const saveBtn = document.getElementById("statusSave");

async function saveBorrowerStatus(savedBorrower){
    
    // Event listener on save button
    saveBtn.addEventListener("click", () => {
      console.log("on click active");
      window.alert("Book checked out!");
    });
}

saveBorrowerStatus()