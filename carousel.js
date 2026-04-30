const alphabet =
"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" +
"абвгдеёжзийклмнопрстуфхцчшщъыьэюя" +
"АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ" +
"0123456789 ,.-:?!";
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const processBtn = document.getElementById("processBtn");
const modeToggle = document.getElementById("modeToggle");
const modeLabel = document.getElementById("modeLabel");

const key1 = document.getElementById("key1");
const key2 = document.getElementById("key2");
const key3 = document.getElementById("key3");

modeToggle.addEventListener("change", () => {
    modeLabel.textContent = modeToggle.checked
        ? "Режим: Дешифрование"
        : "Режим: Шифрование";
});

function shiftChar(char, shift) {
    const index = alphabet.indexOf(char);
    if (index === -1) return char;

    let newIndex = (index + shift) % alphabet.length;
    if (newIndex < 0) newIndex += alphabet.length;

    return alphabet[newIndex];
}

function processText(text, k1, k2, k3, decrypt = false) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let shift = k1;

        if (i % 3 === 1) shift = k2;
        if (i % 3 === 2) shift = k3;

        if (decrypt) shift = -shift;

        result += shiftChar(text[i], shift);
    }

    return result;
}

processBtn.addEventListener("click", () => {
    const text = inputText.value;
    const k1 = parseInt(key1.value) || 0;
    const k2 = parseInt(key2.value) || 0;
    const k3 = parseInt(key3.value) || 0;

    const result = processText(text, k1, k2, k3, modeToggle.checked);

    outputText.value = result;
});
normalizeKeyInput(key1);
normalizeKeyInput(key2);
normalizeKeyInput(key3);
function normalizeKeyInput(input) {
    input.addEventListener("input", () => {
        let value = input.value;

        value = value.replace(/[^0-9]/g, "");

        if (value.length > 1) {
            value = value.slice(0, 1);
        }

        input.value = value;
    });
}