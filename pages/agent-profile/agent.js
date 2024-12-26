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
    const email = sessionStorage.getItem("email");

    // Check if email exists in session storage
    if (!email) {
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
        // Fetch user data from the server
        const response = await fetch("https://ouragent.com.ng/agentdashboard.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (data.status === "success") {
            const user = data.data;
            document.getElementById("fullName").textContent = user.fullName || "N/A";
            document.getElementById("address").textContent = user.address || "N/A";

            const profileImage = document.getElementById("profileImage");
            profileImage.src = user.profileImage || "../../images/agent-profile-img.png";
            document.getElementById("phoneNumber").href = `tel:${user.phoneNumber || ""}`;
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

document.getElementById("imageUpload").addEventListener("change", async (event) => {
    const file = event.target.files[0];

    if (file) {
        const formData = new FormData();
        formData.append("profileImage", file);
        formData.append("email", sessionStorage.getItem("email"));

        try {
            const response = await fetch("https://ouragent.com.ng/uploadProfileImage.php", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.status === "success") {
                Swal.fire("Success", "Profile image updated successfully!", "success");
                document.getElementById("profileImage").src = result.imageUrl + "?" + new Date().getTime();
            } else {
                Swal.fire("Error", result.message || "Image upload failed.", "error");
            }
        } catch (error) {
            console.error("Upload error:", error);
            Swal.fire("Error", "An error occurred during image upload.", "error");
        }
    }
});
