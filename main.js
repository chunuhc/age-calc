// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM Loaded");
// });

// const KEY = "my-note";
// const input = document.getElementById("note-input");
// const saveBtn = document.getElementById("save-btn");
// const display = document.getElementById("display");

// // 第一次進來頁面時，先試著把舊資料拿出來
// const saved = localStorage.getItem(KEY);
// if (saved) {
//   input.value = saved;
//   display.textContent = "目前儲存的文字：" + saved;
// }

// // 按下儲存，就把文字存進 localStorage
// saveBtn.addEventListener("click", function () {
//   const text = input.value;
//   localStorage.setItem(KEY, text);
//   display.textContent = text
//     ? "目前儲存的文字：" + text
//     : "目前還沒有儲存任何文字。";
// });

const calcBtn = document.getElementById("calc-btn");
const birthDateInput = document.getElementById("birthDate");
const dogYearsSpan = document.getElementById("dogYears");
const humanYearsSpan = document.getElementById("humanYears");

const KEY = "dog_bd";
const saved = localStorage.getItem(KEY);
if (saved) {
  birthDateInput.value = saved;
}

const map = {
  1: 17,
  2: 23,
  3: 28,
  4: 33,
  5: 38,
  6: 43,
  7: 48,
  8: 53,
  10: 63,
  12: 73,
  14: 83,
  16: 93,
  18: 103,
  20: 113,
};

function interpolate(x1, y1, x2, y2, x) {
  return y1 + (y2 - y1) * ((x - x1) / (x2 - x1));
}

calcBtn.addEventListener("click", function () {
  const birthDate = birthDateInput.value;
  localStorage.setItem(KEY, birthDate);

  const birth = new Date(birthDateInput.value);
  if (!birthDateInput.value) return;

  const today = new Date();
  const diffTime = today - birth;

  // 狗狗實際年齡（以年計算）
  const dogAgeYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

  dogYearsSpan.textContent = dogAgeYears.toFixed(1);

  let dogAge = dogAgeYears;
  let humanAge = 0;

  if (dogAge < 1) {
    // 未滿一歲，每月=人類1歲
    humanAge = Math.floor(dogAge * 12);
  } else {
    // 找最接近的對應值區間
    const keys = Object.keys(map)
      .map(Number)
      .sort((a, b) => a - b);

    let lower = keys[0];
    let upper = keys[keys.length - 1];

    for (let i = 0; i < keys.length; i++) {
      if (keys[i] <= dogAge) lower = keys[i];
      if (keys[i] >= dogAge) {
        upper = keys[i];
        break;
      }
    }

    if (lower === upper) {
      humanAge = map[lower];
    } else {
      const humanLower = map[lower];
      const humanUpper = map[upper];
      humanAge = interpolate(lower, humanLower, upper, humanUpper, dogAge);
    }
  }

  humanYearsSpan.textContent = Math.round(humanAge);
});
