$(document).ready(function () {
  // navigation link click handler
  $(".nav-link").click(function () {
    var sectionTo = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(sectionTo).offset().top
    }, 1500);
  });

  // form submission handler
  document.getElementById("submit-query-form").addEventListener("submit", sendMail);

  function sendMail(event) {
    event.preventDefault();

    //get form data
    let formData = new FormData(event.target);
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
        console.log(data);
        alert("Email sent!");
      })
      .catch(error => {
        console.log(error);
        alert("Error sending email");
      });
  }

});
