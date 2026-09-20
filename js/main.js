const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const masthead = document.querySelector(".masthead");
const lane = document.getElementById("lane");
const menuBtn = document.querySelector(".menu-btn");

window.addEventListener(
  "scroll",
  () => {
    masthead?.classList.toggle("tight", window.scrollY > 18);
  },
  { passive: true }
);

menuBtn?.addEventListener("click", () => {
  const open = lane?.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

lane?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    lane.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
  });
});

const revealItems = document.querySelectorAll(".rise");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  revealItems.forEach((item) => io.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("revealed"));
}

const magnets = document.querySelectorAll(".magnetic");
magnets.forEach((el) => {
  el.addEventListener("mousemove", (event) => {
    const box = el.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});

const toast = document.getElementById("toast");
const copyButtons = document.querySelectorAll(".copy-ca");
copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-ca") || "";
    try {
      await navigator.clipboard.writeText(value);
      if (toast) {
        toast.textContent = "Mint copied";
        toast.classList.add("show");
        window.setTimeout(() => toast.classList.remove("show"), 1800);
      }
    } catch {
      window.prompt("Copy mint", value);
    }
  });
});

document.addEventListener("pointermove", (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  document.body.style.setProperty("--spot-x", `${x}%`);
  document.body.style.setProperty("--spot-y", `${y}%`);
});
