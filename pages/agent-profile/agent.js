document.addEventListener("DOMContentLoaded", () => {
  document.body.style.display = "block"; // Show body when JS is ready
});


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
    // console.error("Error loading session:", error);
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
          // console.error("Logout failed.");
        }
      } catch (error) {
        // console.error("Error during logout:", error);
      }
    });
  });
}


//modify the script to hide the container initially and show it after fetching.
document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  const propertiesSoldContainer = document.getElementById("propertiesSold");

  // Hide content initially
  loader.style.display = "flex";
  content.style.display = "none";
  propertiesSoldContainer.style.display = "none"; // Hide properties section initially

  const agentId = sessionStorage.getItem("agent_id");

  if (!agentId) {
    Swal.fire({
      toast: true,
      title: "Session Expired",
      text: "Your session has expired. Redirecting to the login page...",
      icon: "error",
      confirmButtonText: "Ok",
      confirmButtonColor: "rgba(8, 97, 175, 1)",
    }).then(() => {
      window.location.href = "../agent-login-page/agent-login.html";
    });
    return;
  }

  try {
    await fetchAndRenderDashboard(agentId); // Fetch agent dashboard data
    await fetchSoldProperties(
      agentId,
      "propertiesSold",
      "https://ouragent.com.ng/agent_profile/agent_sold_property.php"
    );
  } catch (error) {
    // console.error("Error loading data:", error);
  } finally {
    // Show content and properties section after data loads
    loader.style.display = "none";
    content.style.display = "block";
    propertiesSoldContainer.style.display = ""; // Show only after fetching
  }
});





