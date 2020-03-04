// DOM Elementss
const resultEL = document.getElementById('result');
const lengthEL = document.getElementById('length');
const uppercaseEL = document.getElementById('uppercase');
const lowercaseEL = document.getElementById('lowercase');
const numberEL = document.getElementById('number');
const symbolEL = document.getElementById('symbol');
const clipboardEL = document.getElementById('clipboard');
const generateEL = document.getElementById('generate');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

generateEL.addEventListener('click', () => {
    const length = +lengthEL.value;
    const hasUpper = uppercaseEL.checked;
    const hasLower = lowercaseEL.checked;
    const hasNumber = numberEL.checked;
    const hasSymbol = symbolEL.checked;
    // print result into span
    resultEL.innerText = generatePassword(hasLower,hasUpper,hasNumber,hasSymbol, length)
})

// copy to clipboard 
clipboardEL.addEventListener('click', () => {

    const textarea = document.createElement('textarea');
    const password = resultEL.innerText;
    // if blank return nothing
    if(!password){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
})


// generate password function
function generatePassword(lower, upper, number, symbol, length){

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    if (typesCount === 0){
        return '';
    }

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName](); 
        });
    }
    const finalPassword = generatedPassword;

    return finalPassword;


}

// GENERATION FUNCS
// Random Lowercase
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
// Random Uppercase
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
// Random Number
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 48);
}

function getRandomSymbol(){
    const symbols = '!@£$%^&*()_+=-[]{};|<>?,./';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

console.log(getRandomLower(), getRandomUpper(), getRandomNumber(), getRandomSymbol())