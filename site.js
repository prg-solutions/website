$(document).ready(function () {
  const form = document.getElementById("submit-query-form");
  const submitBtn = document.getElementById("submit");
  const spinner = document.getElementById("spinner");
  const submitText = document.getElementById("submit-text");

  form.addEventListener("input", () => {
    if (form.checkValidity()) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  });

  // navigation link click handler
  $(".nav-link").click(function () {
    var sectionTo = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(sectionTo).offset().top
    }, 1500);
  });

  // form submission handler
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = document.getElementById("status");
    status.style.display = "none";

    spinner.style.display = "inline-block";
    submitBtn.disabled = true;
    submitText.innerHTML = "";

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
        status.style.display = "block";
      })
      .finally(() => {
        submitBtn.blur();
        spinner.style.display = "none";
        submitText.innerHTML = "Submit";
      })
      .catch(error => {
        alert("Error sending email");
      });
  });
});
