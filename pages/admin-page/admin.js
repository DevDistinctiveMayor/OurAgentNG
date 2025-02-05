document.addEventListener("DOMContentLoaded", fetchPendingRequests);

// Function to fetch pending profile updates
async function fetchPendingRequests() {
    try {
        const response = await fetch("https://ouragent.com.ng/agent_fetchPending_request.php");
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

        const response = await fetch("https://ouragent.com.ng/adminApproval.php", {
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
