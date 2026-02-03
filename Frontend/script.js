document.addEventListener("DOMContentLoaded", () => {
  // TODO: Panggil fungsi setupEventListeners()
  // TODO: Panggil fungsi getDataProfile()
  console.log("Aplikasi siap!");
});

function setupEventListeners() {
  const sendBtn = document.querySelector(".btn-chat");
  const inputBox = document.getElementById("user-input");

  // TODO: Tambahkan event listener 'click' pada sendBtn untuk memanggil sendMessage

  // TODO: Tambahkan event listener 'keypress' pada inputBox (Jika tekan Enter, kirim pesan)
}

async function getDataProfile() {
  const nameEl = document.getElementById("userName");
  const roleEl = document.getElementById("user-role");
  // ambil elemen lainnya (bio, links container, skills container)

  try {
    // TODO: Gunakan fetch() untuk mengambil data dari "http://localhost:5000/profile"
    // const response = await fetch(...)

    // TODO: Parsing hasil response ke JSON

    // TODO: Jika status sukses, isi textContent elemen HTML dengan data dari JSON

    console.log("Sedang mengambil data..."); // Hapus baris ini nanti
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
}

function renderLinks(linksData, container) {
  // Kosongkan container dulu
  container.innerHTML = "";

  // TODO: Lakukan Looping (forEach) pada linksData
  // Di dalam loop: Buat elemen <a>, isi class, href, dan innerHTML icon+text
  // Lalu append ke container
}

function renderSkills(skillsData, container) {
  // TODO: Mirip dengan renderLinks, tapi buat elemen <div> untuk skill bar
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const prompt = input.value.trim();

  if (!prompt) return;

  appendMessage("user", prompt);
  input.value = "";

  try {
    // TODO: Fetch ke endpoint "http://localhost:5000/chat" dengan query param ?prompt=...

    // TODO: Tampilkan balasan bot menggunakan appendMessage

    appendMessage("bot", "Halo, fitur ini belum aktif. Silakan coding dulu!");
  } catch (error) {
    appendMessage("bot", "Maaf, sistem error.");
  }
}

function appendMessage(role, text) {
  const chatBox = document.getElementById("chat-box");

  // TODO: Buat elemen div baru
  // TODO: Beri class 'message' dan role (user/bot)
  // TODO: Isi text dan masukkan ke chatBox
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
