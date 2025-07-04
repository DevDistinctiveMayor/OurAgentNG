// window.onload = function() {
//   document.getElementById("preloader").style.display = "none";
//   document.getElementById("content").style.display = "block";
// };

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.display = "block"; // Show body when JS is ready
});

const carouselTrack = document.querySelector(".carousel-track");
const carouselItems = Array.from(document.querySelectorAll(".carousel-item"));
let currentIndex = 0;
let autoSlideInterval;
let itemWidth;

// Clone the first and last few items for seamless infinite scrolling
const clonesAtStart = carouselItems
  .slice(-4)
  .map((item) => item.cloneNode(true));
const clonesAtEnd = carouselItems
  .slice(0, 4)
  .map((item) => item.cloneNode(true));

clonesAtStart.forEach((clone) => carouselTrack.prepend(clone));
clonesAtEnd.forEach((clone) => carouselTrack.append(clone));

// Update carousel items after cloning
const allItems = Array.from(carouselTrack.children);
const totalItems = allItems.length;

// Function to update item width dynamically
function updateItemWidth() {
  itemWidth = carouselItems[0].offsetWidth + 20; // Include gap
  carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

updateItemWidth();

// Scroll carousel function
function scrollCarousel(direction = "right") {
  if (direction === "right") {
    currentIndex++;
  } else if (direction === "left") {
    currentIndex--;
  }

  carouselTrack.style.transition = "transform 0.5s ease-in-out";
  carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  // Handle infinite scroll
  setTimeout(() => {
    if (currentIndex >= totalItems - 4) {
      currentIndex = 4;
      carouselTrack.style.transition = "none";
      carouselTrack.style.transform = `translateX(-${
        currentIndex * itemWidth
      }px)`;
    } else if (currentIndex < 4) {
      currentIndex = totalItems - 8;
      carouselTrack.style.transition = "none";
      carouselTrack.style.transform = `translateX(-${
        currentIndex * itemWidth
      }px)`;
    }
  }, 3000);
}

// Auto-slide function
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    scrollCarousel("right");
  }, 5000); // Every 3 seconds
}

// Stop auto-slide function
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Recalculate item width on window resize
window.addEventListener("resize", () => {
  updateItemWidth();
});

// Start auto-slide on page load
startAutoSlide();

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

document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  try {
    await fetchAndRenderProperties(); // Fetch properties
    await loadBookmarks(); // Load bookmarks
    // await greetings(); // Load greetings
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    loader.style.display = "none"; // Hide loader
    content.style.display = "block"; // Show content
  }
});

// Fetch and Render Properties
async function fetchAndRenderProperties(queryParams = "") {
  const propertiesContainer = document.getElementById("properties");
  propertiesContainer.innerHTML = "Loading properties...";

  try {
    const response = await fetch(
      `https://ouragent.com.ng/search_property/advance_search.php?${queryParams}`
    );
    const data = await response.json();
    propertiesContainer.innerHTML = ""; // Clear placeholder text

    if (data.status === "success" && data.data.length > 0) {
      data.data.slice(0, 4).forEach((property) => {
        const propertyElement = document.createElement("div");
        propertyElement.className = "property-card";
        propertyElement.innerHTML = `
                  <div class="container">
                  
                      <div class="house-card">
                          <div class="img">
                              <img src="https://ouragent.com.ng/${
                                property.images[0]
                              }" alt="Property Image">
                          </div>
                          <div class="details">
                              <div class="description">${property.description.substring(
                                0,
                                26
                              )}</div>
                              <div class="price">₦${property.price}</div>
                              <div class="location">
                                  <div class="location-name">${
                                    property.state
                                  }, ${property.lga}</div>
                                  <div class="view-icon">
                                      <span>
                                          <a href="./pages/property-description/index.html?propertyId=${
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
                              <span class="status">${
                                property.propertystatus
                              }</span>
                              <span class="icon">
                                  <i class="fa-bookmark bookmark-btn ${
                                    property.bookmarked
                                      ? "fa-solid bookmarked"
                                      : "fa-regular"
                                  }"
                                     data-property-id="${
                                       property.id
                                     }" data-agent-id="${
          property.client_id
        }"></i>
                              </span>
                          </div>
                      </div>
                  </div>
              `;
        propertiesContainer.appendChild(propertyElement);
      });
      attachBookmarkListeners();
    } else {
      propertiesContainer.innerHTML = `<p>${
        data.message || "No properties found."
      }</p>`;
    }
  } catch (error) {
    console.error("Error fetching properties:", error);
    propertiesContainer.innerHTML =
      "<p>An error occurred while fetching properties.</p>";
  }
}

// Load Bookmarks
async function loadBookmarks() {
  const clientId = sessionStorage.getItem("client_id");
  if (!clientId) return;

  try {
    const response = await fetch(
      `https://ouragent.com.ng/bookmark/get_bookmark_button.php?client_id=${clientId}`
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
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title: "Please log in first.",
      showConfirmButton: false,
      timer: 3000, // Auto close after 3 seconds
      timerProgressBar: true,
    });
    return false;
  }

  try {
    const response = await fetch(
      "https://ouragent.com.ng/bookmark/bookmark.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: parseInt(clientId),
          property_id: parseInt(propertyId),
          action,
        }),
      }
    );

    const result = await response.json();
    if (result.status === "success") {
      // Add "remove" message to the toast if action is success
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
    // Display error toast
    showToast("An error occurred while processing your request.", "error");
    return false;
  }
}

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

document.addEventListener("mouseleave", function (event) {
  if (event.clientY <= 0 && !localStorage.getItem("exitFeedbackGiven")) {
    document.getElementById("exitPopup").style.display = "flex";
  }
});

function closePopup() {
  document.getElementById("exitPopup").style.display = "none";
}

async function submitFeedback() {
  let feedbackText = document.getElementById("feedbackText");
  let submitBtn = document.querySelector(".submitFeedback");
  let feedback = feedbackText.value.trim();

  if (feedback === "") {
    showMessage("Please enter feedback before submitting.", "error");
    return;
  }

  // Get agent_id from localStorage or use "Guest"
  let agent_id = localStorage.getItem("agent_id") || "Guest";

  // Change button text and disable it
  submitBtn.textContent = "Submitting...";
  submitBtn.disabled = true;

  try {
    let response = await fetch(
      "https://ouragent.com.ng/feedback/submit_feedback.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ agent_id, feedback }),
      }
    );

    let result = await response.json();

    if (result.status === "success") {
      showMessage(result.message, "success");
      feedbackText.value = ""; // Clear textarea
      localStorage.setItem("exitFeedbackGiven", "true"); // Prevent future popups
      closePopup();
    } else {
      showMessage(result.message, "error");
    }
  } catch (error) {
    showMessage("An error occurred. Please try again.", "error");
    console.error(error);
  } finally {
    // Restore button state after request completes
    submitBtn.textContent = "Submit Feedback";
    submitBtn.disabled = false;
  }
}

// Show feedback message
function showMessage(message, type) {
  let messageBox = document.getElementById("messageBox");

  if (!messageBox) {
    messageBox = document.createElement("div");
    messageBox.id = "messageBox";
    document.body.appendChild(messageBox);
  }

  messageBox.textContent = message;
  messageBox.className = `message-box ${type}`;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 3000);
}
