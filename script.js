document.querySelectorAll(".move-form").forEach((image) => {
  image.addEventListener("click", () => {
    document.getElementById("formSection").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

document.querySelectorAll(".option-grid").forEach((group) => {
  const buttons = group.querySelectorAll(".option");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});

const privacyOpen = document.getElementById("privacyOpen");
const privacyClose = document.getElementById("privacyClose");
const privacyModal = document.getElementById("privacyModal");

privacyOpen.addEventListener("click", () => {
  privacyModal.classList.add("show");
});

privacyClose.addEventListener("click", () => {
  privacyModal.classList.remove("show");
});

privacyModal.addEventListener("click", (e) => {
  if (e.target === privacyModal) {
    privacyModal.classList.remove("show");
  }
});

const leadForm = document.getElementById("leadForm");
const nameInput = leadForm.name;
const phone2Input = leadForm.phone2;
const phone3Input = leadForm.phone3;

nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value.replace(/[^가-힣]/g, "");
});

[phone2Input, phone3Input].forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9]/g, "").slice(0, 4);
  });
});

leadForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const phone2 = this.phone2.value.trim();
  const phone3 = this.phone3.value.trim();

  if (!/^[가-힣]{2,5}$/.test(name)) {
    document.getElementById("result").textContent =
      "성함은 한글 2~5자로 입력해주세요.";
    this.name.focus();
    return;
  }

  if (!/^[0-9]{3,4}$/.test(phone2) || !/^[0-9]{4}$/.test(phone3)) {
    document.getElementById("result").textContent =
      "연락처를 숫자로 정확히 입력해주세요.";
    return;
  }

  const phone = this.phone1.value + "-" + phone2 + "-" + phone3;

  console.log({
    telecom: document.querySelectorAll(".question")[0].querySelector(".active")
      .textContent,
    product: document.querySelectorAll(".question")[1].querySelector(".active")
      .textContent,
    time: document.querySelectorAll(".question")[2].querySelector(".active")
      .textContent,
    name,
    phone,
  });

  document.getElementById("result").textContent =
    "신청이 완료되었습니다. 곧 연락드리겠습니다.";

  this.reset();

  document.querySelectorAll(".option-grid").forEach((group) => {
    group
      .querySelectorAll(".option")
      .forEach((btn) => btn.classList.remove("active"));
    group.querySelector(".option").classList.add("active");
  });
});

const todayText = document.getElementById("todayText");
const today = new Date();

todayText.textContent = `${today.getFullYear()}-${String(
  today.getMonth() + 1,
).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")} 기준`;

