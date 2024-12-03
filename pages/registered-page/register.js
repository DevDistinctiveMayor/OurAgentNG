const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});

document.getElementById("toggle-password")
  .addEventListener("click", function () {
    const passwordField = document.getElementById("new_password confirm_password");
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
  
      // Phone number validation (Nigerian format: +234XXXXXXXXX or 080XXXXXXXX)
      const phoneRegex = /^(?:\+234|0)[789]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        setError("phone-number-error", "Please enter a valid phone number.");
        hasError = true;
      }
  
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
          // Redirect to OTP verification page, passing email and userId
          sessionStorage.setItem("userId", data.userId);
          sessionStorage.setItem("email", email);
          window.location.href = "../otp-page/otp.html";
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
  
  function handleCredentialResponse(response) {
    const googleToken = response.credential; // Get JWT token
    console.log("Google Token Received:", googleToken);

    // Send the token to your backend
    fetch('https://ouragent.com.ng/google-client-signup.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: googleToken }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        alert('Signup successful!');
        window.location.href = '/dashboard.php';
      } else {
        alert('Signup failed: ' + data.message);
      }
    })
    .catch(error => console.error('Error during signup:', error));
  }

  // Initialize Google Sign-In
  window.onload = () => {
    google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.querySelector(".g_id_signin"),
      { theme: "outline", size: "large" }
    );
  };
  
