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
  const email = sessionStorage.getItem("email");

  if (!email) {
    Swal.fire({
      title: "Session Expired",
      text: "Your session has expired. Redirecting to the registration page...",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.href = "../registered-page/register.html";
    });
    return;
  }


  const otpForm = document.getElementById("otpForm");
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
      const response = await fetch("https://ouragent.com.ng/otp.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

     
      if (result.status === "success") {
        Swal.fire({
          title: "OTP Verified",
          text: "Your OTP has been verified successfully!",
          icon: "success",
          confirmButtonText: "Proceed",
        }).then(() => {
          window.location.href = "../login-page/login.html";
        });
      } else {
        Swal.fire({
          title: "Verification Failed",
          text: result.message || "The OTP entered is incorrect. Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while verifying the OTP. Please try again later.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Verify";
    }
  });

  resendBtn.addEventListener("click", async () => {
    resendBtn.disabled = true;
    resendBtn.textContent = "Resending...";

    try {
      const response = await fetch("https://ouragent.com.ng/resendotp.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.status === "success") {
        Swal.fire({
          title: "OTP Verified",
          text: "OTP has been resent.",
          icon: "success",
          confirmButtonText: "Proceed",
    
        });
      } else {
        Swal.fire({
          title: "Verification Failed",
          text: result.message || "Failed to resend OTP.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while verifying the OTP. Please try again later.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Resend OTP";
    }
  });
});

