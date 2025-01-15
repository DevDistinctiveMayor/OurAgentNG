const phoneIcon = document.querySelector(".phone-icon");
const favoriteIcon = document.querySelector(".heart-icon");
const messageIcon = document.querySelector(".message-icon");
const scrollContainer = document.querySelector(".house-card-container");
const leftAngle = document.querySelector(".left-angle");
const rightAngle = document.querySelector(".right-angle");
const btns = document.querySelectorAll(".btn");
const saleBtn = document.querySelector(".sale-btn");
const rentBtn = document.querySelector(".rent-btn");
const nums = document.querySelectorAll(".num");
let activeBtn = 0;
let activeNum = 0;

leftAngle.addEventListener("click", (e) => {
  if (scrollContainer.scrollLeft === 0) return;
  scrollContainer.scrollLeft -= 300;
});

rightAngle.addEventListener("click", (e) => {
  if (
    scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
    scrollContainer.scrollWidth
  )
    return;
  scrollContainer.scrollLeft += 300;
});

btns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    btns[activeBtn].classList.remove("active");
    btn.classList.add("active");
    activeBtn = index;
  });
});

nums.forEach((num, index) => {
  num.addEventListener("click", () => {
    nums[activeNum].classList.remove("num-active");
    num.classList.add("num-active");
    activeNum = index;
  });
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
  const agentId = sessionStorage.getItem("agent_id"); // Get agent_id from sessionStorage

  // Check if agent_id exists in session storage
  if (!agentId) {
    Swal.fire({
      title: "Session Expired",
      text: "Your session has expired. Redirecting to the login page...",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.href = "../agent-login-page/agent-login.html";
    });
    return;
  }

  try {
    // Fetch user data from the server using agent_id
    const response = await fetch("https://ouragent.com.ng/agentdashboard.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id: agentId }), // Send agent_id instead of email
    });

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    if (data.status === "success") {
      const user = data.data;
      document.getElementById("fullName").textContent = user.fullName || "N/A";
      document.getElementById("agentName").textContent = user.fullName || "N/A";
      document.getElementById("companyName").textContent =
        user.companyName || "N/A";
      document.getElementById("address").textContent = user.address || "N/A";
      document.getElementById("bio").textContent = user.userInfo || "N/A";
      document.getElementById("email").href = `mailto:${user.email || ""}`;

      const profileImage = document.getElementById("profileImage");
      profileImage.src =
        user.profileImage || "../../images/agent-profile-img.png";
      document.getElementById("phoneNumber").href = `tel:${
        user.phoneNumber || ""
      }`;
    } else {
      Swal.fire("Error", data.message || "Failed to load user data.", "error");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    Swal.fire("Error", "An error occurred while fetching data.", "error");
  }
});

// Handle image upload
document.getElementById("uploadButton").addEventListener("click", () => {
  document.getElementById("imageUpload").click();
});

document
  .getElementById("imageUpload")
  .addEventListener("change", async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);
      formData.append("agent_id", sessionStorage.getItem("agent_id")); // Send agent_id instead of email

      // Disable the button and show loading state
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
            result.imageUrl + "?" + new Date().getTime();
        } else {
          Swal.fire("Error", result.message || "Image upload failed.", "error");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Fetch Error!",
          text: "An error occurred while uploading the image. Please try again later.",
        });
      } finally {
        uploadButton.disabled = false;
        uploadButton.textContent = "Change Image";
      }
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const bioDiv = document.getElementById("bio");
  const editBioBtn = document.getElementById("editBioBtn");
  const submitBtn = document.querySelector("button[type='submit']");
  const charCountDisplay = document.getElementById("charCountDisplay");
  const charCountLimit = 200;

  bioDiv.contentEditable = false;

  editBioBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (bioDiv.contentEditable === "false") {
      bioDiv.contentEditable = true;
      bioDiv.style.backgroundColor = "#f0f0f0";
      bioDiv.style.padding = "10px";
      bioDiv.style.border = "1pt solid #0861AF";
      editBioBtn.textContent = "Cancel Edit";
    } else {
      bioDiv.contentEditable = false;
      bioDiv.style.backgroundColor = "#ffffff";
      editBioBtn.textContent = "Edit Bio";
    }
  });

  function countCharacters(text) {
    return text.trim().length;
  }

  bioDiv.addEventListener("input", () => {
    const charCount = countCharacters(bioDiv.innerText);
    const remainingChars = Math.max(0, charCountLimit - charCount);
    charCountDisplay.textContent = `: ${remainingChars}`;
    charCountDisplay.style.color = remainingChars === 0 ? "red" : "black";
  });

  document
    .getElementById("bioForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const userInfo = bioDiv.innerText.trim();
      const charCount = countCharacters(userInfo);

      if (charCount > charCountLimit) {
        Swal.fire({
          icon: "warning",
          title: "Character Limit Exceeded",
          text: `Your bio exceeds the ${charCountLimit}-character limit. Please reduce it before submitting.`,
        });
        return;
      }

      if (!userInfo) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please fill out the bio field.",
        });
        return;
      }

      submitBtn.textContent = "Processing...";
      submitBtn.disabled = true;

      const agentId = sessionStorage.getItem("agent_id");

      await updateUserInfo(agentId, userInfo);

      submitBtn.textContent = "Update Bio";
      submitBtn.disabled = false;

      bioDiv.contentEditable = false;
      bioDiv.style.backgroundColor = "#ffffff";
      bioDiv.style.border = "none";
      bioDiv.style.padding = "0px";
      editBioBtn.textContent = "Edit Bio";
    });

  async function updateUserInfo(agentId, userInfo) {
    const url = "https://ouragent.com.ng/userInfo.php";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ agent_id: agentId, userInfo }),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Bio updated successfully!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Error updating bio: " + result.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fetch Error!",
        text: "An error occurred while updating the bio. Please try again later.",
      });
    }
  }

  window.addEventListener("load", () => {
    // const initialCharCount = countCharacters(bioDiv.innerText);
    const remainingChars = Math.max(0, charCountLimit - initialCharCount);
    charCountDisplay.textContent = `: ${remainingChars}`;
    charCountDisplay.style.color = remainingChars === 0 ? "red" : "black";
  });
});


