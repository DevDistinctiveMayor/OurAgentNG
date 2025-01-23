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


  // document.addEventListener("DOMContentLoaded", function () {
  //   const form = document.getElementById("signup-form");
  //   const submitButton = document.getElementById("submitButton");
  
  //   form.addEventListener("submit", async (event) => {
  //     event.preventDefault();
  
  //     // Fetch client ID and email from sessionStorage
  //     const clientId = sessionStorage.getItem("client_id");
  //     const email = sessionStorage.getItem("email");
  //     console.log(clientId)
  //     console.log(email)
  
  //     if (!clientId || !email) {
  //       Swal.fire({
  //         title: "Error",
  //         text: "Client information is missing. Please log in first.",
  //         icon: "error",
  //         confirmButtonText: "OK",
  //       });
  //       return;
  //     }
  
  //     // Gather additional form inputs
  //     const fullName = clientId; // Using clientId as fullName per your request
  //     const companyName = document.getElementById("companyName").value.trim();
  //     const address = document.getElementById("address").value.trim();
  //     const ninNumber = document.getElementById("ninNumber").value.trim();
  //     const phoneNumber = document.getElementById("phoneNumber").value.trim();
  //     const cacNumber = document.getElementById("cacNumber").value.trim();
  //     const socialMediaHandles = document.getElementById("socialMediaHandles").value.trim();
  //     const password = document.getElementById("password").value.trim();
  
  //     // Utility function to set error messages
  //     const setError = (elementId, message) => {
  //       const element = document.getElementById(elementId);
  //       if (element) {
  //         element.textContent = message;
  //       }
  //     };
  
  //     // Clear previous error messages
  //     [
  //       "companyName",
  //       "address",
  //       "ninNumber",
  //       "phoneNumber",
  //       "cacNumber",
  //       "socialMediaHandles",
  //       "password",
  //     ].forEach((field) => setError(`${field}-error`, ""));
  
  //     // Frontend validation
  //     let hasError = false;
  
  //     // Validate phone number format
  //     const phoneRegex = /^(?:\+234|0)[789]\d{9}$/;
  //     if (!phoneRegex.test(phoneNumber)) {
  //       setError("phoneNumber-error", "Please enter a valid phone number.");
  //       hasError = true;
  //     }
  
  //     // Validate NIN (11 digits only)
  //     const ninRegex = /^\d{11}$/;
  //     if (!ninRegex.test(ninNumber)) {
  //       setError("ninNumber-error", "NIN must be exactly 11 digits.");
  //       hasError = true;
  //     }
  
  //     // Ensure all required fields are filled
  //     if (!companyName) {
  //       setError("companyName-error", "Company Name is required.");
  //       hasError = true;
  //     }
  //     if (!address) {
  //       setError("address-error", "Address is required.");
  //       hasError = true;
  //     }
  //     if (!password || password.length < 8) {
  //       setError("password-error", "Password must be at least 8 characters.");
  //       hasError = true;
  //     }
  
  //     if (hasError) return;
  
  //     // Disable the submit button to prevent multiple submissions
  //     submitButton.disabled = true;
  //     submitButton.textContent = "Submitting...";
  
  //     try {
  //       const response = await fetch("https://ouragent.com.ng/agentsignup.php", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           fullName,
  //           email,
  //           companyName,
  //           address,
  //           ninNumber,
  //           phoneNumber,
  //           cacNumber,
  //           socialMediaHandles,
  //           password,
  //         }),
  //       });
  
  //       const data = await response.json();
  
  //       if (response.ok && data.status === "success") {
  //         Swal.fire({
  //           title: "Success!",
  //           text: data.message || "Registration successful! Check your email for OTP.",
  //           icon: "success",
  //           confirmButtonText: "OK",
  //         }).then(() => {
  //           // Redirect to OTP page
  //           window.location.href = "../agent-otp-page/agentotp.html";
  //         });
  //       } else {
  //         // Display validation errors if present
  //         if (data.errors) {
  //           Object.keys(data.errors).forEach((key) => {
  //             setError(`${key}-error`, data.errors[key]);
  //           });
  //         } else {
  //           Swal.fire({
  //             title: "Validation Error",
  //             text: data.message || "Please check your inputs and try again.",
  //             icon: "warning",
  //             confirmButtonText: "Retry",
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       Swal.fire({
  //         title: "Error",
  //         text: "An unexpected error occurred. Please try again later.",
  //         icon: "error",
  //         confirmButtonText: "Retry",
  //       });
  //     } finally {
  //       // Re-enable the submit button
  //       submitButton.disabled = false;
  //       submitButton.textContent = "Register";
  //     }
  //   });
  // });

  
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
    const response = await fetch(
      "https://ouragent.com.ng/get_user_session.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: clientId }),
      }
    );

    const data = await response.json();
    if (data.status === "success" && data.client) {
      const fullName = data.client.fullName;
      greetings.forEach(
        (el) => (el.textContent = `${fullName.substring(0, 8)}...`)
      );
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
        const logoutResponse = await fetch(
          "https://ouragent.com.ng/logout.php",
          { method: "POST" }
        );
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
    const form = document.getElementById("signup-form");
    const submitButton = document.getElementById("submitButton");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      // Fetch client ID and email from sessionStorage
      const clientId = sessionStorage.getItem("client_id");
      const email = sessionStorage.getItem("email");
  
      // Debugging: Log the retrieved client ID and email
    console.log("Client ID from sessionStorage:", clientId);
     console.log("Email from sessionStorage:", email);
  
      if (!clientId || !email) {
        Swal.fire({
          title: "Error",
          text: "Client information is missing. Please log in first.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "rgba(8, 97, 175, 1)"
        });
        return;
      }
  
      // Continue with form submission logic...
      const companyName = document.getElementById("companyName").value.trim();
      const address = document.getElementById("address").value.trim();
      const ninNumber = document.getElementById("ninNumber").value.trim();
      const phoneNumber = document.getElementById("phoneNumber").value.trim();
      const cacNumber = document.getElementById("cacNumber").value.trim();
      const socialMediaHandles = document.getElementById("socialMediaHandles").value.trim();
      const password = document.getElementById("password").value.trim();

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
            client_id: clientId,
            fullName: clientId, // Assuming clientId is used as fullName
            email,
            companyName,
            address,
            ninNumber,
            phoneNumber,
            cacNumber,
            socialMediaHandles,
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
            confirmButtonColor: "rgba(8, 97, 175, 1)"
          }).then(() => {
            // Redirect to OTP page
            window.location.href = "../agent-otp-page/agentotp.html";
          });
        } else {
          Swal.fire({
            title: "Validation Error",
            text: data.message || "Please check your inputs and try again.",
            icon: "warning",
            confirmButtonText: "Retry",
            confirmButtonColor: "rgba(8, 97, 175, 1)"
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again later.",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "rgba(8, 97, 175, 1)"
        });
      } finally {
        // Re-enable the submit button
        submitButton.disabled = false;
        submitButton.textContent = "Register";
      }
    });
  });
  