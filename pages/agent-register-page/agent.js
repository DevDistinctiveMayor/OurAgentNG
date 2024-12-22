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

// Initialize Flatpickr
flatpickr("#dateOfBirth", {
  dateFormat: "Y-m-d", // Ensure format matches your expectations
  maxDate: new Date(), // Prevent selecting future dates
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");
  const submitButton = document.getElementById("submitButton");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Gather form inputs
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const ninNumber = document.getElementById("ninNumber").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const cacNumber = document.getElementById("cacNumber").value.trim();
    const dateOfBirth = document.getElementById("dateOfBirth").value.trim();
    const password = document.getElementById("password").value.trim();

    // Utility function to set error messages
    const setError = (elementId, message) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent = message;
      }
    };

    // Clear previous error messages
    [
      "fullName",
      "email",
      "address",
      "ninNumber",
      "phoneNumber",
      "cacNumber",
      "dateOfBirth",
      "password",
    ].forEach((field) => setError(`${field}-error`, ""));

    // Frontend validation
    let hasError = false;

    // Validate phone number format
    const phoneRegex = /^(?:\+234|0)[789]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("phoneNumber-error", "Please enter a valid phone number.");
      hasError = true;
    }

    // Validate NIN (11 digits only)
    const ninRegex = /^\d{11}$/;
    if (!ninRegex.test(ninNumber)) {
      setError("ninNumber-error", "NIN must be exactly 11 digits.");
      hasError = true;
    }

    // Validate age (must be at least 17 years old)
    if (dateOfBirth) {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      const ageLimitDate = new Date(today.setFullYear(today.getFullYear() - 17));

      if (dob > ageLimitDate) {
        setError("dateOfBirth-error", "You must be at least 17 years old.");
        hasError = true;
      }
    } else {
      setError("dateOfBirth-error", "Date of Birth is required.");
      hasError = true;
    }

    // Ensure all required fields are filled
    if (!fullName) {
      setError("fullName-error", "Full Name is required.");
      hasError = true;
    }
    if (!email) {
      setError("email-error", "Email Address is required.");
      hasError = true;
    }
    if (!address) {
      setError("address-error", "Address is required.");
      hasError = true;
    }
    if (!password || password.length < 8) {
      setError("password-error", "Password must be at least 8 characters.");
      hasError = true;
    }

    if (hasError) return;

    // Disable the submit button to prevent multiple submissions
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    try {
      const response = await fetch("https://ouragent.com.ng/agentsignup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          address,
          ninNumber,
          phoneNumber,
          cacNumber,
          dateOfBirth,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        Swal.fire({
          title: "Success!",
          text: data.message || "Registration successful! Check your email for OTP.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Save data in sessionStorage
          sessionStorage.setItem("userId", data.userId);
          sessionStorage.setItem("email", email);

          // Redirect to OTP page
          window.location.href = "../agent-otp-page/agentotp.html";
        });
      } else {
        // Display validation errors if present
        if (data.errors) {
          Object.keys(data.errors).forEach((key) => {
            setError(`${key}-error`, data.errors[key]);
          });
        } else {
          Swal.fire({
            title: "Validation Error",
            text: data.message || "Please check your inputs and try again.",
            icon: "warning",
            confirmButtonText: "Retry",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    } finally {
      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = "Register";
    }
  });
});
