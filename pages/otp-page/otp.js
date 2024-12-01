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
      alert("No email found. Please register first.");
      window.location.href = "../registered-page/register.html";
      return;
    }
  
    document.getElementById("otpForm").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      // Collect all digits into a single string
      const otp = Array.from(document.querySelectorAll(".otp-input"))
        .map((input) => input.value)
        .join("");
  
      if (otp.length === 6) {
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
            document.getElementById("successMessage").style.display = "block";
            window.location.href = "../login-page/login.html";
            alert(result.message);
            // Redirect or notify the user
          } else {
            alert(result.message || "Failed to verify OTP.");
          }
        } catch (error) {
          console.error("Error verifying OTP:", error);
          alert("An error occurred while verifying the OTP.");
        }
      } else {
        alert("Please complete the OTP input.");
      }
    });
  
    document.getElementById("resendBtn").addEventListener("click", async () => {
      try {
        const response = await fetch("https://ouragent.com.ng/resendotp.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
  
        const result = await response.json();
  
        if (result.success) {
          document.getElementById("otpSentMessage").style.display = "block";
          alert(result.message || "OTP has been resent.");
        } else {
          alert(result.message || "Failed to resend OTP.");
        }
      } catch (error) {
        console.error("Error resending OTP:", error);
        alert("An error occurred while resending the OTP.");
      }
    });
  });
  