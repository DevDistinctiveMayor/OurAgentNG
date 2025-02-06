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
     // await fetchAndRenderDashboard(); // Fetch and render agent data on page load
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

  document.addEventListener("DOMContentLoaded", () => {
    const agentId = sessionStorage.getItem("agent_id");
    if (!agentId) {
        return showError("Agent ID not found. Please log in again.");
    }

    fetchAndRenderDashboard(agentId); // Load agent details on page load

    document.getElementById("editProfileForm").addEventListener("submit", (e) => {
        e.preventDefault();
        updateProfile(agentId);
    });

    document.getElementById("editEmailForm").addEventListener("submit", (e) => {
        e.preventDefault();
        updateEmail(agentId);
    });
});

// Function to update agent profile
async function updateProfile(agentId) {
    const formData = {
        agent_id: agentId,
        fullName: getValue("fullName"),
        phoneNumber: getValue("phone"),
        address: getValue("address"),
    };

    if (!formData.fullName || !formData.phoneNumber || !formData.address) {
        return showError("All fields are required.");
    }

    await sendRequest("https://ouragent.com.ng/agentupdateProfile.php", formData, "Profile updated initiated successfully! Please wait for admin approval", () => {
      window.location.href = "../agent-profile/agent-profile.html"; 

    });
}

// Function to update email
async function updateEmail(agentId) {
    const formData = {
        agent_id: agentId,
        new_email: getValue("email"),
    };

    if (!formData.new_email) {
        return showError("Please enter a valid email.");
    }

    await sendRequest("https://ouragent.com.ng/change_email.php", formData, "A verification link has been sent to your new email.");
}

// Function to send API requests
async function sendRequest(url, data, successMessage, callback) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.status === "success") {
            Swal.fire({ title: "Success", text: successMessage, icon: "success" }).then(callback || (() => {}));
        } else {
            showError(result.message || "An error occurred.");
        }
    } catch (error) {
        showError("An error occurred. Please try again.");
        console.error(error);
    }
}

// Function to fetch and render agent dashboard data
async function fetchAndRenderDashboard(agentId) {
    try {
        const response = await fetch("https://ouragent.com.ng/agentdashboard.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ agent_id: agentId }),
        });

        const data = await response.json();
        if (data.status === "success") {
            const user = data.data;
            setValue("fullName", user.fullName);
            setValue("email", user.email);
            setValue("phone", user.phoneNumber);
            setValue("address", user.address);
            document.getElementById("profileImage").src = user.profileImage || "../../images/agent-profile-img.png";
        } else {
            showError("Failed to load user data.");
        }
    } catch (error) {
        showError("An error occurred while fetching data.");
        console.error(error);
    }
}

// Utility functions
function getValue(id) {
    return document.getElementById(id).value.trim();
}

function setValue(id, value) {
    document.getElementById(id).value = value || "";
}

function showError(message) {
    Swal.fire({ title: "Error", text: message, icon: "error" });
}
