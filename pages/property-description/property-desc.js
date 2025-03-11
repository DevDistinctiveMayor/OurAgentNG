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
    const response = await fetch(
      "https://ouragent.com.ng/user_session/get_user_session.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: clientId }),
      }
    );

    const data = await response.json();
    if (data.status === "success" && data.client) {
      const fullName = data.client.fullName;
      greetings.forEach(
        (el) => (el.textContent = `${fullName.substring(0, 8)}...`)
      );
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
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.display = "block"; // Show body when JS is ready
});

document.addEventListener("DOMContentLoaded", async () => {
  // document.body.style.display = "none"; // Hide body until data is loaded

  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get("propertyId");

  try {
    const response = await fetch(
      `https://ouragent.com.ng/fetch_properties/get_property_by_id.php?property_id=${propertyId}`
    );
    const data = await response.json();

    if (data.status !== "success") throw new Error(data.message);

    const property = data.data;

    // Set property title
    document.querySelector(".left-container h1").textContent =
      property.propertyName;

    // Populate the carousel
    const carouselContainer = document.getElementById(
      "propertyDetailsContainer"
    );
    carouselContainer.innerHTML = property.images
      .map(
        (image, index) => `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
              <img src="https://ouragent.com.ng/${image}" alt="Property Image">
          </div>
        `
      )
      .join("");

    // Populate property images box
    const propertyImagesBox = document.querySelector(".property-images-box");
    propertyImagesBox.innerHTML = property.images
      .map(
        (image) => `
          <div>
              <img src="https://ouragent.com.ng/${image}" alt="Property Image">
          </div>
        `
      )
      .join("");

    // Update property details
    document.querySelector(
      ".property-text-details h3"
    ).textContent = `₦${property.price}`;
    document.querySelector(
      ".address-details .location"
    ).innerHTML = `<img src="../../assets/icon/location-icon.png" alt="location icon"> ${property.state}, ${property.lga}`;
    document.querySelector(
      ".address-details .last-updated"
    ).textContent = `Last updated: ${formatTime(property.created_at)}`;
    document.querySelector(".description-box p").textContent =
      property.description;

    // Update agent details
    document.querySelector(".agent-name").textContent = property.fullName;
    document.querySelector(
      ".agent-details .profile-pics img"
    ).src = `https://ouragent.com.ng/${property.ProfileImage}`;
    document.querySelector(".text-box .description").textContent =
      property.agentAddress;
    document.querySelector(
      ".search-form-field .location"
    ).textContent = `${property.state}, ${property.lga}`;
    document.querySelector(
      ".text-box .telephone"
    ).textContent = `📞 ${property.phoneNumber}`;
    document.querySelector(
      ".text-box .year-usec"
    ).textContent = `${formatTime(property.created_at)}`;
    document.querySelector(
      ".search-form-field .category"
    ).textContent = `${property.category}`;
    document.querySelector(
      ".search-form-field .type"
    ).textContent = `${property.propertyType}`;
    document.querySelector(
      ".search-form-field .bedroom"
    ).textContent = `${property.roomNo}`;
    document.querySelector(".search-form-field .minprice").textContent =
      "₦ " + property.price;
    document.querySelector(".search-form-field .maxprice").textContent =
      "₦ " + property.price;
    document.querySelector(
      ".search-form-field .bathroom"
    ).textContent = `${property.bathNo}`;
    document.querySelector(
      ".search-form-field .properRef"
    ).textContent = `${property.id}`;
    document.querySelector(
      ".text-box .website"
    ).href = `${property.socialMediaHandles}`;

    // Initialize the carousel
    initializeCarouselControls();

    // Hide loader and show content
    loader.style.display = "none";
    content.style.display = "block";
    // document.body.style.display = "block";
  } catch (error) {
    console.error("Error fetching property details:", error);
    loader.innerHTML = "Failed to load property details. Please try again.";
  }
});


function formatTime(dateString) {
  const timeAgo = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - timeAgo) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} secs ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
}



