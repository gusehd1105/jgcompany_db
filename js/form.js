// =========================================
// 상담 신청
// =========================================

const leadForm = document.getElementById("leadForm");

const nameInput = leadForm.name;
const phone2Input = leadForm.phone2;
const phone3Input = leadForm.phone3;

// ===============================
// 입력 제한
// ===============================

// 이름(한글만)
nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, "");
});

// 전화번호(숫자만)
[phone2Input, phone3Input].forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value
      .replace(/[^0-9]/g, "")
      .slice(0, 4);
  });
});

// ===============================
// 신청
// ===============================

leadForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const phone2 = this.phone2.value.trim();
  const phone3 = this.phone3.value.trim();

  // 이름 검사
  if (!/^[가-힣ㄱ-ㅎㅏ-ㅣ\s]{1,10}$/.test(name)) {
    document.getElementById("result").textContent =
      "성함은 한글 10자 이내로 입력해주세요.";

    this.name.focus();
    return;
  }

  // 전화번호 검사
  if (
    !/^[0-9]{4}$/.test(phone2) ||
    !/^[0-9]{4}$/.test(phone3)
  ) {
    document.getElementById("result").textContent =
      "연락처를 끝까지 정확히 입력해주세요.";

    return;
  }

  const phone =
    this.phone1.value +
    "-" +
    phone2 +
    "-" +
    phone3;

  // common.js 함수 사용
  const selected = getSelectedOptions();

  const submitBtn =
    this.querySelector(".submit-btn");

  submitBtn.disabled = true;
  submitBtn.textContent = "신청 중...";

  try {

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        name,
        phone,
        telecom: selected.telecom,
        product: selected.product,
        time: selected.time,
      }),
    });

    document.getElementById("result").textContent =
      "";

    // modal.js
    openSuccessModal();

    this.reset();

    // common.js
    resetOptionButtons();

  } catch (err) {

    console.error(err);

    document.getElementById("result").textContent =
      "신청 중 오류가 발생했습니다. 다시 시도해주세요.";

  } finally {

    submitBtn.disabled = false;
    submitBtn.textContent =
      "내 지원금 확인하기";

  }

});