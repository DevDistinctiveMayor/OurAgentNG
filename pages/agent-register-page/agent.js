
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.display = "block"; // Show body when JS is ready
});



document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  // Show loader immediately
  loader.style.display = "flex";
  content.style.display = "none";

  // Delay the execution of heavy JavaScript
  setTimeout(async () => {
    try {
      await loadUserSession(); // Load user session
      await fetchAndRenderProperties(); // Fetch properties
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      // Hide loader and show content
      loader.style.display = "none";
      content.style.display = "block";
    }
  }, 100); // 100ms delay to ensure the loader is rendered
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
        // console.error("Error:", error);
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
    await loadUserSession(); // Ensure the session loads after the page is fully loaded
  });
  
  async function loadUserSession() {
    const clientId = sessionStorage.getItem("client_id");
    const greetings = document.querySelectorAll(".greeting");
    const loginButtons = document.querySelectorAll(".login-btn");
    const logoutButtons = document.querySelectorAll(".logout-btn");
    const postPropertyButtons = document.querySelectorAll(".post-property-btn");
  
    if (!clientId) {
      greetings.forEach((el) => (el.textContent = "Welcome, Guest!"));
      loginButtons.forEach((el) => (el.style.display = "inline"));
      logoutButtons.forEach((el) => (el.style.display = "none"));
      postPropertyButtons.forEach((el) => (el.style.display = "none"));
      return;
    }
  
    try {
      const response = await fetch("https://ouragent.com.ng/user_session/get_user_session.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: clientId }),
      });
  
      const data = await response.json();
      if (data.status === "success" && data.client) {
        greetings.forEach((el) => (el.textContent = `${data.client.fullName.substring(0, 8)}...`));
        loginButtons.forEach((el) => (el.style.display = "none"));
        logoutButtons.forEach((el) => (el.style.display = "inline"));
        postPropertyButtons.forEach((el) => (el.style.display = "inline"));
      } else {
        throw new Error("Invalid session.");
      }
    } catch (error) {
     // console.error("Error loading session:", error);
      greetings.forEach((el) => (el.textContent = "Error loading session."));
    }
  
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
        //  console.error("Error during logout:", error);
        }
      });
    });
  }
  
    
  
    document.addEventListener("DOMContentLoaded", () => {
      document.body.style.display = "block"; // Show body when JS is ready
    });
    
    
  
    document.addEventListener("DOMContentLoaded", () => {
      const loader = document.getElementById("loader");
      const content = document.getElementById("content");
    
      // Show loader immediately
      loader.style.display = "flex";
      content.style.display = "none";
    
      // Delay the execution of heavy JavaScript
      setTimeout(async () => {
        try {
          await loadUserSession(); // Load user session
        } catch (error) {
        //  console.error("Error loading data:", error);
        } finally {
          // Hide loader and show content
          loader.style.display = "none";
          content.style.display = "block";
        }
      }, 100); // 100ms delay to ensure the loader is rendered
    });
    
  
    document.addEventListener("DOMContentLoaded", function () {
      const form = document.getElementById("signup-form");
      const submitButton = document.getElementById("submitButton");
  
      const phoneNumberInput = document.getElementById("phoneNumber");
      const ninNumberInput = document.getElementById("ninNumber");
      const cacNumberInput = document.getElementById("cacNumber");
  
      // Function to set error message
      function setError(elementId, message) {
          const errorElement = document.getElementById(elementId);
          if (errorElement) {
              errorElement.textContent = message;
              errorElement.style.color = "red";
          }
      }
  
      // Function to clear error message
      function clearError(elementId) {
          const errorElement = document.getElementById(elementId);
          if (errorElement) {
              errorElement.textContent = "";
          }
      }
  
      // Realtime input validation
      phoneNumberInput.addEventListener("input", function () {
          const phoneRegex = /^(?:\+234|0)[789][01]\d{8}$/;
          if (!phoneRegex.test(phoneNumberInput.value.trim())) {
              setError("phoneNumber-error", "Invalid phone number format.");
          } else {
              clearError("phoneNumber-error");
          }
      });
  
      ninNumberInput.addEventListener("input", function () {
          const ninRegex = /^\d{11}$/;
          if (!ninRegex.test(ninNumberInput.value.trim())) {
              setError("ninNumber-error", "NIN must be exactly 11 digits.");
          } else {
              clearError("ninNumber-error");
          }
      });
  
      cacNumberInput.addEventListener("input", function () {
          const cacRegex = /^(RC|BN|IT)\d{6,7}$/i;
          if (!cacRegex.test(cacNumberInput.value.trim())) {
              setError("cacNumber-error", "Invalid CAC Number (e.g., RC1234567, BN1234567, IT123456).");
          } else {
              clearError("cacNumber-error");
          }
      });
  
      form.addEventListener("submit", async (event) => {
          event.preventDefault();
  
          // Fetch client ID and email from sessionStorage
          const clientId = sessionStorage.getItem("client_id");
          const email = sessionStorage.getItem("email");
  
          if (!clientId || !email) {
              Swal.fire({
                toast: true,
                position: "top-end",
                  title: "Error",
                  text: "Client information is missing. Please log in first.",
                  icon: "error",
                  showConfirmButton: false,
                  iconColor: "#3085d6",
                  timer: 2000,
                  timerProgressBar: true,
              });
              return;
          }
  
          // Get form values
          const companyName = document.getElementById("companyName").value.trim();
          const address = document.getElementById("address").value.trim();
          const ninNumber = ninNumberInput.value.trim();
          const phoneNumber = phoneNumberInput.value.trim();
          const cacNumber = cacNumberInput.value.trim();
          const socialMediaHandles = document.getElementById("socialMediaHandles").value.trim();
          const password = document.getElementById("password").value.trim();
  
          // Disable submit button to prevent multiple submissions
          submitButton.disabled = true;
          submitButton.textContent = "Submitting...";
  
          // Frontend validation
          let hasError = false;
  
          // Validate phone number
          const phoneRegex = /^(?:\+234|0)[789][01]\d{8}$/;
          if (!phoneRegex.test(phoneNumber)) {
              setError("phoneNumber-error", "Invalid phone number format.");
              hasError = true;
          } else {
              clearError("phoneNumber-error");
          }
  
          // Validate NIN (11 digits)
          const ninRegex = /^\d{11}$/;
          if (!ninRegex.test(ninNumber)) {
              setError("ninNumber-error", "NIN must be exactly 11 digits.");
              hasError = true;
          } else {
              clearError("ninNumber-error");
          }
  
          // Validate CAC number
          const cacRegex = /^(RC|BN|IT)\d{6,7}$/i;
          if (!cacRegex.test(cacNumber)) {
              setError("cacNumber-error", "Invalid CAC Number (e.g., RC1234567, BN1234567, IT123456).");
              hasError = true;
          } else {
              clearError("cacNumber-error");
          }
  
          // Ensure all required fields are filled
          if (!companyName) {
              setError("companyName-error", "Company Name is required.");
              hasError = true;
          } else {
              clearError("companyName-error");
          }
  
          if (!address) {
              setError("address-error", "Address is required.");
              hasError = true;
          } else {
              clearError("address-error");
          }
  
          if (!password || password.length < 8) {
              setError("password-error", "Password must be at least 8 characters.");
              hasError = true;
          } else {
              clearError("password-error");
          }
  
          // Stop submission if errors exist
          if (hasError) {
              submitButton.disabled = false;
              submitButton.textContent = "Register";
              return;
          }
  
          try {
              const response = await fetch("https://ouragent.com.ng/agent_enrollment/agentsignup.php", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
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
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 2000,
                      iconColor: "#3085d6",
                      timerProgressBar: true,
                  });
  
                  setTimeout(() => {
                      window.location.href = "../agent-otp-page/agentotp.html"; // Redirect to OTP page
                  }, 2000);
              } else {
                  Swal.fire({
                      toast: true,
                      title: "Validation Error",
                      text: data.message || "Please check your inputs and try again.",
                      icon: "warning",
                      showConfirmButton: false,
                      timer: 2000,
                      iconColor: "#3085d6",
                      position: "top-end",
                      timerProgressBar: true,
                  });
              }
          } catch (error) {
              console.error("Error:", error);
              Swal.fire({
                  toast: true,
                  title: "Error",
                  text: "An unexpected error occurred. Please try again later.",
                  icon: "error",
                  confirmButtonText: "Retry",
                  confirmButtonColor: "rgba(8, 97, 175, 1)"
              });
          } finally {
              // Re-enable submit button
              submitButton.disabled = false;
              submitButton.textContent = "Register";
          }
      });
  });
  