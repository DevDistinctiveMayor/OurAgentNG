const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});
document.getElementById("resetForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const submitButton = document.getElementById("submitButton");
  const responseMessage = document.getElementById("responseMessage");

  // Disable the button and show loading state
  submitButton.disabled = true;
  submitButton.classList.add("loading");

  try {
      const response = await fetch("https://ouragent.com.ng/forgot_password.php", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
          // Success: Redirect to the reset password page
          window.location.href = "../reset-password/reset.html";
      } else {
          // Display error message
          responseMessage.textContent = result.message;
          responseMessage.className = "message error";
      }
  } catch (error) {
      responseMessage.textContent = "An unexpected error occurred. Please try again.";
      responseMessage.className = "message error";
  } finally {
      // Re-enable the button and remove loading state
      submitButton.disabled = false;
      submitButton.classList.remove("loading");
  }
});
