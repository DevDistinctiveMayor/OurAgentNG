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
    const form = document.getElementById("emailForm");
    const submitButton = document.getElementById("submitButton");
    const responseMessage = document.getElementById("responseMessage");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Clear error messages
      document.getElementById("email-error").textContent = "";
      document.getElementById("otp-error").textContent = "";
      document.getElementById("password-error").textContent = "";
      responseMessage.textContent = "";

      // Collect input data
      const email = document.getElementById("email").value.trim();
      const otp = document.getElementById("otp").value.trim();
      const newPassword = document.getElementById("newPassword").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      // Validate passwords match
      if (newPassword !== confirmPassword) {
        document.getElementById("password-error").textContent = "Passwords do not match.";
        return;
      }

      // Disable the button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = "Processing...";

      try {
        // Send data to backend
        const response = await fetch("https://ouragent.com.ng/agentreset_password.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp, new_password: newPassword }),
        });

        const result = await response.json();

        if (result.status === "success") {
       
          Swal.fire({
            title: "Reset Successful",
            text: result.message || "Password reset successfully.",
            icon: "success",
            confirmButtonText: "Login",
          }).then(() => {
            // Redirect to OTP verification page, passing email and userId
            window.location.href = "../agent-login-page/agent-login.html";
          });
        } else {
          Swal.fire({
            title: "Registration Failed",
            text: result.message  || "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonText: "Retry",
          });
        
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred. Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = "Reset Password";
      }
    });
  });
