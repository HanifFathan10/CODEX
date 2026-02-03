const myPersona = {
  name: "Admin CODEX",
  links: [
    {
      title: "WhatsApp Me",
      url: "https://wa.me/628123456789",
      icon: "fa-brands fa-whatsapp",
    },
    {
      title: "Instagram",
      url: "https://instagram.com/hmif_ukri",
      icon: "fa-brands fa-instagram",
    },
    {
      title: "Facebook",
      url: "https://facebook.com/hmif_ukri",
      icon: "fa-brands fa-facebook",
    },
    {
      title: "LinkedIn Profile",
      url: "https://linkedin.com/in/himpunan-mahasiswa-teknik-informatika-hmif-ukri",
      icon: "fa-brands fa-linkedin",
    },
  ],
  skills: [
    { name: "HTML/CSS", level: "90%" },
    { name: "JavaScript", level: "75%" },
    { name: "UI Design", level: "80%" },
    { name: "Node.js", level: "60%" },
  ],
};

function initPersona() {
  const userNameElement = document.getElementById("userName");
  if (userNameElement) userNameElement.innerText = myPersona.name;

  const linksContainer = document.getElementById("linksContainer");
  if (linksContainer) {
    myPersona.links.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.className = "persona-link glass";
      a.innerHTML = `<i class="${link.icon}"></i> <span>${link.title}</span>`;
      linksContainer.appendChild(a);
    });
  }

  const skillsGrid = document.getElementById("skillsGrid");
  if (skillsGrid) {
    myPersona.skills.forEach((skill) => {
      const div = document.createElement("div");
      div.className = "skill-card glass";
      div.innerHTML = `
                <p class="skill-name">${skill.name}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${skill.level}"></div>
                </div>
            `;
      skillsGrid.appendChild(div);
    });
  }
}

const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

const guestForm = document.getElementById("guestbookForm");
const msgList = document.getElementById("messagesList");

if (guestForm && msgList) {
  guestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("senderName").value;
    const msg = document.getElementById("senderMessage").value;

    const msgCard = document.createElement("div");
    msgCard.className = "message-card glass animate-fade-in";
    msgCard.innerHTML = `
            <p style="font-size: 0.75rem; font-weight: 700; color: var(--accent-color);">${name}</p>
            <p style="font-size: 0.875rem; font-style: italic;">"${msg}"</p>
        `;

    msgList.prepend(msgCard);
    guestForm.reset();
  });
}

document.addEventListener("DOMContentLoaded", initPersona);
