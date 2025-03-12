
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
        console.error("Error loading data:", error);
      } finally {
        // Hide loader and show content
        loader.style.display = "none";
        content.style.display = "block";
      }
    }, 100); // 100ms delay to ensure the loader is rendered
  });
  

  
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
      console.error("Error loading session:", error);
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
          console.error("Error during logout:", error);
        }
      });
    });
  }
  




document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    const submitButton = document.getElementById("submitButton");

        // Disable the button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

    try {
        const response = await fetch("https://ouragent.com.ng/contact/contact_us.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        Swal.fire({
            toast: true,
            icon: result.status === "success" ? "success" : "error",
            title: result.message,
            position: "top-end",
            timer: 3000,
            timerProgressBar: true,
            iconColor: "rgba(8, 97, 175, 1)",
            showConfirmButton: false
        });

    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            toast: true,
            icon: "error",
            title: "Something went wrong!",
            position: "top-end",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    } finally {
        // Re-enable the button and remove loading state
        submitButton.disabled = false;
        submitButton.textContent = "Success!";
      }
});
