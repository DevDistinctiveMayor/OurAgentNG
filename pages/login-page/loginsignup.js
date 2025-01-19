// Navbar toggle

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
  
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const keepMeLoggedIn = document.getElementById("keep-me").checked;
      const submitButton = document.getElementById("submitButton"); // Get the button with ID 'submitButton'
      const responseMessage = document.getElementById("responseMessage"); // Where you display error messages
  
      // Utility function to set error messages
      const setError = (elementId, message) => {
        const element = document.getElementById(elementId);
        if (element) {
          element.textContent = message; // Display error message
        } else {
          console.warn(`Element with ID "${elementId}" not found.`);
        }
      };
  
      // Clear previous error messages
      setError("email-error", "");
      setError("password-error", "");
  
      // Disable the button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = "Processing...";
  
      try {
        const response = await fetch("https://ouragent.com.ng/signin.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to connect to server.");
        }
  
        const data = await response.json();

          // Save login state
          if (data.status === "success") {
            const userData = {
              client_id: data.client_id,
              token: data.token,
            };
          
            // Store client_id in sessionStorage
            sessionStorage.setItem("client_id", data.client_id);
          
            // Save login state for future use
            if (keepMeLoggedIn) {
              localStorage.setItem("user", JSON.stringify(userData));
            } else {
              sessionStorage.setItem("user", JSON.stringify(userData));
            }
     
            // Redirect to the dashboard or home page
           window.location.href = "../../index.html"; // Example redirection
          }
           else {
          // Display validation errors
          if (data.errors) {
            if (data.errors.email) setError("email-error", data.errors.email);
            if (data.errors.password) setError("password-error", data.errors.password);
          } else {
            setError("email-error", data.message || "Login failed.");
          }
        }
      } catch (error) {
        console.error("Fetch Error:", error.message);
        setError("email-error", "An error occurred. Please try again.");
      } finally {
        // Re-enable the button and remove loading state
        submitButton.disabled = false;
        submitButton.textContent = "Login"; // Reset button text
      }
    };

    // Clear previous error messages
    setError("email-error", "");
    setError("password-error", "");

    // Disable the button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Processing...";
    //submitButton.classList.add("loading");  // Add loading class

    try {
      const response = await fetch("https://ouragent.com.ng/signin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        // console.error("HTTP Error:", response.status, response.statusText);
        throw new Error("Failed to connect to server.");
      }

      const data = await response.json();

      if (data.status === "success") {
        // Save login state
        const userData = {
          email: data.email,
          token: data.token,
        };

        if (keepMeLoggedIn) {
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          sessionStorage.setItem("user", JSON.stringify(userData));
        }

        // Redirect to the dashboard or home page
        window.location.href = "../agent-profile/agent-profile.html";
      } else {
        // Display validation errors
        if (data.errors) {
          if (data.errors.email) setError("email-error", data.errors.email);
          if (data.errors.password)
            setError("password-error", data.errors.password);
        } else {
          setError("email-error", data.message || "Login failed.");
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
      setError("email-error", "An error occurred. Please try again.");
    } finally {
      // Re-enable the button and remove loading state
      submitButton.disabled = false;
      submitButton.textContent = "Login"; // Remove loading class
    }
  });
  
  document.addEventListener("DOMContentLoaded", async () => {
    const clientId = sessionStorage.getItem("client_id");
    if (!clientId) {
      //   alert("Client ID is missing. Please log in again.");
      return;
    }
    // Fetch client data using the provided client ID
    await fetchClientData(
      clientId,
      "https://ouragent.com.ng/get_user_session.php"
    );
  });
  
  async function fetchClientData(clientId, url) {
    const greeting = document.getElementById("greeting");
    const greeting_mobile = document.getElementById("greeting_mobile");
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
      //console.log("Server Response:", data); // Debugging line
  
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
  