// Function to fetch and render agent dashboard data
async function fetchAndRenderDashboard(agentId) {
  try {
    const response = await fetch("https://ouragent.com.ng/agent_profile/agentdashboard.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id: agentId }), // Send agent_id
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    if (data.status === "success") {
      const user = data.data;
      document.getElementById("fullName").textContent = user.fullName || "N/A";
      document.getElementById("agentName").textContent = user.fullName || "N/A";
      document.getElementById("companyName").textContent = user.companyName || "N/A";
      document.getElementById("address").textContent = user.address || "N/A";
      document.getElementById("bio").textContent = user.userInfo || "N/A";
      document.getElementById("email").href = `mailto:${user.email || ""}`;
      document.getElementById("socialMediaHandles").href = user.socialMediaHandles || "#";

      const profileImage = document.getElementById("profileImage");
      profileImage.src = user.profileImage || "../../images/agent-profile-img.png";
      document.getElementById("phoneNumber").href = `tel:${user.phoneNumber || ""}`;
    } else {
      Swal.fire({
        toast: true,
        title: "Error",
        text: data.message || "Failed to load user data.",
        icon: "error",
        confirmButtonColor: "rgba(8, 97, 175, 1)",
        confirmButtonText: "OK"
      });
      
    }
  } catch (error) {
    Swal.fire({
      toast: true,
      title: "Unexpected Error",
      text: "An error occurred. Please try again later.",
      icon: "error",
      confirmButtonText: "Retry",
      confirmButtonColor: "rgba(8, 97, 175, 1)",
    });
  }
}



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
          toast: true,
          icon: "warning",
          text: `Your bio exceeds the ${charCountLimit}-character limit. Please reduce it before submitting.`,
          showConfirmButton: "okay",
          iconColor: "rgba(8, 97, 175, 1)",
          title: "Character Limit Exceeded",
          confirmButtonColor: "rgba(8, 97, 175, 1)"
         
        });
        return;
      }

      if (!userInfo) {
        Swal.fire({
          toast: true,
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
    const url = "https://ouragent.com.ng/agent_profile/userInfo.php";

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
          toast: true,
          icon: "success",
          title: "Success!",
          text: "Bio updated successfully!",
          showConfirmButton: false,
          timer: 2000,
          position: "top-end",
          timerProgressBar: true,
          iconColor: "rgba(8, 97, 175, 1)"
        });
      } else {
        Swal.fire({
          toast: true,
          icon: "error",
          title: "Error!",
          text: "Error updating bio: " + result.message,
        });
      }
    } catch (error) {
      Swal.fire({
        toast: true,
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
    "https://ouragent.com.ng/agent_profile/agent_sold_property.php"
  );
});

  async function fetchSoldProperties(agentId, containerId, url) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear any dummy content
  

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

    properties.forEach((property) => {
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
                    <div class="sold-label">${property.propertystatus}</div>
                </div>
                <div class="details">
                    <div class="description">${property.description.substring(
                      0,
                      25
                    )}</div>
                    <div class="price">₦${property.price}</div>
                    <div class="location">
                        <div class="location-name">${property.state}, ${
                          property.lga
                        }</div>
                    </div>
                    <button class="delete-btn" onclick="deleteProperty('${
                      property.id
                    }')">Delete</button>
                </div>
            `;

      containerDiv.appendChild(card);
      container.appendChild(containerDiv);
    });
  } catch (error) {
    // console.error("Error fetching properties:", error);
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
    "https://ouragent.com.ng/agent_profile/agentrent_property_ondash.php",
    "Rent"
  );

  fetchAgentProperties(
    agentId,
    "propertiesContainer_2",
    "https://ouragent.com.ng/agent_profile/agentsell_property_dashboard.php",
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
                        <div class="description">${property.description.substring(
                          0,
                          25
                        )}...</div>
                        <div class="price">₦${property.price}</div>
                        <div class="location">
                            <div class="location-name">${property.state}, ${
          property.lga
        }</div>
                        </div>
   <button class="mark-status-btn" 
    data-property-id="${property.id}" 
    onclick="markPropertyStatus('${property.id}', '${propertystatus}')"
    ${
      (propertystatus === "Sell" && property.propertystatus === "sold") ||
      (propertystatus === "Rent" && property.propertystatus === "rent-out")
        ? "disabled"
        : ""
    }>
    ${
      propertystatus === "Sell"
        ? property.propertystatus === "sold"
          ? "Sold"
          : "Mark as Sold"
        : property.propertystatus === "rent-out"
        ? "Rent Out"
        : "Mark as Rent Out"
    }
</button>
                           <button class="delete-btn" onclick="deleteProperty('${
                             property.id
                           }')">Delete</button>
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
    // console.error("Error fetching properties:", error);
    container.innerHTML = `<p>Error loading properties. Please try again later.</p>`;
  }
}

async function deleteProperty(propertyId) {
  const result = await Swal.fire({
    toast: true,
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgba(8, 97, 175, 1)",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    iconColor: "rgba(8, 97, 175, 1)"
  });

  if (!result.isConfirmed) {
    return;
  }

  try {
    const response = await fetch(
      "https://ouragent.com.ng/agent_profile/agentdelete_property.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ property_id: propertyId }),
      }
    );

    const result = await response.json();

    Swal.fire({
      toast: true,
      title: result.status === "success" ? "Deleted!" : "Error!",
      text: result.message,
      icon: result.status === "success" ? "success" : "error",
      position: "top-end",
      timer: 2000, // Display for 3 seconds
      timerProgressBar: true,
      showConfirmButton: false,
            iconColor: "rgba(8, 97, 175, 1)"
    });
    

    if (result.status === "success") {
      location.reload();
    }
  } catch (error) {
    // console.error("Error deleting property:", error);
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

async function markPropertyStatus(propertyId, propertystatus) {
  const agentId = sessionStorage.getItem("agent_id");

  if (!propertyId) {
    alert("Property ID is missing.");
    return;
  }

  if (!agentId) {
    alert("Agent ID is missing. Please log in.");
    return;
  }

  // Use SweetAlert for confirmation
  const confirmation = await Swal.fire({
    toast: true,
    title: `Are you sure?`,
    text: `Do you want to mark this property as ${
      propertystatus === "Sell" ? "Sold" : "Rent Out"
    }?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    iconColor: "rgba(8, 97, 175, 1)",
    confirmButtonText: `Yes, mark as ${
      propertystatus === "Sell" ? "Sold" : "Rent Out"
    }`,
  });

  if (!confirmation.isConfirmed) {
    return; // Stop the process if the agent cancels the action
  }

  let newStatus = propertystatus === "Sell" ? "sold" : "rent-out";
  const statusButton = document.querySelector(
    `button[data-property-id="${propertyId}"]`
  );

  if (!statusButton) {
    alert("Button not found.");
    return;
  }

  // Disable button and show processing state
  statusButton.disabled = true;
  statusButton.textContent = "Processing...";
  statusButton.classList.add("processing");

  try {
    const response = await fetch(
      "https://ouragent.com.ng/agent_profile/agentmark_property_sold.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: parseInt(agentId),
          property_id: parseInt(propertyId),
          propertystatus: newStatus,
        }),
      }
    );

    const result = await response.json();

    if (result.status === "success") {
      Swal.fire({
        toast: true,
        title: "success!",
        text: `Property successfully marked as ${newStatus === "sold" ? "Sold" : "Rented Out"}.`,
        icon: "success",
        position: "top-end",
        timer: 2000, // Display for 3 seconds
        timerProgressBar: true,
        iconColor: "rgba(8, 97, 175, 1)",
        showConfirmButton: false, // Needed for toast mode
      });
    
      // Delay reload slightly so the user sees the message
      setTimeout(() => location.reload(), 2000);
    } else {
      Swal.fire({
        toast: true,
        title: "Error!",
        text: result.message,
        icon: "error",
      });
      statusButton.textContent = "Mark as Sold / Rent Out";
      statusButton.disabled = false;
      statusButton.classList.remove("processing");
    }
  } catch (error) {
    // console.error("Error:", error);
    Swal.fire({
      toast: true,
      title: "Error!",  
      text: "An error occurred while updating the property status.",
      icon: "error",
    });
    statusButton.textContent = "Mark as Sold / Rent Out";
    statusButton.disabled = false;
    statusButton.classList.remove("processing");
  }
}



document.getElementById("feedbackForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const feedbackMessage = document.getElementById("feedbackMessage").value.trim();
  if (!feedbackMessage) return alert("Please enter your feedback.");

  const agentId = sessionStorage.getItem("agent_id") || "guest"; // If agent is logged in
  const formData = { agent_id: agentId, feedback: feedbackMessage };

  const response = await fetch("https://ouragent.com.ng/feedback/submit_feedback.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const result = await response.json();
  document.getElementById("feedbackResponse").textContent = result.message;
});


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
      const response = await fetch("https://ouragent.com.ng/feedback/submit_feedback.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === "success") {
        showMessage(result.message, "success");
        feedbackMessage.value = ""; // Clear textarea
      } else {
        showMessage(result.message, "error");
      }
    } catch (error) {
      showMessage("An error occurred. Please try again.", "error");
      // console.error(error);
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
    }, 2000);
  }
});

