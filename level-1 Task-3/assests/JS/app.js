// ALL ELEMENTS
const date = document.querySelector(".date");
const torchBtn = document.querySelector(".tchBtn");
const btn = document.querySelector(".move");
const torch = document.querySelector(".torch");
const input = document.querySelector("input");
const factorialBtn = document.querySelector("#fac")
const onBtn = document.querySelector("#onBtn");
const shiftBtn = document.querySelector("#shift");
const ansBtn = document.querySelector("#ansBtn");
const delBtn = document.querySelector("#delBtn");
const singleDelBtn = document.querySelector("#AC");
const cos = document.querySelector("#cos");
const sin = document.querySelector("#sin");
const tan = document.querySelector("#tan");
const power = document.querySelector("#power");
const root = document.querySelector("#root");
const log = document.querySelector("#log");
const allButtons = document.querySelectorAll("button");

// ALL BUTTONS INITIALY DISABLED
allButtons.forEach(button => {
    if (button !== onBtn && button !== torchBtn) {
        button.disabled = true;
    }
});

// DATE
const currentDate = new Date();

const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear();

const formattedDate = `${year}-${month}-${day}`;
date.innerHTML = "<h4>" + "Date: " + formattedDate + "</h4>" + "<h3>M.K</h3>";

// TORCH
torchBtn.addEventListener("click", () => {
    btn.classList.toggle("active");
    torch.classList.toggle("active");
})


// Alphabets not allow 
input.addEventListener('input', function () {
    let inputValue = this.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');
    this.value = inputValue;
});

// FACTORIAL FUNCTION
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    else if (n > 1) {
        return n * factorial(n - 1);
    }
    else {
        return n * factorial(n + 1);
    }
}
function calculateFactorial() {
    const inputNumber = parseInt(input.value);
    const result = factorial(inputNumber);
    input.value = result;
}
factorialBtn.addEventListener("click", calculateFactorial);

// ON OFF BUTTON
onBtn.addEventListener("click", () => {
    if (onBtn.innerHTML === "on") {
        input.disabled = false;
        input.value = ""
        input.focus();

        allButtons.forEach(button => {
            button.disabled = false;
        });
    }
    else if (onBtn.innerHTML === "off") {
        input.disabled = true;
        input.blur();
        input.value = ""
        onBtn.textContent = "on"

        allButtons.forEach(button => {
            if (button !== onBtn && button !== torchBtn) {
                button.disabled = true;
            }
        });
    }
})

// SHIFT BUTTON 
shiftBtn.addEventListener("click", () => {
    onBtn.textContent = "off"
    cos.innerHTML = "cos<sup>-1</sup>"
    sin.innerHTML = "sin<sup>-1</sup>"
    tan.innerHTML = "tan<sup>-1</sup>"
    power.innerHTML = "x<sup>3</sup>"
    root.innerHTML = "<sup>3</sup>√"
    log.innerHTML = "10<sup>^</sup>"

    // AFTER SHIFT ANY IF BUTTON CLICK
    allButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (button !== shiftBtn && button !== torchBtn) {
                onBtn.textContent = "on";
                cos.textContent = "cos";
                sin.textContent = "sin";
                tan.textContent = "tan";
                power.innerHTML = "x<sup>2</sup>"
                root.textContent = "√"
                log.textContent = "log"
            }
        });
    });
})

// INPUT FIELD
function calc(output) {
    input.value += output
}

// ANSWER BUTTON 
ansBtn.addEventListener("click", () => {
    input.value = eval(input.value);
})

// DELETE ALL BUTTON
delBtn.addEventListener("click", () => {
    input.value = ""
})

// SINGLE DELETE BUTTON
singleDelBtn.addEventListener("click", () => {
    let currentValue = input.value.slice(0, -1)
    input.value = currentValue
})

// DEGREES FOR INVERSE FUNTION
function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

// COS FUNTION
cos.addEventListener("click", () => {
    if (cos.innerHTML === "cos") {
        input.value = Math.cos(input.value * (Math.PI / 180));
    }
    else if (cos.innerHTML === "cos<sup>-1</sup>") {
        const cosAngleRadians = Math.acos(input.value);
        input.value = toDegrees(cosAngleRadians);
        cos.innerHTML = "cos";
    }
})

// SIN FUNCTION
sin.addEventListener("click", () => {
    if (sin.innerHTML === "sin") {
        input.value = Math.sin(input.value * (Math.PI / 180))
    }
    else if (sin.innerHTML === "sin<sup>-1</sup>") {
        const sinAngleRadians = Math.asin(input.value);
        input.value = toDegrees(sinAngleRadians);
        sin.innerHTML = "sin";
    }
})
// TAN FUNCTION
tan.addEventListener("click", () => {
    if (tan.innerHTML === "tan") {
        input.value = Math.tan(input.value * (Math.PI / 180));
    }
    else if (tan.innerHTML === "tan<sup>-1</sup>") {
        const tanAngleRadians = Math.atan(input.value);
        input.value = toDegrees(tanAngleRadians);
        tan.innerHTML = "tan";
    }
})

// POWER FUNTION
power.addEventListener("click", () => {
    if (power.innerHTML === "x<sup>2</sup>") {
        input.value = Math.pow(input.value, 2);
    }
    else if (power.innerHTML === "x<sup>3</sup>") {
        input.value = Math.pow(input.value, 3);
        power.innerHTML = "x<sup>2</sup>"
    }
})

// ROOT FUNCTION
root.addEventListener("click", () => {
    if (root.innerHTML === "√") {
        input.value = Math.sqrt(input.value);
    }
    else if (root.innerHTML === "<sup>3</sup>√") {
        input.value = Math.cbrt(input.value);
        root.innerHTML = "√";
    }
})

// LOG FUNCTION
log.addEventListener("click", () => {
    if (log.innerHTML === "log") {
        input.value = Math.log10(input.value);
    }
    else if (log.innerHTML === "10<sup>^</sup>") {
        input.value = Math.pow(10, input.value);
        log.innerHTML = "log";
    }
})

// Function to check if a character is an operator
function isOperator(value) {
    return value === "+" || value === "-" || value === "*" || value === "/";
  }
  
  // Function to handle calculator input
  function calc(output) {
    const currentInput = input.value;

     if (isOperator(output)) {
      const lastChar = currentInput.charAt(currentInput.length - 1);
  
      if (isOperator(lastChar)) {
        input.value = currentInput.slice(0, -1) + output;
      } else {
        input.value += output;
      }
    } else {
      input.value += output;
    }
  }
  
