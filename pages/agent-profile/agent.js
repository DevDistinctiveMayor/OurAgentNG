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
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (data.status === "success") {
            const user = data.data;
            document.getElementById("fullName").textContent = user.fullName || "N/A";
            document.getElementById("companyName").textContent = user.companyName || "N/A";
            document.getElementById("address").textContent = user.address || "N/A";
            document.getElementById("bio").textContent = user.userInfo || "N/A";
            document.getElementById("email").href = `mailto:${user.email || ""}`;

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
        formData.append("agent_id", sessionStorage.getItem("agent_id")); // Send agent_id instead of email

        // Disable the button and show loading state
        uploadButton.disabled = true;
        uploadButton.textContent = "Processing...";

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
            Swal.fire({
                icon: 'error',
                title: 'Fetch Error!',
                text: 'An error occurred while uploading the image. Please try again later.',
            });
        } finally {
            uploadButton.disabled = false;
            uploadButton.textContent = "Change Image";
        }
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const bioDiv = document.getElementById("bio");
    const editBioBtn = document.getElementById("editBioBtn");
    const submitBtn = document.querySelector("button[type='submit']");
    const charCountDisplay = document.getElementById("charCountDisplay"); // Element to show character count
    const charCountLimit = 200; // Maximum character count

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
        return text.length; // Count every character, including spaces and punctuation
    }

    bioDiv.addEventListener('input', () => {
        const charCount = countCharacters(bioDiv.innerText);

        if (charCount > charCountLimit) {
            // Truncate content to the allowed limit
            bioDiv.innerText = bioDiv.innerText.slice(0, charCountLimit);

            // Move the cursor to the end
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(bioDiv);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);

            Swal.fire({
                icon: 'warning',
                title: 'Character Limit Reached',
                text: `You cannot enter more than ${charCountLimit} characters.`,
            });
        }

        const remainingChars = charCountLimit - Math.min(charCount, charCountLimit);
        charCountDisplay.textContent = `Remaining characters: ${remainingChars}`;
        charCountDisplay.style.color = remainingChars <= 0 ? "red" : "black";
    });

    document.getElementById("bioForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const userInfo = bioDiv.innerText.trim();
        const charCount = countCharacters(userInfo);

        if (charCount > charCountLimit) {
            Swal.fire({
                icon: 'warning',
                title: 'Character Limit Exceeded',
                text: `Your bio exceeds the ${charCountLimit}-character limit. Please reduce it before submitting.`,
            });
            return;
        }

        if (!userInfo) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please fill out the bio field.',
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
        const url = 'https://ouragent.com.ng/userInfo.php';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ agent_id: agentId, userInfo })
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Bio updated successfully!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Error updating bio: ' + result.message,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Fetch Error!',
                text: 'An error occurred while updating the bio. Please try again later.',
            });
        }
    }

    // Initialize the character count display
    const initialCharCount = countCharacters(bioDiv.innerText);
    charCountDisplay.textContent = `Remaining characters: ${charCountLimit - initialCharCount}`;
});

