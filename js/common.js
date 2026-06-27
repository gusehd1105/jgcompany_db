// ================================
// 공통 기능
// ================================

// 배너 클릭 시 상담신청 영역으로 이동
document.querySelectorAll(".move-form").forEach((image) => {
  image.addEventListener("click", () => {
    document.getElementById("formSection").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// 선택 버튼(active)
document.querySelectorAll(".option-grid").forEach((group) => {
  const buttons = group.querySelectorAll(".option");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});

// 버튼 초기화
function resetOptionButtons() {
  document.querySelectorAll(".option-grid").forEach((group) => {
    group
      .querySelectorAll(".option")
      .forEach((btn) => btn.classList.remove("active"));

    group.querySelector(".option").classList.add("active");
  });
}

// 현재 선택된 값 가져오기
function getSelectedOptions() {
  return {
    product: document
      .querySelectorAll(".question")[0]
      .querySelector(".active").textContent,

    telecom: document
      .querySelectorAll(".question")[1]
      .querySelector(".active").textContent,

    time: document
      .querySelectorAll(".question")[2]
      .querySelector(".active").textContent,
  };
}