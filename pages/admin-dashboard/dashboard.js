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