// Initialize carousel controls
function initializeCarouselControls() {
  const carouselItems = document.querySelectorAll(".carousel-item");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100;
    const carouselInner = document.querySelector(".carousel-track");
    carouselInner.style.transform = `translateX(${offset}%)`;

    carouselItems.forEach((item, index) => {
      item.classList.remove("active");
      if (index === currentIndex) item.classList.add("active");
    });
  }

  prevButton.addEventListener("click", () => {
    currentIndex =
      currentIndex > 0 ? currentIndex - 1 : carouselItems.length - 1;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex =
      currentIndex < carouselItems.length - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  });
}

// Function to fetch and display properties
const fetchAndRenderProperties = (queryParams = "") => {
  fetch(`https://ouragent.com.ng/search_property/advance_search.php?${queryParams}`)
    .then((response) => response.json())
    .then((data) => {
      propertiesContainer.innerHTML = ""; // Clear existing content

      if (data.status === "success" && data.data.length > 0) {
        data.data.slice(0, 4).forEach((property) => {
          const propertyElement = document.createElement("div");
          propertyElement.className = "house-card";
          propertyElement.innerHTML = `
            <div class="featured-container">
              <div class="house-card">
                <img class="img" src="https://ouragent.com.ng/${
                  property.images[0]
                }" alt="Property Image">
                <div class="details">
                  <div class="description">${property.description.substring(
                    0,
                    26
                  )}...</div>
                  <div class="price">&#8358;${property.price}</div>
                  <div class="location">
                    <div class="location-name">${property.lga}, ${
            property.state
          }</div>
                    <div class="view-icon">
                      <span>
                        <a href="../property-description/index.html?propertyId=${
                          property.id
                        }" class="view">View</a>
                      </span>
                      <span class="arrow-icon"> 
                        <i class="fa-solid fa-arrow-right-long"></i> 
                      </span>
                    </div>
                  </div>
                </div>
                <div class="img-overlap">
                  <span class="status">${property.propertystatus}</span>
                  <span class="icon">
                    <i class="fa-bookmark bookmark-btn fa-regular"
                    data-property-id="${property.id}" 
                    data-agent-id="${property.client_id}"></i>
                  </span>
                </div>
              </div>
            </div>
          `;
          propertiesContainer.appendChild(propertyElement);
        });

        // Load bookmarks and attach event listeners
        loadBookmarks().then(() => attachBookmarkListeners());
      } else {
        propertiesContainer.innerHTML = `<p>${
          data.message || "No properties found."
        }</p>`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      propertiesContainer.innerHTML = `<p>An error occurred while fetching properties.</p>`;
    });
};

// Fetch all properties initially
fetchAndRenderProperties();

// Load Bookmarks
async function loadBookmarks() {
  const clientId = sessionStorage.getItem("client_id");
  if (!clientId) return;

  try {
    const response = await fetch(
      `https://ouragent.com.ng/get_bookmark_button.php?client_id=${clientId}`
    );
    const result = await response.json();

    if (result.status === "success") {
      result.bookmarked.forEach((propertyId) => {
        const bookmarkIcon = document.querySelector(
          `.bookmark-btn[data-property-id="${propertyId}"]`
        );
        if (bookmarkIcon) {
          bookmarkIcon.classList.add("fa-solid", "bookmarked");
          bookmarkIcon.classList.remove("fa-regular");
        }
      });
    }
  } catch (error) {
    console.error("Error loading bookmarks:", error);
  }
}

// Handle Bookmark Action
async function handleBookmark(propertyId, action) {
  const clientId = sessionStorage.getItem("client_id");
  if (!clientId) {
    alert("Please log in first.");
    return false;
  }

  try {
    const response = await fetch("https://ouragent.com.ng/bookmark.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: parseInt(clientId),
        property_id: parseInt(propertyId),
        action,
      }),
    });

    const result = await response.json();
    if (result.status === "success") {
      const actionMessage =
        action === "add"
          ? "Property bookmarked successfully!"
          : "Property removed from bookmarks!";
      showToast(actionMessage, "success");
      return true;
    } else {
      alert(result.message);
      return false;
    }
  } catch (error) {
    console.error("Error during bookmark action:", error);
    showToast("An error occurred while processing your request.", "error");
    return false;
  }
}

