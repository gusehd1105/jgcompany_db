const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwvBZ8eR4nhP4Qh9XVEpgYq-1IiRxCZc-SfMWGjcZGubENjCUkdL_8cVTHHbNdo/exec";

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
const successModal = document.getElementById("successModal");
const successClose = document.getElementById("successClose");

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

successClose.addEventListener("click", () => {
  successModal.classList.remove("show");
});

successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    successModal.classList.remove("show");
  }
});

const leadForm = document.getElementById("leadForm");
const nameInput = leadForm.name;
const phone2Input = leadForm.phone2;
const phone3Input = leadForm.phone3;

nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, "");
});

[phone2Input, phone3Input].forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9]/g, "").slice(0, 4);
  });
});

leadForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const phone2 = this.phone2.value.trim();
  const phone3 = this.phone3.value.trim();

  if (!/^[가-힣ㄱ-ㅎㅏ-ㅣ\s]+$/.test(name) || name.length < 1) {
    document.getElementById("result").textContent =
      "성함은 한글로 입력해주세요.";
    this.name.focus();
    return;
  }

  if (!/^[0-9]{4}$/.test(phone2) || !/^[0-9]{4}$/.test(phone3)) {
    document.getElementById("result").textContent =
      "연락처를 끝까지 정확히 입력해주세요.";
    return;
  }

  const phone = this.phone1.value + "-" + phone2 + "-" + phone3;

  const telecom = document
    .querySelectorAll(".question")[0]
    .querySelector(".active").textContent;

  const product = document
    .querySelectorAll(".question")[1]
    .querySelector(".active").textContent;

  const time = document
    .querySelectorAll(".question")[2]
    .querySelector(".active").textContent;

  const submitBtn = this.querySelector(".submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "신청 중...";

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        name,
        phone,
        telecom,
        product,
        time,
      }),
    });

    document.getElementById("result").textContent = "";
    successModal.classList.add("show");

    this.reset();

    document.querySelectorAll(".option-grid").forEach((group) => {
      group
        .querySelectorAll(".option")
        .forEach((btn) => btn.classList.remove("active"));
      group.querySelector(".option").classList.add("active");
    });
  } catch (error) {
    console.error(error);
    document.getElementById("result").textContent =
      "신청 중 오류가 발생했습니다. 다시 시도해주세요.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "최대 지원금 확인하기";
  }
});

const reviewToday = new Date();
const reviewTodayText = `${reviewToday.getFullYear()}-${String(
  reviewToday.getMonth() + 1,
).padStart(2, "0")}-${String(reviewToday.getDate()).padStart(2, "0")}`;

const telecomRoutes = [
  "LG > SK",
  "SK > LG",
  "KT > LG",
  "LG > KT",
  "SK > KT",
  "KT > SK",
  "LG 신규",
  "SK 신규",
  "KT 신규",
];

