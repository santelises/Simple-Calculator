//calculator arithmetic functions
const add = function(a,b) {return a+b};
const subtract = function(a,b) {return a-b};
const multiply = function(a,b) {return a*b};
const divide = function(a,b) { return (b === 0)? NaN:a/b};
const equality = function(a){
    return a; 
}



//evaluate equation
function operate (a,b, operator){
    a = Number(a);
    b = Number(b);
    if (isNaN(b)){
        b = a;}
    
    if (operator === "+"){
        return add(a,b);
    }
    if (operator === "-"){
        return subtract(a,b);
    }
    if (operator === "x"){
        return multiply(a,b);
    }
    if (operator === "/"){
        return divide(a,b);
    }
    if (operator === "="){
        return equality(a);
    }
    
}

function round(number){
    return parseFloat(+(Math.round(number + 'e+13') + 'e-13'));
}

function changeSign(){
    if (toReset) return;
    currentValue.textContent = Number(currentValue.textContent * -1) ;
}

function backspace(){
    if (toReset) return;
    if (currentValue.textContent.length > 1){
        currentValue.textContent = currentValue.textContent.slice(0,-1);
    } else{
        currentValue.textContent = null;
        toReset = true;
    }
}


function addNumber(e){
    let value = e.target.textContent;
    if (currentValue.textContent === "0" || toReset){
        currentValue.textContent = value;
        toReset = false;
    }else {
        currentValue.textContent += value;
    }
}

function addDecimal(){
    if (toReset){
        currentValue.textContent = "0.";
        toReset = false;
    }
    if (!currentValue.innerHTML.includes(".")){
        currentValue.textContent += "."
        toReset = false;
    }
}

function setOperator(e){
    if (operator !== null && toReset === false){
        evaluate();
        // secondOperand = currentValue.textContent;
        // let result = operate(firstOperand, secondOperand, operator);
        // currentValue.textContent = result;
        // firstOperand = result;
        // operator = e.target.textContent;
        // expression.textContent = `${firstOperand} ${operator}`;
        // secondOperand = null;
        // operator = null;
    }
    operator = e.target.textContent;
    firstOperand = currentValue.textContent;
    expression.textContent = `${firstOperand} ${operator}`;
    toReset = true;
}

function evaluate(){
    if (operator === null){
        operator = "=";
        firstOperand = currentValue.textContent;
    }
    secondOperand = currentValue.textContent;
    if (secondOperand === "="){
        secondOperand = firstOperand;
    }
    console.log({firstOperand,secondOperand, operator})
    // if (operator !== null){

    // }
    let result = round(operate(firstOperand, secondOperand, operator));

    //will be over written if it is not an equal sign that triggers the evaluation
    expression.textContent =  `${firstOperand} ${operator} ${secondOperand} =`

    currentValue.textContent = result;
    operator = null;
    secondOperand = null;
}


function reset(){
    expression.textContent = null;
    currentValue.textContent = "0";
    toReset = false;
    firstOperand = null; 
    secondOperand = null; 
    operator = null; 
}


let toReset = false;
firstOperand = null; 
secondOperand = null; 
operator = null; 




let expression = document.querySelector(".expression"); 
let currentValue = document.querySelector(".currentValue");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let decimal = document.querySelector(".decimal");
let evaluation = document.querySelector(".evaluation");
let clear = document.querySelector(".clear");
let remove = document.querySelector(".delete")
let toggleSign = document.querySelector(".toggle-sign");


numbers.forEach(number => number.addEventListener("click", addNumber));
operators.forEach(operator => operator.addEventListener("click", setOperator));
decimal.addEventListener("click", addDecimal);
evaluation.addEventListener("click", evaluate);
clear.addEventListener("click", reset);
remove.addEventListener("click", backspace);
toggleSign.addEventListener("click", changeSign);




