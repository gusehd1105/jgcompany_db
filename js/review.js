// =========================================
// 후기 슬라이더
// =========================================

const reviewTrack = document.getElementById("reviewTrack");

// ===============================
// 통신사 이동 표시
// ===============================

function getRouteByIndex(index) {
  return telecomRoutes[index % telecomRoutes.length];
}

// ===============================
// 후기 카드 생성
// ===============================

function makeReviewCard(review, index) {
  const [name, text] = review;

  return `
    <div class="review-card">

      <div class="review-top">
        <span class="review-name">${name}</span>
        <span class="review-date">${reviewTodayText}</span>
      </div>

      <div class="review-stars">
        ★★★★★
      </div>

      <p class="review-text">
        ${text}
      </p>

      <div class="review-bottom">

        <span class="review-telecom">
          ${getRouteByIndex(index)}
        </span>

        <span class="review-badge">
          설치 후기
        </span>

      </div>

    </div>
  `;
}

// ===============================
// 후기 생성
// ===============================

reviews.forEach((review, index) => {
  reviewTrack.insertAdjacentHTML(
    "beforeend",
    makeReviewCard(review, index)
  );
});

// ===============================
// 슬라이더
// ===============================

let reviewIndex = 0;

function moveReviewSlider() {

  const slider =
    document.querySelector(".review-slider");

  const card =
    document.querySelector(".review-card");

  if (!slider || !card) return;

  const gap = 14;

  const cardWidth = card.offsetWidth;

  const sliderWidth = slider.offsetWidth;

  const centerOffset =
    (sliderWidth - cardWidth) / 2;

  reviewTrack.style.transform =
    `translateX(${centerOffset - (cardWidth + gap) * reviewIndex}px)`;

}

// 처음 위치
window.addEventListener("load", moveReviewSlider);

// 화면 크기 변경
window.addEventListener("resize", moveReviewSlider);

// 자동 슬라이드
setInterval(() => {

  reviewIndex++;

  if (reviewIndex >= reviews.length) {
    reviewIndex = 0;
  }

  moveReviewSlider();

}, 5600);