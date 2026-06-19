const topImage = document.getElementById("topImage");

const topImages = ["img1-1.png", "img1-2.png"];
let imageIndex = 0;

setInterval(() => {
  imageIndex = imageIndex === 0 ? 1 : 0;
  topImage.src = topImages[imageIndex];
}, 1000);

document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const phone = this.phone.value.trim();
  const message = this.message.value.trim();

  if (!name || !phone) {
    document.getElementById("result").textContent =
      "이름과 연락처를 입력해주세요.";
    return;
  }

  console.log({ name, phone, message });

  document.getElementById("result").textContent =
    "신청이 완료되었습니다. 곧 연락드리겠습니다.";
  this.reset();
});

const names = [
  "임*지",
  "이*호",
  "유*석",
  "김*현",
  "김*명",
  "박*희",
  "최*민",
  "정*우",
  "한*진",
  "오*라",
  "강*수",
  "윤*영",
  "송*훈",
  "배*아",
  "문*준",
];

const statuses = ["상담중", "신청완료", "현금지급완료"];

function getToday() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function makeLiveItems() {
  const liveList = document.getElementById("liveList");
  const today = getToday();

  let items = [];

  for (let i = 0; i < 20; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    items.push(`
      <div class="live-item">
        <div class="live-name">${name}</div>
        <div class="live-date">${today}</div>
        <div class="live-status">${status}</div>
      </div>
    `);
  }

  items = shuffleArray(items);

  liveList.innerHTML = items.join("") + items.join("");
}

makeLiveItems();
