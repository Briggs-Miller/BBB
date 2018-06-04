the_answer = [];
the_numbers = [];
ans1 = null;
ans2 = null;
ans3 = null;
ans4 = null;
ans5 = null;
num_lower = 0;
num_upper = 20;
updown = [];
amount_of_numbers = 3;
var score = 0;


correct_sequence = function() {
    playcorrect();  
    score +=1;
    document.getElementById("score").innerHTML = score;
    document.getElementById("event").style.color = "green";
    document.getElementById("event").innerHTML = "You are correct!";
    document.getElementById("answer1").value = '';
    document.getElementById("answer2").value = '';
    document.getElementById("answer3").value = '';
    document.getElementById("answer4").value = '';
    document.getElementById("answer5").value = '';
    generate_a_question();
}
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



document.getElementById("score").innerHTML = score;

check_answer = function () {
    v = document.getElementById("answer1").value;
    w = document.getElementById("answer2").value;
    x = document.getElementById("answer3").value;
    y = document.getElementById("answer4").value;
    z = document.getElementById("answer5").value;

    if (v == ans1 && w == ans2 && x == ans3) {
        if (amount_of_numbers ==3) {
            correct_sequence();
        }
        
        else if (amount_of_numbers == 4 && y == ans4) {
            correct_sequence();
        }
            
        else if (amount_of_numbers == 5 && z == ans5) {
            correct_sequence();
        }    

        
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
    the_numbers = [];
    a = rand_int(num_lower, num_upper);
    b = rand_int(num_lower, num_upper);
    c = rand_int(num_lower, num_upper);
    document.getElementById("number-1").innerHTML = a;
    document.getElementById("number-2").innerHTML = b;
    document.getElementById("number-3").innerHTML = c;
    the_numbers.push(a,b,c);
    if (amount_of_numbers == 4) {
        the_numbers = [];
        d = rand_int(num_lower, num_upper);
        document.getElementById("number-4").innerHTML = d;
        the_numbers.push(a,b,c,d);
    }

     if (amount_of_numbers == 5) {
        the_numbers = [];
        d = rand_int(num_lower, num_upper);
        e = rand_int(num_lower, num_upper);
        document.getElementById("number-4").innerHTML = d;
        document.getElementById("number-5").innerHTML = e;
        the_numbers.push(a,b,c,d, e);
    }   
    
    the_answer = the_numbers.sort((a, b) => a - b);
    if (direction == "up") {
        ans1 = the_answer[0];
        ans2 = the_answer[1];
        ans3 = the_answer[2];
        ans4 = the_answer[3];
        ans5 = the_answer[4];
        document.getElementById("instructions").innerHTML = "Put the following numbers in ASCENDING order:";
    }
    else if (direction == "down") {
        if (amount_of_numbers == 3) {    
            ans1 = the_answer[2];
            ans2 = the_answer[1];
            ans3 = the_answer[0];
            
        }
        else if (amount_of_numbers == 4) {
            ans1 = the_answer[3];
            ans2 = the_answer[2];
            ans3 = the_answer[1];
            ans4 = the_answer[0];
        }
        else if (amount_of_numbers == 5) {
            ans1 = the_answer[4];
            ans2 = the_answer[3];
            ans3 = the_answer[2];
            ans4 = the_answer[1];
            ans5 = the_answer[0];
        }
        document.getElementById("instructions").innerHTML = "Put the following numbers in DESCENDING order:";
        
        
        
    }


}

generate_a_question = function() {

    
    question_difficulty = 0;
    difficulty_radiobuttons = document.getElementsByName("question-difficulty");
    for (var i = 0, length = difficulty_radiobuttons.length; i < length; i++) {
        if (difficulty_radiobuttons[i].checked) {
            question_difficulty = difficulty_radiobuttons[i].value;
            break; // no sense continuing the loop
        }
    }
    
    
    
    question_type = 0; // a bit of base2 magic...
    if (document.getElementById("type-up").checked) {
        //alert('include addition');
        question_type = question_type + 1;
    }
    if (document.getElementById("type-down").checked) {
        //alert('include subtraction');
        question_type = question_type + 2;
    }
    if (question_type == 0) {
        alert("Please pick a question type!");
    }
    if (question_type == 1) {
        // addition
        var directions = ["up"];
    }
    else if (question_type == 2) {
        // subtraction
        var directions = ["down"];
    }
    else if (question_type == 3) {
        // addition and subtraction
        var directions = ["down", "up"];
    }
    
    direction = directions[Math.floor(Math.random() * directions.length)];
    
    if (question_difficulty == 1) {
        num_lower = 1;
        num_upper = 20;
        amount_of_numbers = 3;
        
    }
    else if (question_difficulty == 2) {
        num_lower = 1;
        num_upper = 50;
        amount_of_numbers = 4;
        
    }
    else if (question_difficulty == 3) {
        num_lower = -20;
        num_upper = 20;
        amount_of_numbers = 4;
        
    }
    else if (question_difficulty == 4) {
        amount_of_numbers = 5;
        num_lower = -100;
        num_upper = 100;
        
    }


    
    

    if (amount_of_numbers == 3) {
    document.getElementById("answer4").style.display = "none";
    document.getElementById("answer5").style.display = "none";
}

    else if (amount_of_numbers == 4) {
        document.getElementById("answer4").style.display = "block";
        document.getElementById("answer5").style.display = "none";
    }

    else if (amount_of_numbers == 5) {
        document.getElementById("answer4").style.display = "block";
        document.getElementById("answer5").style.display = "block";
    }    
    
    generate_random_numbers();
    document.getElementById("cheat-answer").innerHTML = the_answer; 
    document.getElementById("cheat-guess").innerHTML = ans3; 
    document.getElementById("cheat-numbers").innerHTML = ans2;  
    
    
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
document.getElementById("answer4").onkeydown = answer_keydown;
document.getElementById("answer5").onkeydown = answer_keydown;

// -- start by generating a question
generate_a_question();
