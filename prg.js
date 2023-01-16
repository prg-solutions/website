$(document).ready(function () {
  const form = document.getElementById("form");
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener('click', submitButtonClick);

  function submitButtonClick() {
    //get form data
    let formData = new FormData(form);
    let from = formData.get("email");
    let name = formData.get("name");
    let message = formData.get("message");

    //create a body object
    let data = {
      name: name,
      from: from,
      message: message
    }

    let url = (window.location.origin === "http://localhost:8000" ? "http://localhost:8080" : "https://us-central1-utils-v1-2023.cloudfunctions.net/sendEmail");

    //fetch call to function
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.text();
      })
      .then(data => {
        form.reset();
      })
      .finally(() => {
      })
      .catch(error => {
        alert("Error sending email");
      });
  }
});
