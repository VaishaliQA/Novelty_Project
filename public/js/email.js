var submit = document.getElementById("borrowBtn")

const sendEmail= async (title, thumbnail, name) => {

  let fullUrl = "/api/email/sendEmail/" + title + "/" + thumbnail + "/" + name ; 

    response = await fetch(fullUrl, {
        method: 'post',
        body: JSON.stringify({}),
        headers: { "Content-Type": "application/json" },
    })
    if (response.ok) {
        document.location.reload()
        alert("Email Request Sent!");
      } else {
        alert("Failed to send email");
      }
}