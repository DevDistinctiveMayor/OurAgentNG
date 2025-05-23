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


fetch('https://ouragent.com.ng/admin_dashboard/get_client.php')
  .then(res => res.json())
  .then(data => {
    if (data.status !== 'success') {
      console.error('Error fetching clients:', data.message);
      return;
    }

    const container = document.getElementById('clientTableContainer');
    const wrapper = document.createElement('div');
    wrapper.className = 'scrollable-wrapper';

    const table = document.createElement('table');
    table.className = 'client-table';

    // Header HTML (with # column)
    table.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        ${data.clients.map((client, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${client.fullName}</td>
            <td>${client.email}</td>
            <td>${client.phone}</td>
            <td>${client.category}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

    wrapper.appendChild(table);
    container.appendChild(wrapper);
  })
  .catch(err => console.error('Fetch error:', err));


  fetch('https://ouragent.com.ng/admin_dashboard/get_agent.php')
  .then(res => res.json())
  .then(data => {
    if (data.status !== 'success') {
      console.error('Error fetching agents:', data.message);
      return;
    }

    const container = document.getElementById('agentTableContainer');
    const wrapper = document.createElement('div');
    wrapper.className = 'scrollable-wrapper';

    const table = document.createElement('table');
    table.className = 'client-table';

    // Table headers
    table.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Company</th>
          <th>Phone</th>
          <th>Address</th>
          <th>NIN</th>
          <th>CAC</th>
          <th>Last Login</th>
          <th>Total Properties</th>
          <th>Verification Status</th>
        </tr>
      </thead>
      <tbody>
        ${data.clients.map((agent, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${agent.fullName}</td>
            <td>${agent.email}</td>
            <td>${agent.companyName}</td>
            <td>${agent.phoneNumber}</td>
            <td>${agent.address}</td>
            <td>${agent.ninNumber}</td>
            <td>${agent.cacNumber}</td>
            <td>${agent.lastLoginAt}</td>
            <td>${agent.totalPropertiesPosted}</td>
            <td>${agent.verificationStatus}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

    wrapper.appendChild(table);
    container.appendChild(wrapper);
  })
  .catch(err => console.error('Fetch error:', err));

  google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawActivityTrendChart);

function drawActivityTrendChart() {
  fetch('https://ouragent.com.ng/admin_dashboard/get_trends.php')
    .then(res => res.json())
    .then(data => {
      const chartData = google.visualization.arrayToDataTable(data);

      const options = {
        title: 'Activity Trends Over Time',
        hAxis: { title: 'Date' },
        vAxis: { title: 'Count' },
        curveType: 'function',
        legend: { position: 'top' },
        colors: ['#1E88E5', '#F4511E', '#43A047']
      };

      const chart = new google.visualization.LineChart(document.getElementById('activityTrendChart'));
      chart.draw(chartData, options);
    })
    .catch(err => console.error('Trend chart error:', err));
}