const customers = [
  "김*현",
  "김*우",
  "김*민",
  "김*서",
  "김*진",
  "김*아",
  "김*영",
  "김*훈",
  "박*준",
  "박*희",
  "박*호",
  "박*빈",
  "박*연",
  "박*수",
  "박*영",
  "박*재",
  "이*영",
  "이*호",
  "이*민",
  "이*은",
  "이*준",
  "이*서",
  "이*진",
  "이*원",
  "최*민",
  "최*훈",
  "최*아",
  "최*우",
  "최*영",
  "최*서",
  "최*빈",
  "최*재",
  "정*우",
  "정*민",
  "정*현",
  "정*아",
  "정*훈",
  "정*연",
  "정*빈",
  "정*호",
  "강*서",
  "강*성",
  "강*훈",
  "강*민",
  "강*아",
  "강*우",
  "강*진",
  "강*연",
  "윤*아",
  "윤*호",
  "윤*민",
  "윤*서",
  "윤*재",
  "윤*빈",
  "윤*진",
  "윤*영",
  "송*훈",
  "송*현",
  "송*아",
  "송*민",
  "송*우",
  "송*연",
  "송*빈",
  "송*재",
  "한*진",
  "한*우",
  "한*서",
  "한*민",
  "한*호",
  "한*아",
  "한*연",
  "한*빈",
  "오*라",
  "오*민",
  "오*현",
  "오*준",
  "오*서",
  "오*영",
  "오*훈",
  "오*빈",
  "임*지",
  "임*현",
  "임*우",
  "임*민",
  "임*서",
  "임*아",
  "임*호",
  "임*연",
  "유*석",
  "유*민",
  "유*빈",
  "유*진",
  "유*서",
  "유*호",
  "유*아",
  "유*재",
  "배*아",
  "배*현",
  "배*민",
  "배*준",
  "배*서",
  "배*영",
  "배*호",
  "배*진",
  "문*준",
  "문*영",
  "문*서",
  "문*민",
  "문*훈",
  "문*아",
  "문*재",
  "문*빈",
  "신*호",
  "신*민",
  "신*우",
  "신*아",
  "신*서",
  "신*연",
  "신*현",
  "신*재",
  "홍*연",
  "홍*민",
  "홍*우",
  "홍*서",
  "홍*진",
  "홍*빈",
  "홍*아",
  "홍*호",
  "장*원",
  "장*민",
  "장*희",
  "장*우",
  "장*서",
  "장*현",
  "장*빈",
  "장*호",
  "남*희",
  "남*우",
  "남*민",
  "남*진",
  "남*아",
  "남*서",
  "남*현",
  "남*훈",
  "권*수",
  "권*민",
  "권*호",
  "권*서",
  "권*영",
  "권*빈",
  "권*재",
  "권*아",
  "서*빈",
  "서*준",
  "서*현",
  "서*우",
  "서*아",
  "서*영",
  "서*민",
  "서*호",
  "전*경",
  "전*민",
  "전*우",
  "전*서",
  "전*현",
  "전*아",
  "전*빈",
  "전*호",
  "조*율",
  "조*민",
  "조*현",
  "조*아",
  "조*우",
  "조*서",
  "조*빈",
  "조*호",
  "안*호",
  "안*민",
  "안*서",
  "안*현",
  "안*우",
  "안*아",
  "안*빈",
  "안*재",
  "백*희",
  "백*민",
  "백*우",
  "백*서",
  "백*현",
  "백*아",
  "백*빈",
  "백*호",
  "황*경",
  "황*민",
  "황*우",
  "황*서",
  "황*현",
  "황*아",
  "황*빈",
  "황*호",
];

const telecoms = ["LG", "SKT", "KT"];

const productPool = [
  "인터넷+TV+유심",
  "인터넷+TV+유심",
  "인터넷+TV+유심",
  "인터넷+TV+유심",
  "인터넷+TV+유심",
  "인터넷+TV+유심",
  "인터넷+TV",
  "인터넷+TV",
  "인터넷+TV",
  "인터넷",
  "인터넷",
];

const statusTypes = [
  { text: "상담중", className: "badge-call" },
  { text: "진행중", className: "badge-wait" },
  { text: "상담완료", className: "badge-done" },
  { text: "지급완료", className: "badge-paid" },
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeRow() {
  const status = randomItem(statusTypes);

  return `
    <div class="table-row">
      <span>${randomItem(customers)}</span>
      <span>${randomItem(telecoms)}</span>
      <span>${randomItem(productPool)}</span>
      <span>
        <span class="badge ${status.className}">
          ${status.text}
        </span>
      </span>
    </div>
  `;
}

const statusList = document.getElementById("statusList");

for (let i = 0; i < 12; i++) {
  statusList.insertAdjacentHTML("beforeend", makeRow());
}

setInterval(() => {
  statusList.style.transition = "transform 1s ease";
  statusList.style.transform = "translateY(-55px)";

  setTimeout(() => {
    statusList.style.transition = "none";
    statusList.style.transform = "translateY(0)";
    statusList.firstElementChild.remove();
    statusList.insertAdjacentHTML("beforeend", makeRow());
  }, 1050);
}, 7200);

let todayCount = 45;
let consultCount = 892;
let installCount = 4200;

const todayCountEl = document.getElementById("todayCount");
const consultCountEl = document.getElementById("consultCount");
const installCountEl = document.getElementById("installCount");

todayCountEl.textContent = todayCount.toLocaleString();
consultCountEl.textContent = consultCount.toLocaleString();
installCountEl.textContent = installCount.toLocaleString();

function countUp(element, start, end, duration) {
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(start + (end - start) * progress);

    element.textContent = value.toLocaleString();

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

setInterval(() => {
  const nextToday = todayCount + 1;
  countUp(todayCountEl, todayCount, nextToday, 2400);
  todayCount = nextToday;
}, 24000);

setInterval(() => {
  const nextConsult = consultCount + 1;
  countUp(consultCountEl, consultCount, nextConsult, 2800);
  consultCount = nextConsult;
}, 32000);
