const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});
const cancelButton = document.getElementById('cancelFilter');
const toggleButton = document.getElementById('toggleFilter');
const filterContainer = document.querySelector('.advance-filter-container');
const body = document.body;

toggleButton.addEventListener('click', () => {
  filterContainer.classList.toggle('show'); // Toggles the "show" class
  body.classList.toggle('overlay-active'); // Prevents body scrolling
});

cancelButton.addEventListener('click', () => {
  filterContainer.classList.remove('show'); // Hide filter container
  body.classList.remove('overlay-active'); // Enable body scrolling
});

fetch('https://ouragent.com.ng/getland_property.php')
  .then((response) => response.json())
  .then((data) => {
    if (data.status === 'success') {
      const propertiesContainer = document.getElementById('properties');
      propertiesContainer.innerHTML = ''; // Clear existing content

      data.data.forEach((property) => {
        // Create property card element
        const propertyElement = document.createElement('div');
        propertyElement.className = 'property-card';
        propertyElement.innerHTML = `
        <div class="featuredbox-container" >
        <div class="card">
          <div class="image-box">
                <img src="https://ouragent.com.ng/${property.images[0]}" alt="Property Image">
          </div>
          <div class="text-box">
            <div class="first-box">
              <p class="heading">${property.propertyName}</p>
              <p class="location">${property.location}</p>
              <p class="description">${property.description.substring(0, 100)}...</p>
              <p class="details-link">
                <a href="#">Property Details &#10142;</a>
              </p>
              <p class="agent-profile">
                <p alt="Agent Name" class="agent-profile">Agent Name</p>
                <b class="agent-name">${property.agentName}</b>
              </p>
            </div>

            <div class="second-box">
              <div class="top-box">
                  <div class="price">
                                    <p >&#8358;${property.price}</p>
                    <i class="bx bx-bookmark i"></i>
                  </div>

                <p class="availability">${property.roomNo} Bed ${property.bathNo} Baths</p>
              </div>
              <div class="bottom-box">
                <a href="#" class="call-link"><i class='bx bxs-phone'></i> Call</a>
                <a href="#" class="whatsapp-link"><i class='bx bxl-whatsapp'></i></a>
              </div>
            </div>
          </div>
          </div>
          </div>
        `;
        propertiesContainer.appendChild(propertyElement);
      });
    } else {
      console.error('Error fetching properties:', data.message);
    }
  })
  .catch((error) => console.error('Error:', error));