document.addEventListener("DOMContentLoaded", () => {
    const agentId = sessionStorage.getItem("agent_id");
    if (!agentId) {
        document.getElementById("propertiesSold").innerHTML =
          "<p>Agent ID is missing.</p>";
        return;
    }
    fetchSoldProperties(
        agentId,
        "propertiesSold",
        "https://ouragent.com.ng/agent_sold_property.php"
    );
});

async function fetchSoldProperties(agentId, containerId, url) {
    const container = document.getElementById(containerId);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ agent_id: agentId }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch properties.");
        }

        const properties = await response.json();
        container.innerHTML = "";

        if (properties.status === "error") {
            container.innerHTML = `<p>${properties.message}</p>`;
            return;
        }

        properties.forEach(property => {
            const containerDiv = document.createElement("div");
            containerDiv.classList.add("container");

            const card = document.createElement("div");
            card.classList.add("house-card");

            const imageUrl =
                Array.isArray(property.images) && property.images.length > 0
                    ? property.images[0]
                    : "../../images/featured_image.png";

            card.innerHTML = `
                <div class="img sold-overlay">
                    <img src="${imageUrl}" alt="Property Image" />
                    <div class="sold-label">Sold Out</div>
                </div>
                <div class="details">
                    <div class="description">${property.description.substring(0, 25)}</div>
                    <div class="price">₦${property.price}</div>
                    <div class="location">
                        <div class="location-name">${property.state}, ${property.lga}</div>
                    </div>
                    <button class="delete-btn" onclick="deleteProperty('${property.id}')">Delete</button>
                </div>
            `;

            containerDiv.appendChild(card);
            container.appendChild(containerDiv);
        });

    } catch (error) {
        console.error("Error fetching properties:", error);
        container.innerHTML = `<p>Error loading properties. Please try again later.</p>`;
    }
}




document.addEventListener("DOMContentLoaded", () => {
  const agentId = sessionStorage.getItem("agent_id");

  if (!agentId) {
    document.getElementById("propertiesContainer").innerHTML =
      "<p>Agent ID is missing.</p>";
    document.getElementById("propertiesContainer_2").innerHTML =
      "<p>Agent ID is missing.</p>";
    return;
  }

  // Fetch properties for both sale and rent
  fetchAgentProperties(
    agentId,
    "propertiesContainer",
    "https://ouragent.com.ng/agentrent_property_ondash.php",
    "Rent"
  );
  fetchAgentProperties(
    agentId,
    "propertiesContainer_2",
    "https://ouragent.com.ng/agentsell_property_dashboard.php",
    "Sell"
  );

  switchpageI();
});


