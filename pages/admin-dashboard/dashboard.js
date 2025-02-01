// Get the canvas element
const ctx = document.getElementById("chart").getContext("2d");

// Create a Chart
new Chart(ctx, {
  type: "bar", // Base type (can be 'bar' or 'line')
  data: {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Sales (Bar)",
        data: [10, 20, 30, 40],
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue color
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Growth (Line)",
        data: [5, 15, 25, 35],
        type: "line", // Line dataset on top of bar chart
        borderColor: "red",
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 5,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  },
});