// Show Toast Notification
function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000); // Remove toast after 3 seconds
}

// Attach Event Listeners to Bookmark Buttons
function attachBookmarkListeners() {
  document.querySelectorAll(".bookmark-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const propertyId = button.getAttribute("data-property-id");
      const isBookmarked = button.classList.contains("bookmarked");
      const action = isBookmarked ? "remove" : "add";

      if (await handleBookmark(propertyId, action)) {
        button.classList.toggle("bookmarked", action === "add");
        button.classList.toggle("fa-solid", action === "add");
        button.classList.toggle("fa-regular", action === "remove");
      }
    });
  });
}

const fetchSoldProperties = () => {
  fetch("https://ouragent.com.ng/sold_property.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      const propertiesContainer = document.getElementById("propertiesSold");
      propertiesContainer.innerHTML = ""; // Clear existing content

      if (data.status === "success" && data.properties.length > 0) {
        data.properties.slice(0, 4).forEach((property) => {
          const propertyElement = document.createElement("div");
          propertyElement.className = "house-card";
          propertyElement.innerHTML = `
            <div class="featured-container">
              <div class="house-card">
                <img class="img" src="${
                  property.images[0] ||
                  "https://ouragent.com.ng/images/featured_image.png"
                }" alt="Property Image">
                <div class="details">
                  <div class="description">${property.description.substring(
                    0,
                    25
                  )}...</div>
                  <div class="price">&#8358;${property.price}</div>
                  <div class="location">
                    <div class="location-name">${property.lga}, ${
            property.state
          }</div>
                    <div class="view-icon">
                      <span>
                      <a href="../property-description/index.html?propertyId=${
                        property.id
                      }" class="view">View</a>
                      </span>
                      <span class="arrow-icon">
                        <i class="fa-solid fa-arrow-right-long"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="img-overlap">
                  <span class="status">${property.propertystatus}</span>
                </div>
              </div>
            </div>
          `;
          propertiesContainer.appendChild(propertyElement);
        });
      } else {
        propertiesContainer.innerHTML = `<p>${
          data.message || "No sold properties found."
        }</p>`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      const propertiesContainer = document.getElementById("propertiesSold");
      propertiesContainer.innerHTML = `<p>An error occurred while fetching properties.</p>`;
    });
};

// Call the function when the D
document.addEventListener("DOMContentLoaded", fetchSoldProperties);

document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackMessage = document.getElementById("feedbackMessage");
  const feedbackResponse = document.getElementById("feedbackResponse");
  const submitButton = document.getElementById("submitFeedback");

  feedbackForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form reload

    const agentId = sessionStorage.getItem("agent_id") || "guest"; // Use stored agent ID or 'guest'
    const feedbackText = feedbackMessage.value.trim();

    if (!feedbackText) {
      return showMessage("Please enter your feedback.", "error");
    }

    // Prepare data for API
    const formData = {
      agent_id: agentId,
      feedback: feedbackText,
    };

    // Disable button to prevent multiple clicks
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    try {
      const response = await fetch(
        "https://ouragent.com.ng/submit_feedback.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        showMessage(result.message, "success");
        feedbackMessage.value = ""; // Clear textarea
      } else {
        showMessage(result.message, "error");
      }
    } catch (error) {
      showMessage("An error occurred. Please try again.", "error");
      console.error(error);
    }

    // Re-enable button after response
    submitButton.disabled = false;
    submitButton.textContent = "Submit Feedback";
  });

  // Function to show messages
  function showMessage(message, type) {
    feedbackResponse.textContent = message;
    feedbackResponse.style.color = type === "success" ? "green" : "red";
    feedbackResponse.style.display = "block";

    setTimeout(() => {
      feedbackResponse.style.display = "none";
    }, 4000);
  }
});
