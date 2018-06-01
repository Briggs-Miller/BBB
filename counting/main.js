
the_answer = null;


var CORRECT_CLIPS = 19;

playcorrect = function() {
    m = rand_int(1, CORRECT_CLIPS)
    source = "sounds/correct/"+m+".mp3"
    var myAudio = new Audio(source);
    myAudio.play();
}

var WRONG_CLIPS = 8;

playwrong = function() {
    w = rand_int(1, WRONG_CLIPS)
    source = "sounds/wrong/"+w+".mp3"
    var myAudio = new Audio(source);
    myAudio.play();
}

generate_a_question = function() {
    document.getElementById("answer").value = "";
    i = rand_int(1, 9)
    source = "images/"+i+".gif"
    document.getElementById("imageQ").src = source;
    the_answer = i;
    document.getElementById("answer").focus();

    // cheat
    document.getElementById("cheat-answer").innerHTML = the_answer;
}


var correct = new Audio('correct.wav');
var wrong = new Audio('wrong.wav');

rand_int = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var score = 0;

document.getElementById("score").innerHTML = score;

check_answer = function () {
    their_answer = document.getElementById("answer").value;

    if (their_answer == the_answer) {
        playcorrect();
        score +=1;
        document.getElementById("score").innerHTML = score;
        document.getElementById("event").style.color = "green";
        document.getElementById("event").innerHTML = "You are correct!";
        generate_a_question();
    }
    else {
        score -=1;
        playwrong();
        document.getElementById("event").style.color = "red";
        document.getElementById("event").innerHTML = "Sorry, try again.";
        document.getElementById("score").innerHTML = score;
        document.getElementById("answer").value = "";
        document.getElementById("answer").focus();
    }
}

answer_keydown = function(event) {
    if (event.keyCode == 13) {
        check_answer();
    }
}


document.getElementById("generate-new-question").onclick = generate_a_question;


document.getElementById("submit").onclick = check_answer;

// -- since this isn't a traditional html form, we can't rely
// on a normal submit (ask me about this later), so you had the
// right idea though; check the key presses and look for an "enter" press
document.getElementById("answer").onkeydown = answer_keydown;

// -- start by generating a question
generate_a_question();
