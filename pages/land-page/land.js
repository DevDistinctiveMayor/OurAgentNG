const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});

document.addEventListener("DOMContentLoaded", () => {
  let selectedBedrooms = 0;
  let selectedPropertyType = "";

  const propertiesContainer = document.getElementById("properties");
  const cancelButton = document.getElementById("cancelFilter");
  const toggleButton = document.getElementById("toggleFilter");
  const filterContainer = document.querySelector(".advance-filter-container");
  const body = document.body;

  // Function to fetch and display properties
  const fetchAndRenderProperties = (queryParams = "") => {
    fetch(`https://ouragent.com.ng/advance_searchland.php?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        propertiesContainer.innerHTML = ""; // Clear existing content

        if (data.status === "success" && data.data.length > 0) {
          data.data.forEach((property) => {
            const propertyElement = document.createElement("div");
            propertyElement.className = "property-card";
            propertyElement.innerHTML = `
              <div class="featuredbox-container">
                <div class="card">
                  <div class="image-box">
                    <img src="https://ouragent.com.ng/${
                      property.images[0]
                    }" alt="Property Image">
                  </div>
                  <div class="text-box">
                    <div class="first-box">
                      <p class="heading">${property.propertyName}</p>
                      <p class="location">${property.location}</p>
                      <p class="description">${property.description.substring(
                        0,
                        100
                      )}...</p>
                      <p class="details-link">
                        <a href="#">Property Details &#10142;</a>
                      </p>
                      <p class="agent-profile">
                        <p alt="Agent Name" class="agent-profile">Agent Name</p>
                        <b class="agent-name">${property.fullName}</b>
                      </p>
                    </div>
                    <div class="second-box">
                      <div class="top-box">
                        <div class="price">
                          <p>&#8358;${property.price}</p>
                          <i class="bx bx-bookmark i"></i>
                        </div>
                        <p class="availability">${property.roomNo} Bed ${
                        property.bathNo
                        } Baths</p>
                      </div>
                    <div class="bottom-box">
                        <a href="tel:${property.phoneNumber}" class="call-link"><i class='bx bxs-phone'></i> Call</a>
                        <a href="${
                          property.socialMediaHandles
                        }" class="whatsapp-link"><i class='bx bxl-whatsapp' value=""></i></a>
                      </div>
                    </div>
                    </div>
                  </div>
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

  // Event listener for toggle filter button
  toggleButton.addEventListener("click", () => {
    filterContainer.classList.toggle("show");
    body.classList.toggle("overlay-active");
  });

  // Event listener for cancel filter button
  cancelButton.addEventListener("click", () => {
    filterContainer.classList.remove("show");
    body.classList.remove("overlay-active");
  });

  // Event listener for bedrooms selection
  document.querySelectorAll(".row-select-box a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      selectedBedrooms = e.target.dataset.bedroom || 0;
      document
        .querySelectorAll(".row-select-box a")
        .forEach((el) => el.classList.remove("selected"));
      e.target.classList.add("selected");
    });
  });

  // Event listener for property type selection
  document.querySelectorAll(".row-display-container a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      selectedPropertyType = e.target.dataset.type || "";
      document
        .querySelectorAll(".row-display-container a")
        .forEach((el) => el.classList.remove("selected"));
      e.target.classList.add("selected");
    });
  });

  // Event listener for location input
  const locationInput = document.getElementById("location");

  // Reset filters
  document.getElementById("resetFilter").addEventListener("click", () => {
    document.getElementById("category").value = "";
    locationInput.value = "";
    selectedBedrooms = 0;
    selectedPropertyType = "";

    document
      .querySelectorAll(".row-select-box a, .row-display-container a")
      .forEach((el) => el.classList.remove("selected"));
    fetchAndRenderProperties(); // Fetch all properties again
  });

  // Apply filters when clicking "Apply Filter"
  document.getElementById("applyFilter").addEventListener("click", (e) => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const location = locationInput.value;

    // Build query parameters
    const queryParams = new URLSearchParams({
      ...(category && { category }),
      ...(location && { location }),
      ...(selectedBedrooms > 0 && { bedrooms: selectedBedrooms }),
      ...(selectedPropertyType && { propertyType: selectedPropertyType }),
    }).toString();

    // Fetch filtered properties
    fetchAndRenderProperties(queryParams);

    // Close filter container and remove overlay
    filterContainer.classList.remove("show");
    body.classList.remove("overlay-active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const propertiesContainer = document.getElementById("properties");
  const locationSearch = document.getElementById("locationSearch");

  // Function to fetch and display properties
  const fetchAndRenderProperties = (queryParams = "") => {
    fetch(`https://ouragent.com.ng/advance_searchland.php?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        propertiesContainer.innerHTML = ""; // Clear existing content

        if (data.status === "success" && data.data.length > 0) {
          data.data.forEach((property) => {
            const propertyElement = document.createElement("div");
            propertyElement.className = "property-card";
            propertyElement.innerHTML = `
              <div class="featuredbox-container">
                <div class="card">
                  <div class="image-box">
                    <img src="https://ouragent.com.ng/${
                      property.images[0]
                    }" alt="Property Image">
                  </div>
                  <div class="text-box">
                    <div class="first-box">
                      <p class="heading">${property.propertyName}</p>
                      <p class="location">${property.location}</p>
                      <p class="description">${property.description.substring(
                        0,
                        100
                      )}...</p>
                      <p class="details-link">
                        <a href="#">Property Details &#10142;</a>
                      </p>
                      <p class="agent-profile">
                        <p alt="Agent Name" class="agent-profile">Agent Name</p>
                        <b class="agent-name">${property.fullName}</b>
                      </p>
                    </div>
                    <div class="second-box">
                      <div class="top-box">
                        <div class="price">
                          <p>&#8358;${property.price}</p>
                          <i class="bx bx-bookmark i"></i>
                        </div>
                        <p class="availability">${property.roomNo} Bed ${
              property.bathNo
            } Baths</p>
                      </div>
                      <div class="bottom-box">
                        <a href="#" class="call-link"><i class='bx bxs-phone'>${
                          property.phoneNumber
                        }</i> Call</a>
                        <a href="#" class="whatsapp-link"><i class='bx bxl-whatsapp'>${
                          property.socialMediaHandles
                        }</i></a>
                      </div>
                    </div>
                  </div>
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

  // Event listener for location input (as-you-type filtering)
  locationSearch.addEventListener("input", () => {
    const location = locationSearch.value.trim(); // Get the current value of the input field

    // Build query parameters
    const queryParams = new URLSearchParams({
      ...(location && { location }), // Only include location if it has a value
    }).toString();

    // Fetch and render properties dynamically
    fetchAndRenderProperties(queryParams);
  });
});
