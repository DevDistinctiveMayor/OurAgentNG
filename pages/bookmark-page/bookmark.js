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
