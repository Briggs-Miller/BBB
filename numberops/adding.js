
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
  
var a = getRndInteger(1,9);
var b = getRndInteger(1,9);
var score = 0;
var correct = new Audio('correct.wav');
var wrong = new Audio('wrong.wav');
var operator = 2; //determines whether it will be addition or subtraction - 1 is addition, 2 is subtraction.

function PrintQuestion() {
    document.getElementById("first").innerHTML = a;
    document.getElementById("second").innerHTML = b;
    document.getElementById("score").innerHTML = score;
    if (operator == 1) {
        document.getElementById("operator").innerHTML = "+";
    }
    else if (operator ==2) {
        document.getElementById("operator").innerHTML = "-";
    }
    else {
        document.getElementById("operator").innerHTML = "ERROR";
    }
}
 
/* 
I want this to use the check boxes to determine which operators it can choose from to develop the equation.
This basic version did not work for some reason.
DetermineOperator();
  
function DetermineOperator() {
    if(document.getElementById("subtraction").checked = true) {
        operator = 2;
    }
    else: {
        operator = 1;
    }
}
*/    
            
PrintQuestion();

//default settings for maximum and minimum numbers - can be changed with buttons//
var minnum = 1;
var maxnum = 9;



function checkAnswer() {
    var x, text
    
    x = document.getElementById("answer").value;
    
    if (operator = 1 && x == a + b) {
        text = "You are correct!";
        a = getRndInteger(minnum,maxnum);
        b = getRndInteger(minnum,maxnum);
        correct.play();
        score +=1;
        document.getElementById("answer").value='';
        document.getElementById("verdict").style.color = "green";
        PrintQuestion();
    } else if (operator = 2 && x == a - b) {
        text = "You are correct!";
        a = getRndInteger(minnum,maxnum);
        b = getRndInteger(minnum,maxnum);
        correct.play();
        score +=1;
        document.getElementById("answer").value='';
        document.getElementById("verdict").style.color = "green";
        PrintQuestion();
    } else {
        text = "Sorry, try again!";
        score -=1;
        wrong.play();
        document.getElementById("verdict").style.color = "red";
        PrintQuestion();
    }    
    document.getElementById("verdict").innerHTML = text;
    
}

function enter(event) {
    var x = event.keyCode;
    if (x == 13) {
        checkAnswer();
    }
}


function easy() {
    minnum = 1;
    maxnum = 9;
    document.getElementById("setting").innerHTML = "EASY";
}

function medium() {
    minnum = 1;
    maxnum = 50;
    document.getElementById("setting").innerHTML = "MEDIUM";      
}

function hard() {
    minnum = 1;
    maxnum = 99;
    document.getElementById("setting").innerHTML = "HARD";      
}

function extreme() {
    minnum = 1;
    maxnum = 999;
    document.getElementById("setting").innerHTML = "EXTREME";      
}





