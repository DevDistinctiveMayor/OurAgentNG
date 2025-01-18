// Navbar toggle

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});

document
  .getElementById("toggle-password")
  .addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const eyeIcon = document.getElementById("eye-icon");

    if (passwordField.type === "password") {
      passwordField.type = "text";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    } else {
      passwordField.type = "password";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    }
  });


  
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const keepMeLoggedIn = document.getElementById("keep-me").checked;
      const submitButton = document.getElementById("submitButton"); // Get the button with ID 'submitButton'
      const responseMessage = document.getElementById("responseMessage"); // Where you display error messages
  
      // Utility function to set error messages
      const setError = (elementId, message) => {
        const element = document.getElementById(elementId);
        if (element) {
          element.textContent = message; // Display error message
        } else {
          console.warn(`Element with ID "${elementId}" not found.`);
        }
      };
  
      // Clear previous error messages
      setError("email-error", "");
      setError("password-error", "");
  
      // Disable the button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = "Processing...";
  
      try {
        const response = await fetch("https://ouragent.com.ng/signin.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to connect to server.");
        }
  
        const data = await response.json();

          // Save login state
          if (data.status === "success") {
            const userData = {
              client_id: data.client_id,
              token: data.token,
            };
          
            // Store client_id in sessionStorage
            sessionStorage.setItem("client_id", data.client_id);
          
            // Save login state for future use
            if (keepMeLoggedIn) {
              localStorage.setItem("user", JSON.stringify(userData));
            } else {
              sessionStorage.setItem("user", JSON.stringify(userData));
            }
     
            // Redirect to the dashboard or home page
           window.location.href = "../../index.html"; // Example redirection
          }
           else {
          // Display validation errors
          if (data.errors) {
            if (data.errors.email) setError("email-error", data.errors.email);
            if (data.errors.password) setError("password-error", data.errors.password);
          } else {
            setError("email-error", data.message || "Login failed.");
          }
        }
      } catch (error) {
        console.error("Fetch Error:", error.message);
        setError("email-error", "An error occurred. Please try again.");
      } finally {
        // Re-enable the button and remove loading state
        submitButton.disabled = false;
        submitButton.textContent = "Login"; // Reset button text
      }
    });
  });
  