async function fetchAgentProperties(agentId, containerId, url, propertystatus) {
  const container = document.getElementById(containerId);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id: agentId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch properties.");
    }

    const properties = await response.json();
    container.innerHTML = "";

    if (properties.status === "error") {
      container.innerHTML = `<p>${properties.message}</p>`;
      return;
    }

    let currentPage = 1;
    const propertiesPerPage = 5;

    function displayProperties(page) {
      currentPage = page;
      container.innerHTML = "";

      const start = (page - 1) * propertiesPerPage;
      const paginatedProperties = properties.slice(
        start,
        start + propertiesPerPage
      );

      if (paginatedProperties.length === 0) {
        container.innerHTML = "<p>No properties available on this page.</p>";
        return;
      }

      paginatedProperties.forEach((property) => {
        const containerDiv = document.createElement("div");
        containerDiv.classList.add("container");

        const card = document.createElement("div");
        card.classList.add("house-card");

        const imageUrl =
          Array.isArray(property.images) && property.images.length > 0
            ? property.images[0]
            : "../../images/featured_image.png";

        card.innerHTML = `
                    <div class="img ${
                      property.propertystatus === "sold" ? "sold-overlay" : ""
                    }">
                        <img src="${imageUrl}" alt="Property Image" />
                        ${
                          property.propertystatus === "sold"
                            ? '<div class="sold-label">Sold Out</div>'
                            : ""
                        }
                    </div>
                    <div class="details">
                        <div class="description">${property.description.substring(0, 25)}...</div>
                        <div class="price">₦${property.price}</div>
                        <div class="location">
                            <div class="location-name">${property.state}, ${
          property.lga
        }</div>
                        </div>
                        <button class="mark-sold-btn" 
                            data-property-id="${property.id}"
                            onclick="markAsSold('${property.id}')"
                            ${
                              property.propertystatus === "sold"
                                ? "disabled"
                                : ""
                            }>
                            ${
                              property.propertystatus === "sold"
                                ? "Sold"
                                : "Mark as Sold"
                            }
                        </button>
                           <button class="delete-btn" onclick="deleteProperty('${property.id}')">Delete</button>
                    </div>
                `;

        containerDiv.appendChild(card);
        container.appendChild(containerDiv);
      });

      updatePagination(
        currentPage,
        Math.ceil(properties.length / propertiesPerPage)
      );
    }

    function updatePagination(page, totalPages) {
      const paginationContainer = document.querySelector(".num-container");
      const leftArrow = document.getElementById("left-angle");
      const rightArrow = document.getElementById("right-angle");

      paginationContainer.innerHTML = "";

      leftArrow.onclick = () => {
        if (page > 1) displayProperties(page - 1);
      };

      for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement("span");
        pageNumber.classList.add("num");
        if (i === page) pageNumber.classList.add("num-active");
        pageNumber.innerText = i;
        pageNumber.onclick = () => displayProperties(i);
        paginationContainer.appendChild(pageNumber);
      }

      rightArrow.onclick = () => {
        if (page < totalPages) displayProperties(page + 1);
      };
    }

    // Initial call to display properties
    displayProperties(currentPage);
  } catch (error) {
    console.error("Error fetching properties:", error);
    container.innerHTML = `<p>Error loading properties. Please try again later.</p>`;
  }
}



async function deleteProperty(propertyId) {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) {
        return;
    }

    try {
        const response = await fetch('https://ouragent.com.ng/agentdelete_property.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ property_id: propertyId })
        });

        const result = await response.json();
        await Swal.fire(
            result.status === "success" ? "Deleted!" : "Error!",
            result.message,
            result.status === "success" ? "success" : "error"
        );

        if (result.status === "success") {
            location.reload();
        }
    } catch (error) {
        console.error("Error deleting property:", error);
    }
}

function switchpageI() {
  const saleButton = document.getElementById("sellpage");
  const rentButton = document.getElementById("rentpage");
  const saleContainer = document.getElementById("propertiesContainer");
  const rentContainer = document.getElementById("propertiesContainer_2");

  saleButton.addEventListener("click", () => {
    saleButton.classList.add("active");
    rentButton.classList.remove("active");
    saleContainer.style.display = "flex";
    rentContainer.style.display = "none";
  });

  rentButton.addEventListener("click", () => {
    rentButton.classList.add("active");
    saleButton.classList.remove("active");
    rentContainer.style.display = "flex";
    saleContainer.style.display = "none";
  });
}

async function markAsSold(propertyId) {
  const agentId = sessionStorage.getItem("agent_id");

  if (!propertyId) {
    alert("Property ID is missing.");
    return;
  }

  if (!agentId) {
    alert("Agent ID is missing. Please log in.");
    return;
  }

  const soldButton = document.querySelector(
    `button[data-property-id="${propertyId}"]`
  );

  if (!soldButton) {
    alert("Button not found.");
    return;
  }

  // Disable button and show processing state
  soldButton.disabled = true;
  soldButton.textContent = "Processing...";
  soldButton.classList.add("processing");

  try {
    const response = await fetch(
      "https://ouragent.com.ng/agentmark_property_sold.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: parseInt(agentId),
          property_id: parseInt(propertyId),
        }),
      }
    );

    const result = await response.json();

    if (result.status === "success") {
      // Success feedback: Mark the property as sold
      soldButton.textContent = "Sold";
      soldButton.disabled = true;
      soldButton.classList.remove("processing");
      soldButton.classList.add("disabled-button");

      const propertyCard = soldButton.closest(".house-card");
      if (propertyCard) {
        propertyCard.classList.add("sold-overlay");
        const soldLabel = document.createElement("div");
        soldLabel.classList.add("sold-label");
        soldLabel.textContent = "Sold Out";
        propertyCard.querySelector(".img").appendChild(soldLabel);
      }
    } else {
      // Error feedback
      alert(result.message);
      soldButton.textContent = "Mark as Sold";
      soldButton.disabled = false;
      soldButton.classList.remove("processing");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while marking the property as sold.");
    soldButton.textContent = "Mark as Sold";
    soldButton.disabled = false;
    soldButton.classList.remove("processing");
  }
}
