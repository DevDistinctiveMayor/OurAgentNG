const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});

// const urlParams = new URLSearchParams(window.location.search);
// const agentId = urlParams.get("agent_id");

// // const agentId = sessionStorage.getItem("agent_id");
// const agentName = sessionStorage.getItem("agent_name");
// const phoneNo = sessionStorage.getItem("phone_no");

// document.addEventListener("DOMContentLoaded", async () => {

//     if (!agentName || !phoneNo) {
//         Swal.fire({
//             title: "Session Expired",
//             text: "Your session has expired. Redirecting to the login page...",
//             icon: "warning",
//             confirmButtonText: "OK",
//         }).then(() => {
//             window.location.href = "../agent-login-page/agent-login.html";
//         });
//         return;
//     }

//     // Add event listener to the post property form
//     document.getElementById("post-property-form").addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const form = e.target;
//         const formData = new FormData(form);

//         // Append agent details to the form data
//         formData.append("agent_name", agentName);
//         formData.append("phone_no", phoneNo);

//         const submitButton = form.querySelector("button[type='submit']");
//         submitButton.disabled = true;
//         submitButton.textContent = "Processing...";

//         try {
//             const response = await fetch("https://ouragent.com.ng/addproperty.php", {
//                 method: "POST",
//                 body: formData,
//             });

//             const data = await response.json();

//             if (data.status === "success") {
//                 Swal.fire({
//                     icon: "success",
//                     title: "Success!",
//                     text: data.message,
//                 }).then(() => form.reset());
//             } else {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Error!",
//                     text: data.message,
//                 });
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Error!",
//                 text: "An error occurred while posting the property.",
//             });
//         } finally {
//             submitButton.disabled = false;
//             submitButton.textContent = "Post Your Property";
//         }
//     });
// });

// document.addEventListener("DOMContentLoaded", async () => {
//     const agentId = sessionStorage.getItem("agent_id");

//     // Check for session expiration
//     if (!agentId) {
//         Swal.fire({
//             title: "Session Expired",
//             text: "Your session has expired. Redirecting to the login page...",
//             icon: "warning",
//             confirmButtonText: "OK",
//         }).then(() => {
//             window.location.href = "../agent-login-page/agent-login.html";
//         });
//         return;
//     }

//     try {
//         const response = await fetch("https://ouragent.com.ng/agent_profile_verification.php", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ agent_id: agentId }),
//         });

//         const result = await response.json();

//         // Check if the agent's profile is incomplete
//         if (result.status === "incomplete") {
//             Swal.fire({
//                 title: "Profile Incomplete",
//                 text: result.message,
//                 icon: "info",
//                 confirmButtonText: "Update Profile",
//             }).then(() => {
//                 window.location.href = "../agent-profile/agent-profile.html";
//             });
//         }
//     } catch (error) {
//         console.error("Verification error:", error);
//         Swal.fire("Error", "An error occurred while verifying your profile.", "error");
//     }
// });

function previewImages() {
    const input = document.getElementById('propertyImages');
    const previewContainer = document.getElementById('imagePreview');
    const fileChosenText = document.getElementById('file-chosen-text');
    const errorText = document.getElementById('images-error');
    const maxFiles = 3;

    // Clear previous states
    previewContainer.innerHTML = '';
    errorText.textContent = '';
    fileChosenText.textContent = `${input.files.length} file(s) selected`;

    // Validation: Check if files are selected
    if (input.files.length === 0) {
        errorText.textContent = "Please upload at least one image.";
        return;
    }

    // Validation: Check the max file limit
    if (input.files.length > maxFiles) {
        errorText.textContent = `You can upload a maximum of ${maxFiles} images only.`;
        input.value = '';
        fileChosenText.textContent = 'No images chosen';
        return;
    }

    // Preview images if valid
    Array.from(input.files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            errorText.textContent = "Only image files are allowed!";
            input.value = '';
            fileChosenText.textContent = 'No images chosen';
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100px';
            img.style.margin = '5px';
            previewContainer.appendChild(img);
        }
        reader.readAsDataURL(file);
    });
}

// ✅ Force the required check on submission
document.getElementById('addPropertyForm').addEventListener('submit', function (e) {
    const input = document.getElementById('propertyImages');
    const errorText = document.getElementById('images-error');
    
    if (input.files.length === 0) {
        e.preventDefault();
        errorText.textContent = "Please upload at least one image before submitting.";
        input.focus();
    }
});




// Form Submission and Agent Verification
document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("addPropertyForm");
    const agentId = sessionStorage.getItem("agent_id");

    if (!agentId) {
        redirectToLogin("Your session has expired. Redirecting to the login page...");
        return;
    }

    if (!(await verifyAgentProfile(agentId))) return;

    form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        handleFormSubmission(form, agentId);
    });
});

// Redirect if session expires
function redirectToLogin(message) {
    Swal.fire({
        title: "Session Expired",
        text: message,
        icon: "warning",
        confirmButtonText: "OK"
    }).then(() => {
        window.location.href = "../agent-login-page/agent-login.html";
    });
}

// Verify agent profile
async function verifyAgentProfile(agentId) {
    try {
        const response = await fetch("https://ouragent.com.ng/agent_profile_verification.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ agent_id: agentId })
        });
        const result = await response.json();

        if (result.status === "incomplete") {
            Swal.fire({
                title: "Profile Incomplete",
                text: result.message,
                icon: "info",
                confirmButtonText: "Update Profile"
            }).then(() => {
                window.location.href = "../agent-profile/agent-profile.html";
            });
            return false;
        }
        return true;
    } catch (error) {
        Swal.fire("Error", "An error occurred during profile verification.", "error");
        console.error("Verification Error:", error);
        return false;
    }
}

// Form Submission Handler
async function handleFormSubmission(form, agentId) {
    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = true;
    submitButton.textContent = "Uploading...";

    const formData = new FormData(form);
    formData.append("agent_id", agentId);

    try {
        const response = await fetch("https://ouragent.com.ng/addproperty.php", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        Swal.fire(result.status === "success" ? "Success" : "Error", 
                  result.message, 
                  result.status === "success" ? "success" : "error");

        if (result.status === "success") form.reset();
    } catch (error) {
        Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
        console.error("Submission Error:", error);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Property";
    }
}

// Toggle Room and Bathroom Fields Based on Property Type
function toggleRoomBathroomFields() {
    const propertyType = document.getElementById("property-type").value;
    const roomBathroomSection = document.getElementById("roomBathroomSection");
    const fields = ["roomNo", "bathNo"];

    if (propertyType === "land") {
        roomBathroomSection.style.display = "none";
        fields.forEach(field => {
            document.getElementById(field).value = "";
            document.getElementById(field).removeAttribute("required");
        });
    } else {
        roomBathroomSection.style.display = "block";
        fields.forEach(field => document.getElementById(field).setAttribute("required", "true"));
    }
}

// Currency Formatter with Decimal Support
function formatCurrency(input) {
    let value = input.value.replace(/[^0-9.]/g, '');
    const [integerPart, decimalPart] = value.split('.');
    input.value = decimalPart 
        ? `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decimalPart.substring(0, 2)}`
        : integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Radio Button Validation
function validateRadioSelection() {
    const radios = document.querySelectorAll('input[name="category"]');
    const errorSpan = document.getElementById('category-error');
    const isChecked = Array.from(radios).some(radio => radio.checked);

    errorSpan.textContent = isChecked ? "" : "Please select a category!";
    return isChecked;
}
