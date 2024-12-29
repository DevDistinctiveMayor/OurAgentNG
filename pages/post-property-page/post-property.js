const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});

const urlParams = new URLSearchParams(window.location.search);
const agentId = urlParams.get("agent_id");

// const agentId = sessionStorage.getItem("agent_id");
const agentName = sessionStorage.getItem("agent_name");
const phoneNo = sessionStorage.getItem("phone_no");

document.addEventListener("DOMContentLoaded", async () => {

    if (!agentName || !phoneNo) {
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

    // Add event listener to the post property form
    document.getElementById("post-property-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        // Append agent details to the form data
        formData.append("agent_name", agentName);
        formData.append("phone_no", phoneNo);

        const submitButton = form.querySelector("button[type='submit']");
        submitButton.disabled = true;
        submitButton.textContent = "Processing...";

        try {
            const response = await fetch("https://ouragent.com.ng/addproperty.php", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.status === "success") {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: data.message,
                }).then(() => form.reset());
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: data.message,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "An error occurred while posting the property.",
            });
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Post Your Property";
        }
    });
});
