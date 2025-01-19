const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});


document.getElementById("resetForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const submitButton = document.getElementById("submitButton");
//   const responseMessage = document.getElementById("responseMessage");

  // Disable the button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = "Processing...";
  try {
    const response = await fetch("https://ouragent.com.ng/agentforgot_password.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (result.success) {
        // Success: Notify OTP sent and redirect to the reset password page
        Swal.fire({
            title: "OTP Sent",
            text: "A password reset OTP has been sent to your email.",
            icon: "success",
            confirmButtonText: "Proceed",
            confirmButtonColor: "rgba(8, 97, 175, 1)", // Green confirm button

        }).then(() => {
            window.location.href = "../agent-resetpassword-page/reset.html"; // Redirect to reset password page
        });
    } else {
        // Display error message using SweetAlert
        Swal.fire({
            title: "Error",
            text: result.message || "Failed to send OTP. Please try again.",
            icon: "error",
            confirmButtonText: "Retry",
        });
    }
} catch (error) {
    // Handle unexpected errors
    Swal.fire({
        title: "Unexpected Error",
        text: "An error occurred while sending the OTP. Please try again later.",
        icon: "error",
        confirmButtonText: "Retry",
    });
} finally {
    // Re-enable the button and remove loading state
    submitButton.disabled = false;
    submitButton.textContent = "Get OTP";
}

});


