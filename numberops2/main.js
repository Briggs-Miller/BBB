
// Main code

// This is where the answer gets stored
// this is a global variable; any code can access or change
// whatever's stored in it.
// the generate_a_question() function will create the question
// and then store the answer in it at the same time.
the_answer = null;

rand_int = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var score = 0;

document.getElementById("score").innerHTML = score;

check_answer = function () {
    their_answer = document.getElementById("answer").value;

    if (their_answer == the_answer) {
        score +=1;
        document.getElementById("score").innerHTML = score;
        document.getElementById("event").style.color = "green";
        document.getElementById("event").innerHTML = "You are correct!";
        generate_a_question();
    }
    else {
        score -=1;
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



generate_a_question = function() {
    // This function reads whatever has been selected in the settings
    // inputs and puts a new question on the page (as well as storing
    // the answer in global variable: `the_answer`)

    document.getElementById("answer").value = "";

    // ---------------------------------------------------------------- //

    // -- get the question difficulty
    question_difficulty = 0;
    difficulty_radiobuttons = document.getElementsByName("question-difficulty");
    for (var i = 0, length = difficulty_radiobuttons.length; i < length; i++) {
        if (difficulty_radiobuttons[i].checked) {
            question_difficulty = difficulty_radiobuttons[i].value;
            break; // no sense continuing the loop
        }
    }
    //alert(question_difficulty); // watch it change as you click the radio buttons...

    // ---------------------------------------------------------------- //

    // -- get the question types
    question_type = 0; // a bit of base2 magic...
    if (document.getElementById("type-addition").checked) {
        //alert('include addition');
        question_type = question_type + 1;
    }
    if (document.getElementById("type-subtraction").checked) {
        //alert('include subtraction');
        question_type = question_type + 2;
    }
    if (document.getElementById("type-multiplication").checked) {
        //alert('include multiplication');
        question_type = question_type + 4;
    }

    if (document.getElementById("type-division").checked) {
        //alert('include division');
        question_type = question_type + 10;
    }    
    
    // basic validation
    if (question_type == 0) {
        alert("Please pick a question type!");
    }

    //alert(question_type); // watch it change as you click the check boxes...

    // ---------------------------------------------------------------- //

    // now we have `question_difficulty` and `question_type` values...

    // ---------------------------------------------------------------- //

    // figure out the sign
    // this creates an array of one or more signs, depending on the
    // value of `question_type`. the next block then randomly picks
    // one of those values. this was the neatest way of doing it; all
    // other options involved huge if/else blocks which were messy as shit.

    if (question_type == 1) {
        // addition
        var signs = ["+"];
    }
    else if (question_type == 2) {
        // subtraction
        var signs = ["-"];
    }
    else if (question_type == 3) {
        // addition and subtraction
        var signs = ["+", "-"];
    }
    else if (question_type == 4) {
        // multiplication
        sign = "*";
        var signs = ["*"];
    }
    else if (question_type == 5) {
        // addition and multiplication
        var signs = ["+", "*"];
    }
    else if (question_type == 6) {
        // subtraction and multiplication
        var signs = ["-", "*"];
    }
    else if (question_type == 7) {
        // addition, subtraction and multiplication
        var signs = ["+", "-", "*"];
    }
    else if (question_type == 10) {
        sign = "/"
        var signs = ["/"];
    }
        if (question_type == 11) {
        // addition
        var signs = ["+","/"];
    }
    else if (question_type == 12) {
       
        var signs = ["-","/"];
    }
    else if (question_type == 13) {
       
        var signs = ["+", "-","/"];
    }
    else if (question_type == 14) {
       
        var signs = ["*","/"];
    }
    else if (question_type == 15) {
        
        var signs = ["+", "*","/"];
    }
    else if (question_type == 16) {
        
        var signs = ["-", "*","/"];
    }
    else if (question_type == 17) {
        
        var signs = ["+", "-", "*","/"];
    }    
    
    // the above block will have created an array with one
    // or more signs based on what the setting was.

    // -- randomly pick one.
    sign = signs[Math.floor(Math.random() * signs.length)];

    // ---------------------------------------------------------------- //

    // finally we need the two numbers

    if (question_difficulty == 1) {
        num_lower = 1;
        num_upper = 9;
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
        num_lower = 1;
        num_upper = 999;
    }

    a = rand_int(num_lower, num_upper);
    b = rand_int(num_lower, num_upper);
    c = 0;
    if (a < b) {
        c = a;
        a = b;
        b = c;
    }
    
    if (sign == "/" && a%b != 0) {
        while (a%b !=0) {
            a = rand_int(num_lower, num_upper);
            b = rand_int(num_lower, num_upper);
            c = 0;
            if (a < b) {
                c = a;
                a = b;
                b = c;
            }
        }
    }
    // ---------------------------------------------------------------- //

    // now we have number a, number b and the sign

    // work out the answer
    the_answer = eval(a+sign+b); // this puts it in the global variable, which then gets checked when an answer is submitted.

    // -- now put it in the page
    document.getElementById("number-1").innerHTML = a;
    document.getElementById("number-2").innerHTML = b;

    // now that all the actual math stuff has been done,
    // -- make the * look more like a m
    if (sign === "*") {
        sign = "×"; // a unicode multiplication sign I copied and pasted in
    }
    
    if (sign === "/") {
        sign = "÷";
    }
    
    document.getElementById("sign").innerHTML = sign;

    // -- put the focus on the input field so they can start answering questions straight away
    document.getElementById("answer").focus();

    // cheat
    document.getElementById("cheat-answer").innerHTML = the_answer; // also put that value on the page, so we can cheat!! (ahem, validate that it's working properly)
}

setting_was_changed = function() {
    // one of the settings were changed.
    console.log('the settings were changed');

    // you could also do other things here...

    // (eg. check that the user has permission to change the settings...)

    // but in our case, you just want to:

    // -- generate a new question with whatever the settings are
    generate_a_question();
}

// Any time a setting is changed, call the setting_was_changed() function.
// -- get all the input elements under the #question-settings element
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
document.getElementById("answer").onkeydown = answer_keydown;

// -- start by generating a question
generate_a_question();
