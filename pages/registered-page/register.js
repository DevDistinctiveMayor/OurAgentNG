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


  document.addEventListener("DOMContentLoaded", async () => {
    const clientId = sessionStorage.getItem("client_id");
    const greetings = document.querySelectorAll(".greeting");
    const loginButtons = document.querySelectorAll(".login-btn");
    const logoutButtons = document.querySelectorAll(".logout-btn");
    const postPropertyButtons = document.querySelectorAll(".post-property-btn");
  
    if (!clientId) {
      // Handle unauthenticated user
      greetings.forEach((el) => (el.textContent = "Welcome, Guest!"));
      loginButtons.forEach((el) => (el.style.display = "inline"));
      logoutButtons.forEach((el) => (el.style.display = "none"));
      postPropertyButtons.forEach((el) => (el.style.display = "none"));
      return;
    }
  
    try {
      // Fetch client data
      const response = await fetch("https://ouragent.com.ng/user_session/get_user_session.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: clientId }),
      });
  
      const data = await response.json();
      if (data.status === "success" && data.client) {
        const fullName = data.client.fullName;
        greetings.forEach((el) => (el.textContent = `${fullName.substring(0, 8)}...`));
        loginButtons.forEach((el) => (el.style.display = "none"));
        logoutButtons.forEach((el) => (el.style.display = "inline"));
        postPropertyButtons.forEach((el) => (el.style.display = "inline"));
      } else {
        throw new Error("Invalid session.");
      }
    } catch (error) {
      console.error("Error:", error);
      greetings.forEach((el) => (el.textContent = "Error loading session."));
    }
  
    // Add logout functionality
    logoutButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        try {
          const logoutResponse = await fetch("https://ouragent.com.ng/logout.php", { method: "POST" });
          if (logoutResponse.ok) {
            sessionStorage.clear();
            window.location.reload();
          } else {
            console.error("Logout failed.");
          }
        } catch (error) {
          console.error("Error during logout:", error);
        }
      });
    });
  });
  

  document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.querySelector("form button[type='submit']");
  
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
  
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
  
      try {
        const response = await fetch("https://ouragent.com.ng/client_enrollment/signup.php", {
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
          throw new Error("Failed to connect to server.");
        }
  
        const data = await response.json();
  
        if (data.status === "success") {
          Swal.fire({
            toast: true,
            title: "Registration Successful",
            text: "Please check your email for OTP verification.",
            icon: "success",
            iconColor: "rgba(8, 97, 175, 1)",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            // Redirect to OTP verification page, passing email and userId
            sessionStorage.setItem("userId", data.userId);
            sessionStorage.setItem("email", email);
            window.location.href = "../otp-page/otp.html";
          });
        } else {
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
            Swal.fire({
              toast: true,
              title: "Registration Failed",
              text: data.message || "Something went wrong. Please try again.",
              icon: "error",
              confirmButtonText: "Retry",
              confirmButtonColor: "rgba(8, 97, 175, 1)"
            });
          }
        }
      } catch (error) {
        Swal.fire({
          toast: true,
          title: "Error",
          text: "An error occurred. Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "rgba(8, 97, 175, 1)"
        });
      } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = "Register";
      }
    });
  });



  
//   document.getElementById('google-signup-btn').addEventListener('click', () => {
//     const signupClientUrl = "https://accounts.google.com/o/oauth2/auth" +
//         "?client_id=652930243069-c36k0cjarmm9bmhs3vgrtjqncnnkersn.apps.googleusercontent.com" +
//         "&redirect_uri=https://ouragent.com.ng/auth/google-client-signup.php" +
//         "&scope=email profile https://www.googleapis.com/auth/user.phonenumbers.read" +
//         "&response_type=code";
//     window.location.href = signupClientUrl; // Redirect to Google Sign-In
// });
// const urlParams = new URLSearchParams(window.location.search);
// document.getElementById('email').value = urlParams.get('email') || '';
// document.getElementById('full-name').value = urlParams.get('fullName') || '';
// document.getElementById('phone').value = urlParams.get('phone') || '';


// document.getElementById('google-signin-btn').addEventListener('click', () => {
//     const signinClientUrl = "https://ouragent.com.ng/google-client-signin.php"; // Backend URL
//     window.location.href = signinClientUrl; // Redirect to Google Sign-In
// });



