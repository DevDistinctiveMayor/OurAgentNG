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
    const response = await fetch("https://ouragent.com.ng/get_user_session.php", {
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


// Function to fetch and display bookmarks
const fetchBookmarks = async () => {
    const agentId = sessionStorage.getItem("agent_id"); // Retrieve agent ID from session storage

    if (!agentId) {
        alert("Agent not logged in. Please log in to view bookmarks.");
        return;
    }

    try {
        const response = await fetch("https://ouragent.com.ng/get_bookmark.php", {
            method: "POST", // Use POST if agent_id needs to be sent securely
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                agent_id: parseInt(agentId),
            }),
        });

        const result = await response.json();

        if (result.status === "success" && result.data.length > 0) {
            // Call function to render bookmarks
            renderBookmarks(result.data);
        } else if (result.status === "success" && result.data.length === 0) {
            alert("You have no bookmarks yet.");
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        alert("An error occurred while fetching bookmarks.");
    }
};

// Function to render bookmarks on the page
const renderBookmarks = (bookmarks) => {
    const bookmarkContainer = document.querySelector(".bookmark-list"); // Ensure this container exists on your page
    bookmarkContainer.innerHTML = ""; // Clear existing bookmarks

    bookmarks.forEach((bookmark) => {
        // Create a card or list item for each bookmark
        const bookmarkItem = document.createElement("div");
        bookmarkItem.className = "bookmark-card"; // Add appropriate styling classes
        bookmarkItem.innerHTML = `
            <div class="bookmark-card-img">
                <img src="../../images/ibadan.png" alt="Property Image" />
            </div>
            <div class="bookmark-item-details">
                <h3 class="bookmark-item-title">${bookmark.property_name}</h3>
                <p class="bookmark-item-location">Location: ${bookmark.state, bookmark.lga}</p>
                <p class="bookmark-item-price">Price: ${bookmark.price}</p>
                <div class="bookmark-item-actions">
                    <button class="bookmark-item-action">View</button>
                    <button class="remove-bookmark-btn" data-property-id="${bookmark.property_id}">Remove</button>
                </div>
            </div>
        `;
        bookmarkContainer.appendChild(bookmarkItem);
    });

    // Attach event listeners to "Remove Bookmark" buttons
    const removeButtons = document.querySelectorAll(".remove-bookmark-btn");
    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const propertyId = button.getAttribute("data-property-id");
            handleBookmark(propertyId, "remove"); // Use your existing bookmark handler to remove
        });
    });
};

// Function to handle bookmark actions (add/remove)
const handleBookmark = async (propertyId, action) => {
    const agentId = sessionStorage.getItem("agent_id");

    if (!agentId) {
        alert("Agent not logged in. Please log in to manage bookmarks.");
        return;
    }

    try {
        const response = await fetch("https://ouragent.com.ng/handle_bookmark.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                agent_id: parseInt(agentId),
                property_id: parseInt(propertyId),
                action: action,
            }),
        });

        const result = await response.json();

        if (result.status === "success") {
            alert(`Bookmark ${action === "add" ? "added" : "removed"} successfully.`);
            fetchBookmarks(); // Refresh the bookmarks list
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error("Error handling bookmark:", error);
        alert("An error occurred while managing the bookmark.");
    }
};

// Fetch bookmarks on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchBookmarks();
});