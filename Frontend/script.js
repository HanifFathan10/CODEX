document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  getDataProfile();
});

function setupEventListeners() {
  const sendBtn = document.querySelector(".btn-chat");
  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
  }

  const inputBox = document.getElementById("user-input");
  if (inputBox) {
    inputBox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
}

async function getDataProfile() {
  const nameEl = document.getElementById("userName");
  const roleEl = document.getElementById("user-role");
  const bioEl = document.getElementById("user-bio");
  const linksContainer = document.getElementById("linksContainer");
  const skillsContainer = document.getElementById("skillsGrid");

  try {
    const response = await fetch("http://localhost:5000/profile");
    const result = await response.json();

    if (result.status === true) {
      const data = result.data;

      if (nameEl) nameEl.textContent = data.profile.name;
      if (roleEl) roleEl.textContent = data.profile.role;
      if (bioEl) bioEl.textContent = data.profile.bio;

      if (linksContainer && data.links) {
        renderLinks(data.links, linksContainer);
      }

      if (skillsContainer && data.skills) {
        renderSkills(data.skills, skillsContainer);
      }
    }
  } catch (error) {
    appendMessage("bot", "Gagal memuat data profil.");
  }
}

function renderLinks(linksData, container) {
  container.innerHTML = "";

  linksData.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.className = "persona-link glass";
    a.innerHTML = `<i class="${link.icon}"></i> <span>${link.title}</span>`;
    linksContainer.appendChild(a);

    container.appendChild(a);
  });
}

function renderSkills(skillsData, container) {
  container.innerHTML = "";

  skillsData.forEach((skill) => {
    const div = document.createElement("div");
    div.className = "skill-card glass";
    div.innerHTML = `
                <p class="skill-name">${skill.name}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${skill.level}"></div>
                </div>
            `;
    skillsGrid.appendChild(div);

    container.appendChild(div);
  });
}

function setupEventListeners() {
  const sendBtn = document.querySelector(".btn-chat");
  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
  }

  const inputBox = document.getElementById("user-input");
  if (inputBox) {
    inputBox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
}

function appendMessage(role, text) {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");

  msgDiv.className = `message ${role}`;
  msgDiv.innerText = text;

  chatBox.appendChild(msgDiv);

  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const prompt = input.value.trim();

  if (!prompt) return;

  appendMessage("user", prompt);
  input.value = "";

  try {
    const response = await fetch(
      `http://localhost:5000/chat?prompt=${encodeURIComponent(prompt)}`,
    );
    const result = await response.json();

    if (result.status === "success") {
      appendMessage("bot", result.message.content);
    } else {
      appendMessage("bot", "Maaf, saya sedang pusing. Coba lagi nanti.");
    }
  } catch (error) {
    appendMessage("bot", "Maaf, sistem sedang offline.");
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
