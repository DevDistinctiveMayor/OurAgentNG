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
      greetings.forEach(
        (el) => (el.textContent = `${data.client.fullName.substring(0, 8)}...`)
      );
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

// Handle image upload independently
document.getElementById("uploadButton").addEventListener("click", () => {
  document.getElementById("imageUpload").click();
});

document
  .getElementById("imageUpload")
  .addEventListener("change", async (event) => {
    const file = event.target.files[0];
    const uploadButton = document.getElementById("uploadButton");
    const agentId = sessionStorage.getItem("agent_id");

    if (file && agentId) {
      const formData = new FormData();
      formData.append("profileImage", file);
      formData.append("agent_id", agentId);

      uploadButton.disabled = true;
      uploadButton.textContent = "Processing...";

      try {
        const response = await fetch(
          "https://ouragent.com.ng/uploadProfileImage.php",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();
        if (result.status === "success") {
          Swal.fire(
            "Success",
            "Profile image updated successfully!",
            "success"
          );
          document.getElementById("profileImage").src =
            result.imageUrl + "?" + new Date().getTime(); // Cache-busting
        } else {
          Swal.fire("Error", result.message || "Image upload failed.", "error");
        }
      } catch (error) {
        Swal.fire(
          "Error",
          "An error occurred while uploading the image.",
          "error"
        );
      } finally {
        uploadButton.disabled = false;
        uploadButton.textContent = "Change Image";
      }
    }
  });

// Handle form submission for profile details (without affecting image upload)
document
  .getElementById("editProfileForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // Retrieve agent_id from sessionStorage
    const agentId = sessionStorage.getItem("agent_id");
    if (!agentId) {
      Swal.fire("Error", "Agent ID not found. Please log in again.", "error");
      return;
    }

    // Gather form data
    const formData = {
      agent_id: agentId,
      fullName: document.getElementById("fullName").value,
      address: document.getElementById("address").value,
      email: document.getElementById("email").value,
      phoneNumber: document.getElementById("phone").value, // Make sure it's phoneNumber in formData
    };

    try {
      // Send data to the PHP API for processing
      const response = await fetch(
        "https://ouragent.com.ng/agentupdateProfile.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Parse the response
      const result = await response.json();

      // Handle success or error response
      if (result.status === "success") {
        Swal.fire(
          "Success",
          "Profile updated successfully! Awaiting admin approval.",
          "success"
        );
      } else {
        Swal.fire(
          "Error",
          result.message || "Profile update failed. Please try again later.",
          "error"
        );
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while updating profile.", "error");
    }
  });

// Fetch and render agent data on page load
document.addEventListener("DOMContentLoaded", () => {
  const agentId = sessionStorage.getItem("agent_id");
  if (agentId) {
    // Call the function to fetch agent dashboard data
    fetchAndRenderDashboard(agentId);
  } else {
    Swal.fire("Error", "Agent ID not found. Please log in again.", "error");
  }
});

// Function to fetch and render agent dashboard data
async function fetchAndRenderDashboard(agentId) {
  try {
    const response = await fetch("https://ouragent.com.ng/agentdashboard.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id: agentId }), // Send agent_id
    });

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    if (data.status === "success") {
      const user = data.data;

      // Render profile image
      const profileImage = document.getElementById("profileImage");
      profileImage.src =
        user.profileImage || "../../images/agent-profile-img.png";

      // Populate the form with existing data
      document.getElementById("fullName").value = user.fullName || "";
      document.getElementById("email").value = user.email || "";
      document.getElementById("phone").value = user.phoneNumber || "";
      document.getElementById("address").value = user.address || "";
    } else {
      Swal.fire("Error", data.message || "Failed to load user data.", "error");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    Swal.fire("Error", "An error occurred while fetching data.", "error");
  }
}
