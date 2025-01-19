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
        });
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Reset Password";
      }
    });
  });
  
  
async function fetchClientData(clientId, url) {
  const greeting = document.getElementById("greeting");
  const greeting_mobile = document.getElementById("greeting_mobile");
  const loginButton = document.getElementById("login-button");
  const loginButtonMobile = document.getElementById("login-button_mobile");
  const logoutButton = document.getElementById("logout-button");
  const logoutButtonMobile = document.getElementById("logout-button_mobile");
  const postPropertyButton = document.getElementById("post-property");
  const postPropertyButton_mobile = document.getElementById("post-property_mobile");

  try {
    // Send POST request to the server
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ client_id: clientId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Parse the response JSON
    const data = await response.json();
   // console.log("Server Response:", data); // Debugging line

    if (data.status === "success" && data.client) {
      // Extract fullName from the nested client object
      const fullName = data.client.fullName; // Fallback to "User" if undefined
      greeting.textContent = `${fullName.substring(0, 8)}...`;
      greeting_mobile.textContent = `${fullName.substring(0, 8)}...`;
      loginButton.style.display = "none"; 
      loginButtonMobile.style.display = "none"; // Hide login button
      logoutButton.style.display = "inline"; // Show logout button
      logoutButtonMobile.style.display = "inline"; // Show logout button
      postPropertyButton.style.display = "inline"; // Show post property button
      postPropertyButton_mobile.style.display = "inline"; // Show post property button
      
    } else {
      // User is not logged in or session is invalid

      greeting.textContent = "Welcome, Guest!";
      greeting_mobile.textContent = "Welcome, Guest!";
      loginButton.style.display = "inline";
      loginButtonMobile.style.display = "inline"; // Show login button
      logoutButton.style.display = "none"; // Hide logout button
      logoutButtonMobile.style.display = "none"; // Hide logout button
      postPropertyButton.style.display = "none"; // Hide post property button
      postPropertyButton_mobile.style.display = "none"; // Hide post property button
    }
  } catch (error) {
    console.error("Error checking session:", error);
    greeting.textContent = "Error loading user session.";
    greeting_mobile.textContent = "Error loading user session.";
  }

  // Logout button event listener
  logoutButton.addEventListener("click", async () => {
    try {
      // Send logout request to the server
      const logoutResponse = await fetch("https://ouragent.com.ng/logout.php", {
        method: "POST",
      });

      if (logoutResponse.ok) {
        // Clear local session storage and reload the page
        sessionStorage.clear();
        window.location.reload();
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  });
}


  
