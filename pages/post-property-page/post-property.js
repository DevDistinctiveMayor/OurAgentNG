const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});


document.getElementById("post-property-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const form = e.target;
    const formData = new FormData(form);

    // Select the submit button
    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Processing...";

    // Clear previous error messages
    document.querySelectorAll(".error-message").forEach((el) => {
        el.textContent = "";
        el.style.display = "none";
    });

    let hasError = false;

    // Validate file upload: Number of files
    const images = form.querySelector("input[type='file']").files;
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (images.length > 3) {
        const errorElement = document.getElementById("images-error");
        errorElement.textContent = "You can only upload up to 3 images.";
        errorElement.style.display = "block";
        hasError = true;
    }

    // Validate file upload: File size
    for (const file of images) {
        if (file.size > maxFileSize) {
            const errorElement = document.getElementById("images-error");
            errorElement.textContent = `${file.name} is larger than 5MB. Please upload smaller images.`;
            errorElement.style.display = "block";
            hasError = true;
        }
    }

    // Validate required fields
    form.querySelectorAll("input[required], textarea[required], select[required]").forEach((field) => {
        if (!field.value.trim()) {
            const errorElement = document.getElementById(`${field.name}-error`);
            if (errorElement) {
                errorElement.textContent = `${field.placeholder || field.name} is required.`;
                errorElement.style.display = "block";
            }
            hasError = true;
        }
    });

    if (hasError) {
        submitButton.disabled = false;
        submitButton.textContent = "Register";
        return; // Stop execution if there are validation errors
    }

    try {
        // Send the form data to the server
        const response = await fetch("https://ouragent.com.ng/addproperty.php", {
            method: "POST",
            body: formData,
        });

        // Parse the JSON response
        const data = await response.json();

        if (data.status === "success") {
            // Show success message
            alert(data.message || "Property added successfully!");
            form.reset(); // Optionally, reset the form
        } else if (data.status === "error") {
            // Display backend error messages
            const errors = data.errors || {};
            for (const field in errors) {
                const errorElement = document.getElementById(`${field}-error`);
                if (errorElement) {
                    errorElement.textContent = errors[field];
                    errorElement.style.display = "block";
                }
            }

            // General error message (if any)
            if (data.message) {
                alert(data.message);
            }
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again later.");
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = "Register";
    }
});

