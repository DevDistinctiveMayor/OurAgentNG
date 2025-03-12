const container = document.querySelector(".chart-container");
const data = [180, 120, 160, 100, 140, 80, 130, 90, 150, 110, 170, 140];

data.forEach((value) => {
  const line = document.createElement("div");
  line.className = "line";
  line.style.height = `${value}px`;
  container.appendChild(line);
});

// Add hover effect
const lines = document.querySelectorAll(".line");
lines.forEach((line) => {
  line.addEventListener("mouseenter", () => {
    lines.forEach((l) => (l.style.opacity = "0.5"));
    line.style.opacity = "1";
  });

  line.addEventListener("mouseleave", () => {
    lines.forEach((l) => (l.style.opacity = "1"));
  });
});




document.addEventListener("DOMContentLoaded", function () {
  fetch("https://ouragent.com.ng/admin_dashboard/get_total_user.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        document.getElementById("totalUsers").textContent = data.total_users;
      } else {
        console.error("Error fetching total users:", data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
});



document.addEventListener("DOMContentLoaded", function () {
  fetch("https://ouragent.com.ng/admin_dashboard/get_total_properties.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        document.getElementById("totalProperties").textContent = data.total_properties;
      } else {
        console.error("Error fetching total users:", data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
});


document.addEventListener("DOMContentLoaded", fetchPendingRequests);

// Function to fetch pending profile updates
async function fetchPendingRequests() {
    try {
        const response = await fetch("https://ouragent.com.ng/admin_dashboard/agent_fetchPending_request.php");
        const data = await response.json();

        if (data.status === "success") {
            const requests = data.requests;
            const tableBody = document.getElementById("pendingRequests");

            tableBody.innerHTML = ""; // Clear previous entries

            requests.forEach(request => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${request.full_name}</td>
                    <td>${request.email}</td>
                    <td>${request.phoneNumber}</td>
                    <td>${request.address}</td>
                    <td>
                        <button class="approve-btn" onclick="handleAction(${request.id}, 'approve')">Approve</button>
                        <button class="reject-btn" onclick="handleAction(${request.id}, 'reject')">Reject</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            Swal.fire("Error", "Failed to fetch pending requests.", "error");
        }
    } catch (error) {
        Swal.fire("Error", "An error occurred while fetching requests.", "error");
    }
}

// Function to approve or reject requests
async function handleAction(update_id, action) {
    try {
        console.log(`Sending Request: ID=${update_id}, Action=${action}`);

        const response = await fetch("https://ouragent.com.ng/admin_dashboard/adminApproval.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `update_id=${update_id}&action=${action}`
        });

        const result = await response.json();
        console.log("Response:", result);

        if (result.status === "success") {
            Swal.fire("Success", result.message, "success").then(() => {
                fetchPendingRequests(); // Refresh the list
            });
        } else {
            Swal.fire("Error", result.message, "error");
        }
    } catch (error) {
        console.error("Error in API Call:", error);
        Swal.fire("Error", "An error occurred while processing the request.", "error");
    }
}

document.addEventListener("DOMContentLoaded", async function () {
  const feedbackList = document.getElementById("feedbackList");

  async function fetchFeedback() {
    try {
      const response = await fetch("https://ouragent.com.ng/admin_dashboard/retrieve_feedback.php");
      const data = await response.json();

      if (data.status === "success" && data.feedback.length > 0) {
        displayFeedback(data.feedback);
      } else {
        feedbackList.innerHTML = "<p class='no-feedback'>No feedback available yet.</p>";
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      feedbackList.innerHTML = "<p class='error-message'>Failed to load feedback.</p>";
    }
  }

  function displayFeedback(feedbackArray) {
    feedbackList.innerHTML = feedbackArray
      .map((item) => {
        return `
          <div class="message-box">
            <p class="message-label">Feedback</p>
            <p class="user-name">${item.agent_id}</p>  <!-- Agent ID as Name -->
            <div class="property-details">
              <p class="property-name">Property name</p>
              <p class="time">${formatTime(item.created_at)}</p>
            </div>
            <p class="review-message">${item.feedback}</p>
          </div>
        `;
      })
      .join("");
  }

  function formatTime(dateString) {
    const timeAgo = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - timeAgo) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} secs ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }

  fetchFeedback();
});
