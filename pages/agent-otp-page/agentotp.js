const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});

const inputs = document.querySelectorAll(".otp-input");

// Automatically focus on the next input
inputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    if (e.target.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1); // Limit to 1 digit
    }
  });

  // Allow backspace to move to the previous input
  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && input.value === "" && index > 0) {
      inputs[index - 1].focus();
    }
  });

  // Prevent non-numeric input
  input.addEventListener("keypress", (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
    const email = sessionStorage.getItem("email"); // Retrieve email from sessionStorage
  
    if (!email) {
      Swal.fire({
        title: "Session Expired",
        text: "Your session has expired. Redirecting to the registration page...",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "../agent-register-page/agent.html";
      });
      return;
      // Redirect to registration page if no email is found in sessionStorage
  
      return;
    }
  
    const otpForm = document.getElementById("otpForm");
    const resendBtn = document.getElementById("resendBtn");
    const otpSentMessage = document.getElementById("otpSentMessage");
  
    // OTP form submission handler
    otpForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      // Collect OTP input
      const otp = Array.from(document.querySelectorAll(".otp-input"))
        .map((input) => input.value.trim())
        .join("");
  
      if (otp.length !== 6) {
        Swal.fire({
          title: "Invalid OTP",
          text: "Please enter a valid 6-digit OTP.",
          icon: "warning",
          confirmButtonText: "Retry",
        });
        return;
      }
  
      const submitButton = otpForm.querySelector("button[type='submit']");
      submitButton.disabled = true;
      submitButton.textContent = "Verifying...";
  
      try {
        const response = await fetch("https://ouragent.com.ng/agent-otp.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        });
  
        const result = await response.json();
  
        if (result.status === "success") {
          Swal.fire({
            title: "Success",
            text: "OTP verified successfully!",
            icon: "success",
            confirmButtonText: "Proceed",
            confirmButtonColor: "rgba(8, 97, 175, 1)"
          }).then(() => {
            // Redirect to login page
            window.location.href = "../agent-login-page/agent-login.html";
          });
        } else {
          Swal.fire({
            title: "Verification Failed",
            text: result.message || "The OTP you entered is incorrect.",
            icon: "error",
            confirmButtonText: "Retry",
            confirmButtonColor: "rgba(8, 97, 175, 1)"
          });
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while verifying the OTP. Please try again later.",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "rgba(8, 97, 175, 1)"
        });
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Verify";
      }
    });
  
    // Resend OTP handler
    resendBtn.addEventListener("click", async () => {
      resendBtn.disabled = true;
      resendBtn.textContent = "Resending...";
  
      try {
        const response = await fetch("https://ouragent.com.ng/agent_resendotp.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
  
        const result = await response.json();
  
        if (result.status === "success") {
          Swal.fire({
            title: "OTP Sent",
            text: "A new OTP has been sent to your email address.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "rgba(8, 97, 175, 1)"
          });
        } else {
          Swal.fire({
            title: "Resend Failed",
            text: result.message || "Failed to resend OTP. Please try again.",
            icon: "error",
            confirmButtonText: "Retry",
            confirmButtonColor: "rgba(8, 97, 175, 1)"
          });
        }
      } catch (error) {
        console.error("Error resending OTP:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while resending the OTP. Please try again later.",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "rgba(8, 97, 175, 1)"
        });
      } finally {
        resendBtn.disabled = false;
        resendBtn.textContent = "Resend OTP";
      }
    });
  });
  