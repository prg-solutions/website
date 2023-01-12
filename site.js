$(document).ready(function () {
  const form = document.getElementById("submit-query-form");

  // navigation link click handler
  $(".nav-link").click(function () {
    var sectionTo = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(sectionTo).offset().top
    }, 1500);
  });

  // form submission handler
  form.addEventListener("submit", sendMail);

  function sendMail(event) {
    event.preventDefault();

    //get form data
    let formData = new FormData(form);
    let from = formData.get("email");
    let name = formData.get("name");
    let message = formData.get("message");

    //create a body object
    let data = {
      to: 'paulgill81@gmail.com',
      subject: 'Contact Form',
      message: `From: ${name}, Email: ${from}, Message: ${message}`
    }

    //fetch call to function
    fetch('https://us-central1-utils-v1-2023.cloudfunctions.net/sendEmail', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'D0DBC9C2-945C-4659-8B22-925FE468A5E8'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.text();
      })
      .then(data => {
        console.log(data);
        alert("Email sent!");
      })
      .catch(error => {
        console.log(error);
        alert("Error sending email");
      });
  }

});
