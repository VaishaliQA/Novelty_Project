var submit = document.getElementById("borrowBtn")

const sendEmail= async () => {

    response = await fetch("/api/email/sendEmail", {
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