document.addEventListener("DOMContentLoaded", () => {
    document.body.style.display = "block"; // Show body when JS is ready
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
  