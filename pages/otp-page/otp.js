
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});

const inputs = document.querySelectorAll('.otp-input');
const otpForm = document.getElementById('otpForm');
const successMessage = document.getElementById('successMessage');
const otpSentMessage = document.getElementById('otpSentMessage');
const resendBtn = document.getElementById('resendBtn');
const resendContainer = document.getElementById('resendContainer');

// Automatically focus on the next input
inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
        if (e.target.value.length > 1) {
            e.target.value = e.target.value.slice(0, 1); // Limit to 1 digit
        }
    });

    // Allow backspace to move to the previous input
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && input.value === '' && index > 0) {
            inputs[index - 1].focus();
        }
    });

    // Prevent non-numeric input
    input.addEventListener('keypress', (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    });
});

// Submit handler to validate OTP
otpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const otp = Array.from(inputs)
        .map(input => input.value)
        .join('');

    if (otp.length === 6) {
        // Show success message
        successMessage.style.display = 'block';
        resendContainer.style.display = 'none'; // Hide resend button after OTP is verified
    } else {
        alert('Please complete the OTP input.');
    }
});