const reviews = [
  ["김*현", "상담이 생각보다 빠르게 진행돼서 좋았습니다. 조건도 깔끔하게 설명해줘서 바로 신청했어요."],
  ["박*준", "복잡할 줄 알았는데 필요한 내용만 알려줘서 편했습니다. 설치 일정도 빠르게 잡혔어요."],
  ["이*영", "지원금 기준을 자세히 설명해줘서 믿고 진행했습니다. 상담원이 친절했어요."],
  ["최*민", "기존 요금이랑 비교해서 알려줘서 선택하기 쉬웠습니다. 안내가 깔끔했습니다."],
  ["정*우", "전화 상담 후 바로 진행했는데 생각보다 절차가 간단했습니다. 만족합니다."],
  ["강*서", "상품별 차이를 쉽게 설명해줘서 좋았습니다. 괜히 오래 고민했네요."],
  ["윤*아", "상담 시간이 짧았는데 핵심만 잘 알려줬습니다. 조건도 만족스러웠어요."],
  ["송*훈", "처음 신청해보는 거라 걱정했는데 안내가 친절해서 편하게 했습니다."],
  ["한*진", "지원금이랑 설치 날짜를 한 번에 확인할 수 있어서 좋았습니다."],
  ["오*민", "상담 후 바로 비교가 되니까 결정하기 쉬웠습니다. 응대도 빨랐어요."],
  ["임*지", "문의 남기고 금방 연락이 와서 좋았습니다. 설명도 차분하게 해줬어요."],
  ["유*석", "요금제 설명이 복잡하지 않아서 좋았습니다. 부모님 집도 추가로 문의했어요."],
  ["배*아", "설치 가능 여부부터 혜택까지 한 번에 안내받았습니다. 편했습니다."],
  ["문*준", "불필요한 말 없이 조건을 바로 알려줘서 좋았습니다. 상담 만족합니다."],
  ["신*호", "기존 인터넷 약정 끝나서 문의했는데 비교 안내가 도움이 많이 됐습니다."],
  ["홍*연", "상담 신청 후 연락이 빨랐고 진행 과정도 어렵지 않았습니다."],
  ["장*민", "혜택 차이를 정확히 알려줘서 결정하기 쉬웠습니다. 친절했어요."],
  ["서*빈", "설치 일정까지 같이 잡아줘서 편했습니다. 안내가 빠르고 깔끔했습니다."],
  ["전*우", "전화로 자세히 알려줘서 믿고 신청했습니다. 조건도 만족스러웠습니다."],
  ["조*현", "상품 선택이 어려웠는데 상황에 맞게 추천해줘서 좋았습니다."],
  ["안*민", "상담원이 차분하게 설명해줘서 이해하기 쉬웠습니다. 신청까지 금방 했어요."],
  ["백*서", "지원금 안내가 투명해서 좋았습니다. 추가 문의도 바로 답변 받았습니다."],
  ["황*민", "상담 가능 시간에 맞춰 연락줘서 편했습니다. 진행도 빠릅니다."],
  ["차*현", "인터넷이랑 TV 같이 묶는 조건을 잘 설명해줘서 만족했습니다."],
  ["노*진", "처음엔 반신반의했는데 상담 받아보니 정리가 잘 됐습니다."],
  ["하*준", "요금이랑 혜택을 비교해서 알려줘서 바로 결정할 수 있었습니다."],
  ["김*아", "상담 신청하고 금방 연락이 왔습니다. 안내 내용도 이해하기 쉬웠어요."],
  ["박*현", "설치 가능 지역 확인부터 빠르게 도와줘서 좋았습니다."],
  ["이*서", "여러 상품 중에 뭐가 나은지 알려줘서 선택이 쉬웠습니다."],
  ["최*영", "친절하고 빠른 상담이 좋았습니다. 조건도 괜찮아서 신청했어요."],
];

const reviewTrack = document.getElementById("reviewTrack");

function getRouteByIndex(index) {
  return telecomRoutes[index % telecomRoutes.length];
}

function makeReviewCard(review, index) {
  const [name, text] = review;

  return `
    <div class="review-card">
      <div class="review-top">
        <span class="review-name">${name}</span>
        <span class="review-date">${reviewTodayText}</span>
      </div>

      <div class="review-stars">★★★★★</div>

      <p class="review-text">${text}</p>

      <div class="review-bottom">
        <span class="review-telecom">${getRouteByIndex(index)}</span>
        <span class="review-badge">설치 후기</span>
      </div>
    </div>
  `;
}

reviews.forEach((review, index) => {
  reviewTrack.insertAdjacentHTML("beforeend", makeReviewCard(review, index));
});

let reviewIndex = 0;

function moveReviewSlider() {
  const slider = document.querySelector(".review-slider");
  const card = document.querySelector(".review-card");

  if (!slider || !card) return;

  const gap = 14;
  const cardWidth = card.offsetWidth;
  const sliderWidth = slider.offsetWidth;
  const centerOffset = (sliderWidth - cardWidth) / 2;

  reviewTrack.style.transform = `translateX(${centerOffset - (cardWidth + gap) * reviewIndex}px)`;
}

window.addEventListener("load", moveReviewSlider);
window.addEventListener("resize", moveReviewSlider);

setInterval(() => {
  reviewIndex++;

  if (reviewIndex >= reviews.length) {
    reviewIndex = 0;
  }

  moveReviewSlider();
}, 5600);