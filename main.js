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

function calculate() {
  const birthDate = birthDateInput.value;
  if (!birthDate) return;

  localStorage.setItem(KEY, birthDate);

  const birth = new Date(birthDate);
  const today = new Date();
  const diffTime = today - birth;

  // 狗狗實際年齡（年）
  const dogAgeYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  dogYearsSpan.textContent = dogAgeYears.toFixed(1);

  let dogAge = dogAgeYears;
  let humanAge = 0;

  if (dogAge < 1) {
    humanAge = dogAge * map[1]; // dogAge < 1 時，以比例算
  } else {
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
      humanAge = interpolate(lower, map[lower], upper, map[upper], dogAge);
    }
  }

  humanYearsSpan.textContent = Math.round(humanAge);
}

calcBtn.addEventListener("click", calculate);

/* ----------------------------
   新增功能：頁面載入時自動計算
----------------------------- */
window.addEventListener("DOMContentLoaded", () => {
  if (birthDateInput.value) calculate();
});
