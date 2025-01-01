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

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("addPropertyForm");
    const agentId = sessionStorage.getItem("agent_id");

    // Check for session expiration
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
        // Verify agent profile
        const response = await fetch("https://ouragent.com.ng/addproperty.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ agent_id: agentId }),
        });

        const result = await response.json();

        // Check if the agent's profile is incomplete
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
        const agentId = sessionStorage.getItem("agent_id");
        const submitButton = document.getElementById("submitButton");
        submitButton.disabled = true;
        submitButton.textContent = "Uploading...";

        const formData = new FormData(form);
        formData.append("agent_id", agentId); // Append agent_id to form data

        try {
            const response = await fetch("https://ouragent.com.ng/addproperty.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    agent_id: agentId,
                    propertyName: formData.get("propertyName"),
                    description: formData.get("description"),
                    price: formData.get("price"),
                    location: formData.get("location"),
                    size: formData.get("size"),
                    propertyType: formData.get("propertyType"),
                    roomNo: formData.get("roomNo"),
                    bathNo: formData.get("bathNo"),
                    category: formData.get("category")
                })
            });

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
