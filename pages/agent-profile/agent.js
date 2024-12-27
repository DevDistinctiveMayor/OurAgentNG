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
            document.getElementById("bio").textContent = user.userInfo || "N/A";

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




document.addEventListener('DOMContentLoaded', () => {
    const bioDiv = document.getElementById("bio");
    const editBioBtn = document.getElementById("editBioBtn");
    const submitBtn = document.querySelector("button[type='submit']");
    const wordCountLimit = 200; // Maximum word count

    // Initially, the bio is in read-only mode
    bioDiv.contentEditable = false;

    // Toggle between read-only and editable
    editBioBtn.addEventListener("click", (event) => {
        // Prevent the form submission when editing
        event.preventDefault(); 
        
        if (bioDiv.contentEditable === "false") {
            bioDiv.contentEditable = true; // Make bio editable
            bioDiv.style.backgroundColor = "#f0f0f0"; // Change background color
            bioDiv.style.padding = "10px"; // Change background color
            bioDiv.style.border = "2pt solid #0861AF"
          
            editBioBtn.textContent = "Cancel Edit"; // Change button text
        } else {
            bioDiv.contentEditable = false; // Make bio read-only
            bioDiv.style.backgroundColor = "#ffffff"; // Revert background color
            editBioBtn.textContent = "Edit Bio"; // Change button text back
        }
    });

    // Function to count words in the bio div
    function countWords(text) {
        return text.trim().split(/\s+/).length;
    }

    // Event listener for typing in the div
    bioDiv.addEventListener('input', () => {
        const wordCount = countWords(bioDiv.innerText);

        // If the word count exceeds the limit, prevent further typing
        if (wordCount > wordCountLimit) {
            bioDiv.innerText = bioDiv.innerText.split(/\s+/).slice(0, wordCountLimit).join(" ");
            Swal.fire({
                icon: 'warning',
                title: 'Word Limit Exceeded',
                text: `Your bio can only be up to ${wordCountLimit} words. Excess words have been removed.`,
            });
        }
    });

    // Handle form submission
    document.getElementById("bioForm").addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the form from reloading the page

        const userInfo = bioDiv.innerText; // Get the bio text

        // Validate input
        if (!userInfo) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please fill out the bio field.',
            });
            return;
        }

        // Disable submit button and change text to "Processing..."
        submitBtn.textContent = "Processing...";
        submitBtn.disabled = true;

        // Get the email from sessionStorage (or other method)
        const email = sessionStorage.getItem("email");

        // Send the update request to the backend
        await updateUserInfo(email, userInfo);

        // Enable submit button and reset text after processing
        submitBtn.textContent = "Update Bio";
        submitBtn.disabled = false;

        // After successful update, return div to read-only mode
        bioDiv.contentEditable = false;
        bioDiv.style.backgroundColor = "#ffffff";
        bioDiv.style.border = "none"; 
        bioDiv.style.padding = "0px"; 
        editBioBtn.textContent = "Edit Bio";
    });

    // Function to send the POST request to the backend
    async function updateUserInfo(email, userInfo) {
        const url = 'https://ouragent.com.ng/userInfo.php'; // Replace with your actual endpoint URL

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, userInfo }) // Send email and bio as JSON
            });

            const result = await response.json(); // Parse the JSON response

            if (response.ok) {
                console.log("Success:", result.message);
                // Show success message using SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Bio updated successfully!',
                });
            } else {
                console.error("Error:", result.message);
                // Show error message using SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Error updating bio: ' + result.message,
                });
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            // Show error message using SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Fetch Error!',
                text: 'An error occurred while updating the bio. Please try again later.',
            });
        }
    }
});
