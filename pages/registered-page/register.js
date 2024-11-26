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

    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone-number").value.trim();
    const category = document.querySelector(
      'input[name="category"]:checked'
    )?.value;
    const pass = document.getElementById("password").value.trim();
    const termsAccepted = document.getElementById("keep-me").checked;

    // Utility function to set error messages
    const setError = (elementId, message) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent = message;
      } else {
        console.warn(`Element with ID "${elementId}" not found.`);
      }
    };

    // Clear previous error messages
    setError("full-name-error", "");
    setError("email-error", "");
    setError("phone-number-error", "");
    setError("category-error", "");
    setError("password-error", "");
    setError("terms-error", "");

    // Frontend validation
    let hasError = false;
    if (!termsAccepted) {
      setError(
        "terms-error",
        "Accept the Terms of Service and Privacy Policy."
      );
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await fetch("https://ouragent.com.ng/signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          category,
          pass,
        }),
      });

      if (!response.ok) {
        console.error("HTTP Error:", response.status, response.statusText);
        throw new Error("Failed to connect to server.");
      }

      const data = await response.json();

      if (data.status === "success") {
        alert("Registration successful!");
        // Redirect to login page
        window.location.href = "../login-page/login.html";
      } else {
        // Display validation errors
        if (data.errors) {
          if (data.errors.fullName)
            setError("full-name-error", data.errors.fullName);
          if (data.errors.email) setError("email-error", data.errors.email);
          if (data.errors.phone)
            setError("phone-number-error", data.errors.phone);
          if (data.errors.category)
            setError("category-error", data.errors.category);
          if (data.errors.pass) setError("password-error", data.errors.pass);
        } else {
          alert(data.message || "Registration failed.");
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
      alert("An error occurred. Please try again.");
    }
  });
});
