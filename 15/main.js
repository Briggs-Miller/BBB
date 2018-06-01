
// Main code

// This is where the answer gets stored
// this is a global variable; any code can access or change
// whatever's stored in it.
// the generate_a_question() function will create the question
// and then store the answer in it at the same time.
rand_int = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

expected_inputs = 1;  //start the game expecting one box to be submitted.  Will add one for each turn taken//

check_answer = function () {

    //check that only one box has been submitted//
    var inputs = 0;
    var aa = document.getElementById("aa");
    if (aa && aa.value) {
        inputs++;
    }
    var ab = document.getElementById("ab");
    if (ab && ab.value) {
        inputs++;
    }
    var ac = document.getElementById("ac");
    if (ac && ac.value) {
        inputs++;
    }
    var ba = document.getElementById("ba");
    if (ba && ba.value) {
        inputs++;
    }
    var bb = document.getElementById("bb");
    if (bb && bb.value) {
        inputs++;
    }
    var bc = document.getElementById("bc");
    if (bc && bc.value) {
        inputs++;
    }    
    var ca = document.getElementById("ca");
    if (ca && ca.value) {
        inputs++;
    }
    var cb = document.getElementById("cb");
    if (cb && cb.value) {
        inputs++;
    }
    var cc = document.getElementById("cc");
    if (cc && cc.value) {
        inputs++;
    }    
    
    
    if (inputs == expected_inputs) {
        aa = +document.getElementById("aa").value;
        ab = +document.getElementById("ab").value;
        ac = +document.getElementById("ac").value;
        ba = +document.getElementById("ba").value;
        bb = +document.getElementById("bb").value;
        bc = +document.getElementById("bc").value;
        ca = +document.getElementById("ca").value;
        cb = +document.getElementById("bc").value;
        cc = +document.getElementById("cc").value;
        expected_inputs++;
    }
    
    top_row = aa+ab+ac;
    middle_row = ba+bb+bc;
    bottom_row = ca+cb+cc;
    left_col = aa+ba+ca;
    middle_col = ab+bb+cb;
    right_col = ca+cb+cc;
    rl_diag = aa+bb+cc;
    lr_diag = ac+bb+ca;
    document.getElementById("cheat-answer").innerHTML = expected_inputs; 
    
    //check if any line adds to 15//
    if (top_row == 15||middle_row == 15||bottom_row == 15||left_col == 15||middle_col == 15||right_col == 15||rl_diag == 15||lr_diag==15){
        alert("GAME OVER");
    }
    
    
    
}

answer_keydown = function(event) {
    if (event.keyCode == 13) {
        check_answer();
    }
}




// -- attach the check_answer function to the submit button
document.getElementById("submit").onclick = check_answer;

// -- since this isn't a traditional html form, we can't rely
// on a normal submit (ask me about this later), so you had the
// right idea though; check the key presses and look for an "enter" press
document.getElementById("aa").onkeydown = answer_keydown;
document.getElementById("ab").onkeydown = answer_keydown;
document.getElementById("ac").onkeydown = answer_keydown;
document.getElementById("ba").onkeydown = answer_keydown;
document.getElementById("bb").onkeydown = answer_keydown;
document.getElementById("bc").onkeydown = answer_keydown;
document.getElementById("ca").onkeydown = answer_keydown;
document.getElementById("cb").onkeydown = answer_keydown;
document.getElementById("cc").onkeydown = answer_keydown;

// -- start by generating a question
check_answer();
