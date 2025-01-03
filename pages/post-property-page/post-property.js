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
    const maxFiles = 3;

    previewContainer.innerHTML = ''; // Clear previous previews
    fileChosenText.textContent = `${input.files.length} file(s) selected`;

    if (input.files.length > maxFiles) {
        alert('You can upload a maximum of 3 images only.');
        input.value = ''; // Clear the input
        fileChosenText.textContent = 'No images chosen';
        return;
    }

    Array.from(input.files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                previewContainer.appendChild(img);
            }
            reader.readAsDataURL(file);
        } else {
            alert('Only image files are allowed!');
            input.value = '';
            fileChosenText.textContent = 'No images chosen';
        }
    });
}


document.addEventListener("DOMContentLoaded", async () => {

    
    const form = document.getElementById("addPropertyForm");

    let agentId = sessionStorage.getItem("agent_id");

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
        const response = await fetch("https://ouragent.com.ng/agent_profile_verification.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ agent_id: agentId }),
        });

        const result = await response.json();

        if (result.status === "incomplete") {
            Swal.fire({
                title: "Profile Incomplete",
                text: result.message,
                icon: "info",
                confirmButtonText: "Update Profile",
            }).then(() => {
                window.location.href = "../agent-profile/agent-profile.html";
            });
            return;
        }
    } catch (error) {
        console.error("Verification error:", error);
        Swal.fire("Error", "An error occurred while verifying your profile.", "error");
        return;
    }

    if (!form) {
        console.error("Form with id 'addPropertyForm' not found.");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const submitButton = document.getElementById("submitButton");
        submitButton.disabled = true;
        submitButton.textContent = "Uploading...";

        const formData = new FormData(form);
        formData.append("agent_id", agentId);

        try {
            const response = await fetch("https://ouragent.com.ng/addproperty.php", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            if (result.status === "success") {
                Swal.fire("Success", result.message, "success");
                form.reset();
            } else {
                Swal.fire("Error", result.message || "An unexpected error occurred.", "error");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Submit Property";
        }
    });
});


function toggleRoomBathroomFields() {
    const propertyType = document.getElementById("property-type").value;
    const roomBathroomSection = document.getElementById("roomBathroomSection");

    if (propertyType === "land") {
        roomBathroomSection.style.display = "none";
        // Clear the fields and remove required attribute when hidden
        document.getElementById("roomNo").value = "";
        document.getElementById("bathNo").value = "";
        document.getElementById("roomNo").removeAttribute("required");
        document.getElementById("bathNo").removeAttribute("required");
    } else {
        roomBathroomSection.style.display = "block";
        // Add required attribute back when visible
        document.getElementById("roomNo").setAttribute("required", "true");
        document.getElementById("bathNo").setAttribute("required", "true");
    }
}

function formatCurrency(input) {
    // Remove non-numeric characters except decimal points
    let value = input.value.replace(/[^0-9.]/g, '');

    // Split the number into whole and decimal parts
    let parts = value.split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1] ? parts[1].substring(0, 2) : '';

    // Add comma formatting for thousands
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Reassemble the formatted number
    input.value = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}
function submitButton() {
    const radios = document.querySelectorAll('input[name="category"]');
    const errorSpan = document.getElementById('category-error');
    let isChecked = false;

    radios.forEach((radio) => {
        if (radio.checked) isChecked = true;
    });

    if (!isChecked) {
        errorSpan.textContent = "Please select a category!";
    } else {
        errorSpan.textContent = ""; // Clear error
        alert('Form submitted successfully!');
    }
}
