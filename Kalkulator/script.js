const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    const action = btn.dataset.action;

    if (action === "clear") {
      currentInput = "";
      display.textContent = "0";
    } else if (action === "equal") {
      try {
        let formula = currentInput.replace(/X/g, "*").replace(",", ".");
        currentInput = eval(formula).toString();
        display.textContent = currentInput.replace(".", ",");
      } catch {
        display.textContent = "Error";
        currentInput = "";
      }
    } else if (action === "percent") {
      currentInput = (parseFloat(currentInput) / 100).toString();
      display.textContent = currentInput;
    } else if (action === "plus-minus") {
      if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        display.textContent = currentInput;
      }
    } else {
      currentInput += value === "," ? "." : value;
      display.textContent = currentInput.replace(".", ",");
    }
  });
});

// Key Word

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    // Jika angka
    currentInput += key;
  } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "x" || key === ":") {
    // Ganti x dan : dengan operator JS
    if (key === "x") currentInput += "*";
    else if (key === ":") currentInput += "/";
    else currentInput += key;
  } else if (key === "Enter" || key === "=") {
    try {
      let formula = currentInput.replace(/X/g, "*").replace(",", ".");
      currentInput = eval(formula).toString();
    } catch {
      currentInput = "Error";
    }
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  } else if (key === "Escape") {
    currentInput = "";
  } else if (key === "," || key === ".") {
    currentInput += ".";
  }

  // Tampilkan hasil
  display.textContent = currentInput.replace(".", ",");
});

const modeToggle = document.getElementById("modeToggle");

// Default mode
document.body.classList.add("dark");

// Tombol ganti tema
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  // Ganti ikon 🌙 ↔ ☀️
  if (document.body.classList.contains("light")) {
    modeToggle.textContent = "☀️";
  } else {
    modeToggle.textContent = "🌙";
  }
});
