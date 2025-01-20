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


const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get("propertyId");

fetch(
  `https://ouragent.com.ng/get_property_by_id.php?property_id=${propertyId}`
)
  .then((response) => response.json())
  .then((data) => {
    if (data.status === "success") {
      const property = data.data;

      // Set the property title
      document.querySelector(".left-container h1").textContent =
        property.propertyName;

      // Update the carousel images
      const carouselContainer = document.getElementById(
        "propertyDetailsContainer"
      );
      const propertyImagesBox = document.querySelector(".property-images-box");

      // Populate the carousel with property images
      carouselContainer.innerHTML = property.images
        .map(
          (image, index) => `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
                <img src="https://ouragent.com.ng/${image}" alt="Property Image">
            </div>
          `
        )
        .join("");
      initializeCarouselControls();

      // init carousel
      function initializeCarouselControls() {
        const carouselItems = document.querySelectorAll(".carousel-item");
        const prevButton = document.querySelector(".prev");
        const nextButton = document.querySelector(".next");

        let currentIndex = 0;

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

      // Populate the property-images-box with remaining property images
      propertyImagesBox.innerHTML = property.images
        .map(
          (image) => `
            <div>
                <img src="https://ouragent.com.ng/${image}" alt="Property Image">
            </div>
          `
        )
        .join("");

      // Get the carousel inner and items
      // const carouselInner = document.querySelector(".carousel-inner");
      const carouselItems = document.querySelectorAll(".carousel-item");
      const prevButton = document.querySelector(".prev");
      const nextButton = document.querySelector(".next");

      let currentIndex = 0;

      function updateCarousel() {
        const offset = -currentIndex * 100;
        const carouselInner = document.querySelector(".carousel-inner");
       // carouselInner.style.transform = `translateX(${offset}%)`; // Move the carousel
        // Update active class
        carouselItems.forEach((item, index) => {
          item.classList.remove("active");
          if (index === currentIndex) {
            item.classList.add("active");
          }
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

      // Update property details
      document.querySelector(
        ".property-text-details h3"
      ).textContent = `₦${property.price}`;
      document.querySelector(
        ".address-details .location"
      ).innerHTML = `<img src="../../assets/icon/location-icon.png" alt="location icon"> ${property.state}, ${property.lga}`;
      document.querySelector(
        ".address-details .last-updated"
      ).textContent = `Last updated: ${property.created_at}`;

      // Update description
      document.querySelector(".description-box p").textContent =
        property.description;

      // Update agent details (Profile Image, Name, Address, Phone)
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
        ".text-box .year-user"
      ).textContent = `${property.created_at}`;
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
        "\u20A6" + " " + property.price;
      document.querySelector(".search-form-field .maxprice").textContent =
        "\u20A6" + " " + property.price;
      document.querySelector(
        ".search-form-field .bathroom"
      ).textContent = `${property.bathNo}`;
      document.querySelector(
        ".search-form-field .properRef"
      ).textContent = `${property.id}`;
      document.querySelector(
        ".text-box .website"
      ).href = `${property.socialMediaHandles}`;
    } else {
      alert(data.message);
    }
  })
  .catch((error) => {
    console.error("Error fetching property details:", error);
  });

// Function to fetch and display properties
const fetchAndRenderProperties = (queryParams = "") => {
  fetch(`https://ouragent.com.ng/advance_search.php?${queryParams}`)
    .then((response) => response.json())
    .then((data) => {
      propertiesContainer.innerHTML = ""; // Clear existing content

      if (data.status === "success" && data.data.length > 0) {
        data.data.forEach((property) => {
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
              100
            )}...</div>
            <div class="price">&#8358;${property.price}</div>
            <div class="location">
              <div class="location-name">${property.lga}, ${
            property.state
          }</div>
              <div class="view-icon">
                <span class="view">View</span>
                <span class="arrow-icon"> <i class="fa-solid fa-arrow-right-long"></i> </span>
              </div>
            </div>
          </div>
          <div class="img-overlap">
            <span class="status">${property.propertystatus}</span>
            <span class="icon"> <i class="bx bx-bookmark"></i> </span>
          </div>
        </div>


					`;
          propertiesContainer.appendChild(propertyElement);
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

// Fetch all properties initially
fetchAndRenderProperties();
