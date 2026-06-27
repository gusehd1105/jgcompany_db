// =========================================
// Modal
// =========================================

const privacyOpen = document.getElementById("privacyOpen");
const privacyClose = document.getElementById("privacyClose");
const privacyModal = document.getElementById("privacyModal");

const successModal = document.getElementById("successModal");
const successClose = document.getElementById("successClose");

// ===============================
// 개인정보 처리방침
// ===============================

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

// ===============================
// 신청 완료 팝업
// ===============================

successClose.addEventListener("click", () => {
  closeSuccessModal();
});

successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    closeSuccessModal();
  }
});

// ===============================
// 함수
// ===============================

function openSuccessModal() {
  successModal.classList.add("show");
}

function closeSuccessModal() {
  successModal.classList.remove("show");
}

function openPrivacyModal() {
  privacyModal.classList.add("show");
}

function closePrivacyModal() {
  privacyModal.classList.remove("show");
}