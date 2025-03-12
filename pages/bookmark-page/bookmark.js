
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
      await fetchAndRenderProperties(); // Fetch properties
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

// Function to fetch and display bookmarks
const fetchBookmarks = async () => {
  const clientId = sessionStorage.getItem("client_id");

  if (!clientId) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title: "Please log in first.",
      showConfirmButton: false,
      timer: 4000,
      iconColor: "#3085d6",
      timerProgressBar: true,
    });
    return;
  }

  try {
    const response = await fetch("https://ouragent.com.ng/bookmark/get_bookmark.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: parseInt(clientId) }),
    });

    const result = await response.json();
    console.log("API Response:", result);

    if (result.status === "success") {
      renderBookmarks(result.data);
    } else {
      document.querySelector(".bookmark-list").innerHTML = `<p class='no-bookmarks'>No bookmarks found.</p>`;
    }
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred while fetching bookmarks.",
      confirmButtonColor: "rgba(8, 97, 175, 1)",
    });
  }
};

// Function to render bookmarks
const renderBookmarks = (bookmarks) => {
  const bookmarkContainer = document.querySelector(".bookmark-list");
  bookmarkContainer.innerHTML = "";

  if (!bookmarks || bookmarks.length === 0) {
    bookmarkContainer.innerHTML = `<p class='no-bookmarks'>You have no bookmarks yet.</p>`;
    return;
  }

  bookmarks.forEach((bookmark) => {
    const bookmarkItem = document.createElement("div");
    bookmarkItem.className = "bookmark-card";

    const propertyImage = bookmark.images?.length > 0 
      ? `https://ouragent.com.ng/${bookmark.images[0]}`
      : "../../images/default-property.png";

    bookmarkItem.innerHTML = `
      <div class="bookmark-card-img">
        <img src="${propertyImage}" alt="Property Image" />
      </div>
      <div class="bookmark-item-details">
        <h3 class="bookmark-item-title">${bookmark.property_name}</h3>
        <p class="bookmark-item-location">Location: ${bookmark.state}, ${bookmark.lga}</p>
        <p class="bookmark-item-price">Price: ₦${bookmark.price}</p>
        <div class="bookmark-item-actions">
          <button class="bookmark-item-action">
            <a href="../property-description/index.html?propertyId=${bookmark.property_id}" class="view">View</a>
          </button>
          <button class="remove-bookmark-btn" data-property-id="${bookmark.property_id}">Remove</button>
        </div>
      </div>
    `;

    bookmarkContainer.appendChild(bookmarkItem);
  });

  attachRemoveBookmarkListeners();
};

// Function to attach event listeners to "Remove Bookmark" buttons
const attachRemoveBookmarkListeners = () => {
  document.querySelectorAll(".remove-bookmark-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const propertyId = event.target.getAttribute("data-property-id");
      await handleBookmark(propertyId, "remove");
    });
  });
};

// Function to handle bookmark actions (add/remove)
const handleBookmark = async (propertyId, action) => {
  const clientId = sessionStorage.getItem("client_id");

  if (!clientId) {
    Swal.fire({
      toast: true,
      icon: "warning",
      title: "Agent not logged in",
      text: "Please log in to manage bookmarks.",
      confirmButtonColor: "#3085d6",
    });
    return;
  }

  try {
    const response = await fetch("https://ouragent.com.ng/bookmark/bookmark.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: parseInt(clientId),
        property_id: parseInt(propertyId),
        action: action,
      }),
    });

    const result = await response.json();
    console.log("API Response:", result); // Debugging to see what the API returns

    if (result.status === "success") {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Bookmark ${action === "add" ? "added" : "removed"} successfully`,
        showConfirmButton: false,
        iconColor: "#3085d6",
        timer: 2000,
        timerProgressBar: true,
      });

      fetchBookmarks(); // Refresh bookmarks list
    } else {
      // Display actual message returned by the API instead of a generic error
      Swal.fire({
        toast: true,
        icon: "error",
        title: "Error",
        text: result.message || "Something went wrong",
        confirmButtonColor: "#3085d6"
      });
    }
  } catch (error) {
    console.error("Error handling bookmark:", error);
    Swal.fire({
      toast: true,
      icon: "error",
      title: "Error",
      text: "Network error.",
      confirmButtonColor: "rgba(8, 97, 175, 1)"
    });
  }
};

// Fetch bookmarks on page load
document.addEventListener("DOMContentLoaded", () => fetchBookmarks());
