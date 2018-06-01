the_answer = [];
the_numbers = [];
their_answer = [];


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


var correct = new Audio('correct.wav');
var wrong = new Audio('wrong.wav');

rand_int = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var score = 0;

document.getElementById("score").innerHTML = score;

check_answer = function () {
    
    x = +document.getElementById("answer1").value;
    y = +document.getElementById("answer2").value;
    z = +document.getElementById("answer3").value;
    their_answer.push(x,y,z);
    
    document.getElementById("cheat-answer").innerHTML = the_answer; 
    document.getElementById("cheat-guess").innerHTML = their_answer;     
    
    
    //cannot for the life of me work out why this won't work.  Converted them both to a string, they look the same, but still won't compare as equal to each other.  Why?//
    if (their_answer === the_answer) {
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
        
        document.getElementById("answer1").focus();
    }
}

answer_keydown = function(event) {
    if (event.keyCode == 13) {
        check_answer();
    }
}


//for whatever reason, all of this when placed the the 'generate_a_question' function and this is deleted causes an error.  No idea why//
generate_random_numbers = function() {
    num_lower = 0
    num_upper = 20
    a = rand_int(num_lower, num_upper);
    b = rand_int(num_lower, num_upper);
    c = rand_int(num_lower, num_upper);
    document.getElementById("number-1").innerHTML = a;
    document.getElementById("number-2").innerHTML = b;
    document.getElementById("number-3").innerHTML = c;
    
    the_numbers.push(a,b,c);
    document.getElementById("cheat-numbers").innerHTML = the_numbers;
    the_answer = the_numbers.sort((a, b) => a - b); //ascending  (switch b and a for descending//
    
    document.getElementById("cheat-answer").innerHTML = the_answer; 
    document.getElementById("cheat-guess").innerHTML = their_answer; 
}

generate_a_question = function() {
    generate_random_numbers();
    question_difficulty = 0;
    difficulty_radiobuttons = document.getElementsByName("question-difficulty");
    for (var i = 0, length = difficulty_radiobuttons.length; i < length; i++) {
        if (difficulty_radiobuttons[i].checked) {
            question_difficulty = difficulty_radiobuttons[i].value;
            break; // no sense continuing the loop
        }
    }
    

    if (question_difficulty == 1) {
        num_lower = 1;
        num_upper = 20;
        
    }
    else if (question_difficulty == 2) {
        num_lower = 1;
        num_upper = 50;
        
    }
    else if (question_difficulty == 3) {
        num_lower = 1;
        num_upper = 99;
        
    }
    else if (question_difficulty == 4) {
        num_lower = -100;
        num_upper = 100;
        
    }



    
    
    
    document.getElementById("answer1").focus();

  

}

setting_was_changed = function() {
    // one of the settings were changed.
    console.log('the settings were changed');

    
    generate_a_question();
}


settings_inputs = document.querySelectorAll("#question-settings input"); // select all "input" elements under the element with the id "question-settings"
for (i = 0; i < settings_inputs.length; ++i) {
    // The next line attaches the "setting_was_changed" function on to the "onchange"
    // event for each of the "input" elements under the #question-settings element
    // ie. each time those input fields are changed, the setting_was_changed() function will be called.
    settings_inputs[i].onchange = setting_was_changed;
}

// -- attach the generate question handler function to a button as well
document.getElementById("generate-new-question").onclick = generate_a_question;

// -- attach the check_answer function to the submit button
document.getElementById("submit").onclick = check_answer;

// -- since this isn't a traditional html form, we can't rely
// on a normal submit (ask me about this later), so you had the
// right idea though; check the key presses and look for an "enter" press
document.getElementById("answer1").onkeydown = answer_keydown;
document.getElementById("answer2").onkeydown = answer_keydown;
document.getElementById("answer3").onkeydown = answer_keydown;

// -- start by generating a question
generate_a_question();
