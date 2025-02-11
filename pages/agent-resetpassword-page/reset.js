const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});

document.querySelectorAll(".toggle-password").forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const fieldId = this.getAttribute("data-target"); // Get the target field ID
      const passwordField = document.getElementById(fieldId);
      const eyeIcon = this.querySelector("i");

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
  });

  

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resetPasswordForm");
    const submitButton = document.getElementById("submitButton");
  
    // Retrieve the email from sessionStorage
    const email = sessionStorage.getItem("resetEmail");
  
    if (!email) {
      Swal.fire({
        toast: true,
        title: "Session Expired",
        text: "Please start the password reset process again.",
        icon: "error",
        confirmButtonText: "Go Back",
        confirmButtonColor: "rgba(8, 97, 175, 1)",
      }).then(() => {
        window.location.href = "../agent-forgot-page/agentforgot.html";
      });
      return;
    }
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      // Collect input data
      const otp = document.getElementById("otp").value.trim();
      const newPassword = document.getElementById("newPassword").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();
  
      // Validate fields
      if (!otp || !newPassword || !confirmPassword) {
        Swal.fire({
          toast: true,
          title: "Error",
          text: "All fields are required.",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "rgba(8, 97, 175, 1)",
        });
        return;
      }
  
      if (newPassword !== confirmPassword) {
        Swal.fire({
          toast: true,
          title: "Error",
          text: "Passwords do not match. Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "rgba(8, 97, 175, 1)",
        });
        return;
      }
  
      // Disable the button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = "Processing...";
  
      try {
        const response = await fetch("https://ouragent.com.ng/agentreset_password.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, new_password: newPassword, email }),
        });
  
        // Parse JSON response
        const result = await response.json();
  
        // Handle server response
        if (result.status === "success") {
          Swal.fire({
            toast: true,
            title: "Reset Successful",
            text: "Password reset successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
            position: "top-end",
            timerProgressBar: true,
          }).then(() => {
            window.location.href = "../agent-login-page/agent-login.html";
          });
        } else {
          Swal.fire({
            toast: true,
            title: "Error",
            text: result.message || "Invalid O TP or reset failed. Please try again.",
            icon: "error",
            confirmButtonText: "Retry",
            confirmButtonColor: "rgba(8, 97, 175, 1)",
          });
        }
      } catch (error) {
        Swal.fire({
          toast: true,
          title: "Unexpected Error",
          text: error.message || "An error occurred. Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      } finally {
        // Re-enable the button
        submitButton.disabled = false;
        submitButton.textContent = "Reset Password";
      }
    });
  });
  