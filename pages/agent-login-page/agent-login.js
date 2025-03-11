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
    const response = await fetch("https://ouragent.com.ng/get_user_session.php", {
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
          // console.error("Logout failed.");
        }
      } catch (error) {
        // console.error("Error during logout:", error);
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
        // console.error("Error loading data:", error);
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

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const password = document.getElementById("password").value.trim();
        const email = document.getElementById("email").value.trim(); // Optional if email is used only for login
        const keepMeLoggedIn = document.getElementById("keep-me").checked;
        const submitButton = document.getElementById("submitButton");

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
        setError("email-error", "");
        setError("password-error", "");

        // Disable the button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = "Processing...";

        try {
            const response = await fetch("https://ouragent.com.ng/agentsignin.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email, // Assuming email is required for login
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to connect to server.");
            }

            const data = await response.json();

            if (data.status === "success") {
                const userData = {
                    agent_id: data.agent_id, // Store agent_id instead of email
                    token: data.token, // Optional: store token for session management
                };

                // Save login state
                if (keepMeLoggedIn) {
                    localStorage.setItem("user", JSON.stringify(userData));
                } else {
                    sessionStorage.setItem("user", JSON.stringify(userData));
                }

                // Redirect to the dashboard
                sessionStorage.setItem("agent_id", data.agent_id);
                window.location.href = "../agent-profile/agent-profile.html";
            } else {
                // Display validation errors
                if (data.errors) {
                    if (data.errors.email) setError("email-error", data.errors.email);
                    if (data.errors.password) setError("password-error", data.errors.password);
                } else {
                    setError("email-error", data.message || "Login failed.");
                }
            }
        } catch (error) {
            // console.error("Fetch Error:", error.message);
            setError("email-error", "An error occurred. Please try again.");
        } finally {
            // Re-enable the button and reset text
            submitButton.disabled = false;
            submitButton.textContent = "Login";
        }
    });

    // Redirect to dashboard if user is already logged in
    // const sessionUser = sessionStorage.getItem("user");
    // if (sessionUser) {
    //     window.location.href = "../agent-profile/agent-profile.html";
    // }
});
