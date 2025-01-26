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
  }, 500);
}

// Auto-slide function
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    scrollCarousel("right");
  }, 3000); // Every 3 seconds
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
      "https://ouragent.com.ng/get_user_session.php",
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




// Dynamically fetch and render properties on page load
const fetchAndRenderProperties = (queryParams = "") => {
  const propertiesContainer = document.getElementById("properties");

  fetch(`https://ouragent.com.ng/advance_search.php?${queryParams}`)
    .then((response) => response.json())
    .then((data) => {
      propertiesContainer.innerHTML = ""; // Clear existing content

      if (data.status === "success" && data.data.length > 0) {
        data.data.forEach((property, index) => {
          if (index < 4) {
            const propertyElement = document.createElement("div");
            propertyElement.className = "property-card";
            propertyElement.innerHTML = `
              <div class="container">
                <div class="house-card">
                  <div class="img"> 
                    <img src="https://ouragent.com.ng/${property.images[0]}" alt="">
                  </div>
                  <div class="details">
                    <div class="description">${property.description.substring(
                      0,
                      26
                    )}</div>
                    <div class="price">${property.price}</div>
                    <div class="location">
                      <div class="location-name">${property.state}, ${property.lga}</div>
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
                    <span class="status">${property.propertystatus}</span>
                    // <span class="icon">
                    //   <i class="fa-regular fa-bookmark" 
                    //      onclick="handleBookmark(${property.id}, 'add')"></i>
                    // </span>
                    <button onclick="console.log('Property ID:', ${property.agent_id}, 'add')">Bookmark</button>
<button onclick="console.log('Property ID:', ${property.id})">Test</button>

                  </div>
                </div>
              </div>
            `;
            propertiesContainer.appendChild(propertyElement);
          }
        });
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


// Function to handle bookmarking actions
const handleBookmark = async (agentId, propertyId, action = "add") => {
  if (!agentId || !propertyId) {
    alert("Agent ID or Property ID is missing!");
    return;
  }

  const formData = new FormData();
  formData.append("agent_id", agentId);
  formData.append("property_id", propertyId);
  formData.append("action", action);

  try {
    const response = await fetch("https://ouragent.com.ng/bookmark.php", {
      method: "POST",
      body: formData,
      body: JSON.stringify({ property_id: propertyId }),
    });

    const result = await response.json();
    if (result.status === "success") {
      alert(result.message);
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error during bookmark action:", error);
    alert("An error occurred while processing your request.");
  }
};

// Attach event listeners to bookmark buttons
const attachBookmarkListeners = () => {
  const bookmarkButtons = document.querySelectorAll(".bookmark-btn");

  bookmarkButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const propertyId = button.getAttribute("data-property-id");
      const agentId = getAgentId(); // Fetch the agent ID dynamically
      handleBookmark(agentId, propertyId);
    });
  });
};


// Initialize properties on page load
fetchAndRenderProperties();
