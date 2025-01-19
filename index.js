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
  if (!clientId) {
    //   alert("Client ID is missing. Please log in again.");
    return;
  }
  // Fetch client data using the provided client ID
  await fetchClientData(
    clientId,
    "https://ouragent.com.ng/get_user_session.php"
  );
});


async function fetchClientData(clientId, url) {
  const greeting = document.getElementById("greeting");
  const greeting_mobile = document.getElementById("greeting_mobile");
  const loginButton = document.getElementById("login-button");
  const loginButtonMobile = document.getElementById("login-button_mobile");
  const logoutButton = document.getElementById("logout-button");
  const logoutButtonMobile = document.getElementById("logout-button_mobile");
  const postPropertyButton = document.getElementById("post-property");
  const postPropertyButton_mobile = document.getElementById("post-property_mobile");

  try {
    // Send POST request to the server
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ client_id: clientId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Parse the response JSON
    const data = await response.json();
   // console.log("Server Response:", data); // Debugging line

    if (data.status === "success" && data.client) {
      // Extract fullName from the nested client object
      const fullName = data.client.fullName; // Fallback to "User" if undefined
      greeting.textContent = `${fullName.substring(0, 8)}...`;
      greeting_mobile.textContent = `${fullName.substring(0, 8)}...`;
      loginButton.style.display = "none"; 
      loginButtonMobile.style.display = "none"; // Hide login button
      logoutButton.style.display = "inline"; // Show logout button
      logoutButtonMobile.style.display = "inline"; // Show logout button
      postPropertyButton.style.display = "inline"; // Show post property button
      postPropertyButton_mobile.style.display = "inline"; // Show post property button
      
    } else {
      // User is not logged in or session is invalid

      greeting.textContent = "Welcome, Guest!";
      greeting_mobile.textContent = "Welcome, Guest!";
      loginButton.style.display = "inline";
      loginButtonMobile.style.display = "inline"; // Show login button
      logoutButton.style.display = "none"; // Hide logout button
      logoutButtonMobile.style.display = "none"; // Hide logout button
      postPropertyButton.style.display = "none"; // Hide post property button
      postPropertyButton_mobile.style.display = "none"; // Hide post property button
    }
  } catch (error) {
    console.error("Error checking session:", error);
    greeting.textContent = "Error loading user session.";
    greeting_mobile.textContent = "Error loading user session.";
  }

  // Logout button event listener
  logoutButton.addEventListener("click", async () => {
    try {
      // Send logout request to the server
      const logoutResponse = await fetch("https://ouragent.com.ng/logout.php", {
        method: "POST",
      });

      if (logoutResponse.ok) {
        // Clear local session storage and reload the page
        sessionStorage.clear();
        window.location.reload();
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  });
}
