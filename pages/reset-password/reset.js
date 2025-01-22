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
        title: "Session Expired",
        text: "Please start the password reset process again.",
        icon: "error",
        confirmButtonText: "Go Back",
        confirmButtonColor: "rgba(8, 97, 175, 1)",
      }).then(() => {
        window.location.href = "../forgot-page/forgot.html";
      });
      return;
    }
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const otp = document.getElementById("otp").value.trim();
      const newPassword = document.getElementById("newPassword").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();
  
      // Validate passwords match
      if (!otp || !newPassword || !confirmPassword) {
        Swal.fire({
          title: "Error",
          text: "All fields are required.",
          icon: "error",
          confirmButtonText: "Retry",
        });
        return;
      }
  
      if (newPassword !== confirmPassword) {
        Swal.fire({
          title: "Error",
          text: "Passwords do not match. Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
        });
        return;
      }
  
      // Disable the button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = "Processing...";
  
      try {
        const response = await fetch("https://ouragent.com.ng/reset_password.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, new_password: newPassword, email }),
        });
  
        const result = await response.json();
  
        if (result.status === "success") {
          Swal.fire({
            title: "Reset Successful",
            text: "Your password has been reset successfully.",
            icon: "success",
            confirmButtonText: "Login",
            confirmButtonColor: "rgba(8, 97, 175, 1)",
          }).then(() => {
            window.location.href = "../login-page/login.html";
          });
        } else {
          Swal.fire({
            title: "Error",
            text: result.message || "Invalid OTP or reset failed. Please try again.",
            icon: "error",
            confirmButtonText: "Retry",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Unexpected Error",
          text: "An error occurred. Please try again later.",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "rgba(8, 97, 175, 1)",
        });
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Reset Password";
      }
    });
  });
  
  

  // document.addEventListener("DOMContentLoaded", async () => {
  //   const clientId = sessionStorage.getItem("client_id");
  //   const greetings = document.querySelectorAll(".greeting");
  //   const loginButtons = document.querySelectorAll(".login-btn");
  //   const logoutButtons = document.querySelectorAll(".logout-btn");
  //   const postPropertyButtons = document.querySelectorAll(".post-property-btn");
  
  //   if (!clientId) {
  //     // Handle unauthenticated user
  //     greetings.forEach((el) => (el.textContent = "Welcome, Guest!"));
  //     loginButtons.forEach((el) => (el.style.display = "inline"));
  //     logoutButtons.forEach((el) => (el.style.display = "none"));
  //     postPropertyButtons.forEach((el) => (el.style.display = "none"));
  //     return;
  //   }
  
  //   try {
  //     // Fetch client data
  //     const response = await fetch("https://ouragent.com.ng/get_user_session.php", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ client_id: clientId }),
  //     });
  
  //     const data = await response.json();
  //     if (data.status === "success" && data.client) {
  //       const fullName = data.client.fullName;
  //       greetings.forEach((el) => (el.textContent = `${fullName.substring(0, 8)}...`));
  //       loginButtons.forEach((el) => (el.style.display = "none"));
  //       logoutButtons.forEach((el) => (el.style.display = "inline"));
  //       postPropertyButtons.forEach((el) => (el.style.display = "inline"));
  //     } else {
  //       throw new Error("Invalid session.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     greetings.forEach((el) => (el.textContent = "Error loading session."));
  //   }
  
  //   // Add logout functionality
  //   logoutButtons.forEach((button) => {
  //     button.addEventListener("click", async () => {
  //       try {
  //         const logoutResponse = await fetch("https://ouragent.com.ng/logout.php", { method: "POST" });
  //         if (logoutResponse.ok) {
  //           sessionStorage.clear();
  //           window.location.reload();
  //         } else {
  //           console.error("Logout failed.");
  //         }
  //       } catch (error) {
  //         console.error("Error during logout:", error);
  //       }
  //     });
  //   });
  // });
  