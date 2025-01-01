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
                window.location.href = "../post-property-page/post-property.html";
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
            console.error("Fetch Error:", error.message);
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
