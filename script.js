"use strict";

const tipButtons = document.querySelector(".calculator__buttons");
const billInput = document.querySelector(".calculator__cost");
const numberOfPeople = document.querySelector(".calculator__number-people");
const calculatorFormBill = document.querySelector(".calculator__form--bill");
const calculatorFormPeople = document.querySelector(
  ".calculator__form--people"
);
const calculatorTipCustom = document.querySelector(".calculator__tip-custom");
const calculatorAmountTip = document.querySelector(".calculator__amount--tip");
const calculatorAmountTotal = document.querySelector(
  ".calculator__amount--total"
);
const calculatorReset = document.querySelector(".calculator__reset");

let tip = 0;
let bill = 0;
let people = 0;
let tipTotal = 0;
let total = 0;

function resetButtons(button) {
  const items = document.getElementsByClassName("calculator__tip");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("active");
  }
  button.classList.toggle("active");
  calculatorTipCustom.classList.remove("active");
  calculatorTipCustom.value = "";
}

tipButtons.childNodes.forEach((button) => {
  button.addEventListener("click", () => {
    tip = Number(button.textContent.replace("%", ""));
    notEmpty();
    resetButtons(button);
  });
});

calculatorFormBill.addEventListener("submit", (e) => {
  e.preventDefault();
});

calculatorFormPeople.addEventListener("submit", (e) => {
  e.preventDefault();
});

function Bill() {
  bill = Number(billInput.value);
  people = Number(numberOfPeople.value);
  if (tip === 0) {
    tip = Number(calculatorTipCustom.value);
  }
  notEmpty();
}

function notEmpty() {
  if (bill !== 0 && people !== 0 && tip !== 0) {
    tipTotal = (bill * (tip * 0.01)) / people;
    tipTotal = Math.round(tipTotal * 100) / 100;
    calculatorAmountTip.textContent = `$${tipTotal}`;

    total = bill / people + tipTotal;
    total = Math.round(total * 100) / 100;
    calculatorAmountTotal.textContent = `$${total}`;
    calculatorReset.classList.add("active");
  }
}

calculatorReset.addEventListener("click", (e) => {
  e.preventDefault();
  tip = 0;
  bill = 0;
  people = 0;
  tipTotal = 0;
  total = 0;

  billInput.value = "";
  numberOfPeople.value = "";
  calculatorTipCustom.value = "";
  calculatorAmountTip.textContent = "$0.00";
  calculatorAmountTotal.textContent = "$0.00";
  calculatorReset.classList.remove("active");

  const items = document.getElementsByClassName("calculator__tip");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("active");
  }
});
