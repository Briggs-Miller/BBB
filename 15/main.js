//To do


//Button to force who starts (attacker/defender/either)
//Show a list of available numbers (button to show/hide the list)



var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var attack_defend = [-1, 1];
var player_turn = attack_defend[Math.floor(Math.random() * attack_defend.length)];
var turn = 1
var available_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var available_positions = []


function get_available_positions() {    
    available_positions = []
    console.log("Running get available positions function");
    grid_inputs = document.querySelectorAll("#board table input"); // select all "input" elements under the element with the id "question-settings"
    for (i = 0; i < grid_inputs.length; ++i) {
        if (grid_inputs[i].disabled != true) {
            available_positions.push(i);
        }
    }
    console.log("Available Positions are",available_positions);
    return available_positions;
}





rand_int = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function AI_position() {
    get_available_positions();
    var AI_position = available_positions[Math.floor(Math.random() * available_positions.length)];
    console.log("Getting random position",AI_position)
    return AI_position;
}
    
function AI_number() {
    var AI_number = available_numbers[Math.floor(Math.random() * available_numbers.length)];
    console.log("Getting random number",AI_number)
    return AI_number
}

//this adds the class 'used' so that the display is none on the used number.
function remove_used_number(b) {
    var element = document.getElementById("used_"+b);
    element.classList.add("used");
}

//colours the winning boxes for the attacker
function winningboxes(a) {
    var element = document.getElementById("grid_"+a);
    element.classList.add("winning");
}

function removewinningboxes() {
    grid_inputs = document.querySelectorAll("#board table input"); 
    for (i = 0; i < grid_inputs.length; ++i) {
        var element = document.getElementById("grid_"+i);
        element.classList.remove("winning");
    }
    console.log("Remove winning colour class")
}

function show_all_numbers() { 
    for (i = 1; i < 10; ++i) {
        var element = document.getElementById("used_"+i);
        element.classList.remove("used");
    }
    console.log("Remove winning colour class")
}

print_player = function(player_turn) {
    if (player_turn == 1) {
        if (turn == 1) {
            document.getElementById("player_turn").innerHTML = "ATTACKER";
            document.getElementById("status_update").innerHTML = "The ATTACKER has the first turn.  You cannot use the middle square on your first turn.";
        }
        else {
            document.getElementById("player_turn").innerHTML = "ATTACKER";
        }
    }
    else if (player_turn == -1) {
        if (turn == 1) {
        document.getElementById("player_turn").innerHTML = "DEFENDER";
        document.getElementById("status_update").innerHTML = "The DEFENDER has the first turn."
        }
        else {
            document.getElementById("player_turn").innerHTML = "DEFENDER";
        }
    }
}


//grid_lines = [[0,1,2],[;



validate_grid = function(grid) {
    console.log("Starting to validate grid");
    
    if (grid.length != 9) {
        console.log ("ERROR.  Grid length wrong", grid.length)
        return false
    }
    if (grid[0]!=0&&grid[1]!=0&&grid[2]!=0) { 
        console.log("Top row has three numbers");
        if (grid[0]+grid[1]+grid[2]==15) {
            console.log("Top row equals 15");
            winningboxes(0);
            winningboxes(1);
            winningboxes(2);
            return true;   
        }
    }
    else if (grid[3]!=0&&grid[4]!=0&&grid[5]!=0) { 
        console.log("Middle row has three numbers");
        if (grid[3]+grid[4]+grid[5]==15) {
            console.log("Middle row equals 15");
            winningboxes(3);
            winningboxes(4);
            winningboxes(5);
            return true;   
        }
    }
    else if (grid[6]!=0&&grid[7]!=0&&grid[8]!=0) { 
        if (grid[6]+grid[7]+grid[8]==15) {
            console.log("Bottom row equals 15");
            winningboxes(6);
            winningboxes(7);
            winningboxes(8);
            return true;   
        }
    }
    else if (grid[0]!=0&&grid[3]!=0&&grid[6]!=0) { 
        if (grid[0]+grid[3]+grid[6]==15) {
            console.log("Left Column equals 15");
            winningboxes(0);
            winningboxes(3);
            winningboxes(6);
            return true;   
        }
    }
    else if (grid[1]!=0&&grid[4]!=0&&grid[7]!=0) {
        if (grid[1]+grid[4]+grid[7]==15) {
            console.log("Middle Column equals 15");
            winningboxes(1);
            winningboxes(4);
            winningboxes(7);        
            return true;   
        }
    }
    else if (grid[2]!=0&&grid[5]!=0&&grid[8]!=0) {
        if (grid[2]+grid[5]+grid[8]==15) {
            console.log("Right Column equals 15");
            winningboxes(2);
            winningboxes(5);
            winningboxes(8);           
            return true;   
        }
    }
    else if (grid[0]!=0&&grid[4]!=0&&grid[8]!=0) {
        if (grid[0]+grid[4]+grid[8]==15) {
            console.log("TLBR Diag equals 15");
            winningboxes(0);
            winningboxes(4);
            winningboxes(8);           
            return true;   
        }
    }
    else if (grid[6]!=0&&grid[4]!=0&&grid[2]!=0) {
        if (grid[6]+grid[4]+grid[2]==15) {
            console.log("BLTR Diag equals 15");
            winningboxes(6);
            winningboxes(4);
            winningboxes(2);                      
            return true;   
        }
        
    }
    else {
        console.log("Nothing adds to 15 yet")
        return false;
        
    }
}
    
answer_was_submitted = function() {
    console.log("answer_was_submitted") 
    
    //check that number has not been used and in valid range
    submitted_value = 0;
    grid_inputs = document.querySelectorAll("#board table input"); // select all "input" elements under the element with the id "question-settings"
    if ((AI_HOTSEAT != 1) && (AI_TURN == true)) {
        submitted_value = AI_number();
        console.log("putting AI number into submitted value",submitted_value);
        i = AI_position();
        console.log("putting AI position into i",i);
        document.getElementById("grid_"+i).value = +submitted_value;
        
        console.log("Printing AI number and position on the board");
    }
    else {
        for (i = 0; i < grid_inputs.length; ++i) {
            if (grid_inputs[i].disabled !== true) {
                if (grid_inputs[i].value != 0) {
                    submitted_value = +grid_inputs[i].value;
                    break;
                }
            }
        }
    }
    
    // check the number is in range
    console.log("This is submitted value",submitted_value);
    //we now have the new submitted value ready to validate
    if (submitted_value < 1 || submitted_value >9) {
        document.getElementById("status_update").innerHTML = "The number " + submitted_value + " is not between 1 and 9.  Please try again.";
        
        clear_active_inputs();
        return false;
    }
    
    
    // check if number already used
    for (g = 0; g < grid.length; ++g) {
        console.log("checking if number is there to use",g,submitted_value)
            if (submitted_value == grid[g]) {
                document.getElementById("status_update").innerHTML = "The number " + submitted_value + " has already been used.  Please try another number."         
                return false;
            }
    }
    

    
    if (player_turn == 1) {
        activeplayer = "ATTACKER";
    }        
    else if (player_turn == -1) {
        activeplayer = "DEFENDER";
    }
    
    
    console.log("Putting value in array", i, submitted_value)
    
    
    
    grid[i] = +submitted_value;
    
    //do end of turn things here
    console.log(grid)
    document.getElementById("grid_"+i).disabled = true;
    console.log(submitted_value);
    remove_used_number(submitted_value);
    var index = available_numbers.indexOf(submitted_value);
    
    //removing number for available numbers list
    var index = available_numbers.indexOf(submitted_value);
    if (index > -1) {
        available_numbers.splice(index, 1);
    }
    console.log("remove number from available list",available_numbers);
    
    
        
    turn += 1;
    player_turn = player_turn*-1;
    
    
    if ((turn==2)&&(player_turn==-1)) {
    console.log("Reactivating middle box when required")
    document.getElementById("grid_4").disabled = false;;
    }
    console.log("player turn is " + player_turn)
    
    console.log("player turn after change is " + player_turn)
    
    print_player(player_turn);
    document.getElementById("status_update").innerHTML = "The " +activeplayer + " entered a " + submitted_value + " on the board"
    if(validate_grid(grid) === true) {
        document.getElementById("status_update").innerHTML = "THE ATTACKER WINS!!  Reset Board to play again";
        disable_all_inputs();
        return false;    
    }
    else if (turn == 10) {
        document.getElementById("status_update").innerHTML = "THE DEFENDER WINS!!  Reset Board to play again";
    }
    if (AI_HOTSEAT !=1) {
        AI_TURN ^= true;
        console.log("Changing it to the AIs turn",AI_TURN)
        if ((AI_TURN == true) && (turn !=10))  {
            submit_turn();
        }
    }
    

    return true;
    
    
}

disable_all_inputs = function() {
    grid_inputs = document.querySelectorAll("#board table input"); 
    for (i = 0; i < grid_inputs.length; ++i) {
        grid_inputs[i].disabled = true;
        }
    console.log("Disable All Inputs")
}


clear_all_inputs = function() {
    grid_inputs = document.querySelectorAll("#board table input"); 
    for (i = 0; i < grid_inputs.length; ++i) {
        grid_inputs[i].value = "";
        grid_inputs[i].disabled = false;
        }
    console.log("Clear All Inputs")
}


clear_active_inputs = function() {
    grid_inputs = document.querySelectorAll("#board table input"); // select all "input" elements under the element with the id "question-settings"
    for (i = 0; i < grid_inputs.length; ++i) {
        if (grid_inputs[i].disabled != true) {
            grid_inputs[i].value = "";
        }
    }
    
    console.log("Clear Active Inputs")
}

//on focus clear active inputs

grid_inputs = document.querySelectorAll("#board table input"); // select all "input" elements under the element with the id "question-settings"
for (i = 0; i < grid_inputs.length; ++i) {
  
    grid_inputs[i].onfocus = clear_active_inputs;
}


submit_turn = function () {
    answer_was_submitted();

}



answer_keydown = function(event) {
    if (event.keyCode == 13) {
        console.log("refresh causes this to fire");
        submit_turn();
    }
}

new_game = function () {  
    AI_HOTSEAT = 0;
    AI_HOTSEAT_radiobuttons = document.getElementsByName("AI_HOTSEAT");
    for (var i = 0, length = AI_HOTSEAT_radiobuttons.length; i < length; i++) {
        if (AI_HOTSEAT_radiobuttons[i].checked) {
            AI_HOTSEAT = AI_HOTSEAT_radiobuttons[i].value;
            break; // no sense continuing the loop
        }
    }
    
    if (AI_HOTSEAT == 1) {
        console.log("Hotseat is selected");
        
    }
    else if (AI_HOTSEAT ==2) {
        console.log("Easy AI is selected");
        AI_TURN = null;
    }
    
    question_type = 0; // a bit of base2 magic...
    if (document.getElementById("show-numbers").checked) {
        
        question_type = question_type + 1;
    }
    if (document.getElementById("hide-rules").checked) {
        
        question_type = question_type + 2;
    }
    if (question_type == 0) {
        var element = document.getElementById("numbersavailable");
        element.classList.add("hide");
        var element = document.getElementById("rules");
        element.classList.add("hide");
    }
    
    if (question_type == 1) {
        // show available numbers
        var element = document.getElementById("numbersavailable");
        element.classList.remove("hide");
        var element = document.getElementById("rules");
        element.classList.add("hide");
    }
    else if (question_type == 2) {
        var element = document.getElementById("numbersavailable");
        element.classList.add("hide");
        var element = document.getElementById("rules");
        element.classList.remove("hide");
        
    }
    else if (question_type == 3) {
        var element = document.getElementById("numbersavailable");
        element.classList.remove("hide");
        var element = document.getElementById("rules");
        element.classList.remove("hide");
    }
    
    
    removewinningboxes();
    show_all_numbers();
    grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    player_turn = attack_defend[Math.floor(Math.random() * attack_defend.length)];  
    turn = 1;
    console.log("new_game has been triggered","Grid is",grid);
    available_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    available_positions = []
    print_player(player_turn);
    clear_all_inputs();  
    
    //block out middle box if attacker goes first
    if ((turn==1)&&(player_turn==1)) {
        document.getElementById("grid_4").disabled = true;;
    }
}


new_game();


// -- attach the check_answer function to the submit button
document.getElementById("submit").onclick = submit_turn;

document.getElementById("reset").onclick = new_game;

// -- since this isn't a traditional html form, we can't rely
// on a normal submit (ask me about this later), so you had the
// right idea though; check the key presses and look for an "enter" press
document.getElementById("grid_0").onkeydown = answer_keydown;
document.getElementById("grid_1").onkeydown = answer_keydown;
document.getElementById("grid_2").onkeydown = answer_keydown;
document.getElementById("grid_3").onkeydown = answer_keydown;
document.getElementById("grid_4").onkeydown = answer_keydown;
document.getElementById("grid_5").onkeydown = answer_keydown;
document.getElementById("grid_6").onkeydown = answer_keydown;
document.getElementById("grid_7").onkeydown = answer_keydown;
document.getElementById("grid_8").onkeydown = answer_keydown;



setting_was_changed = function() {
    // one of the settings were changed.
    console.log('the settings were changed');

    // you could also do other things here...

    // (eg. check that the user has permission to change the settings...)

    // but in our case, you just want to:

    // -- generate a new question with whatever the settings are
    new_game();
}

// Any time a setting is changed, call the setting_was_changed() function.
// -- get all the input elements under the #question-settings element
settings_inputs = document.querySelectorAll("#settings input"); // select all "input" elements under the element with the id "settings"
for (i = 0; i < settings_inputs.length; ++i) {
    // The next line attaches the "setting_was_changed" function on to the "onchange"
    // event for each of the "input" elements under the #question-settings element
    // ie. each time those input fields are changed, the setting_was_changed() function will be called.
    settings_inputs[i].onchange = setting_was_changed;
}



run_tests = function() {
    
    // these tests should all be true
    var grid_top_row = [5, 5, 5, 0, 0, 0, 0, 0, 0];
    result_grid_top_row = validate_grid(grid_top_row);
    console.log("result_grid_top_row", result_grid_top_row);
    if (result_grid_top_row !== true) {
        console.log("result_grid_top_row WAS NOT TRUE. TEST FAILED");
    }    
    var grid_middle_row = [0, 0, 0, 5, 5, 5, 0, 0, 0];
    result_grid_middle_row = validate_grid(grid_middle_row);
    console.log("result_grid_middle_row", result_grid_middle_row);
    if (result_grid_middle_row !== true) {
        console.log("result_grid_middle_row WAS NOT TRUE. TEST FAILED");            
    }
    var grid_bottom_row = [0, 0, 0, 0, 0, 0, 5, 5, 5];
    result_grid_bottom_row = validate_grid(grid_bottom_row);
    console.log("result_grid_bottom_row", result_grid_bottom_row);
    if (result_grid_bottom_row !== true) {
        console.log("result_grid_bottom_row WAS NOT TRUE. TEST FAILED");            
    }    
    var grid_left_column = [5, 0, 0, 5, 0, 0, 5, 0, 0];
    result_grid_left_column = validate_grid(grid_left_column);
    console.log("result_grid_left_column", result_grid_left_column);
    if (result_grid_left_column !== true) {
        console.log("result_grid_left_column WAS NOT TRUE. TEST FAILED");            
    }      
    var grid_middle_column = [0, 5, 0, 0, 5, 0, 0, 5, 0];
    result_grid_middle_column = validate_grid(grid_middle_column);
    console.log("result_grid_middle_column", result_grid_middle_column);
    if (result_grid_middle_column !== true) {
        console.log("result_grid_middle_column WAS NOT TRUE. TEST FAILED");            
    }       
    var grid_right_column = [0, 0, 5, 0, 0, 5, 0, 0, 5];
    result_grid_right_column = validate_grid(grid_right_column);
    console.log("result_grid_right_column", result_grid_right_column);
    if (result_grid_right_column !== true) {
        console.log("result_grid_right_column WAS NOT TRUE. TEST FAILED");            
    }   
    var grid_TLBR_Diag = [5, 0, 0, 0, 5, 0, 0, 0, 5];
    result_grid_TLBR_Diag = validate_grid(grid_TLBR_Diag);
    console.log("result_grid_TLBR_Diag", result_grid_TLBR_Diag);
    if (result_grid_TLBR_Diag !== true) {
        console.log("result_grid_TLBR_Diag WAS NOT TRUE. TEST FAILED");            
    }   
    var grid_BLTR_Diag = [0, 0, 5, 0, 5, 0, 5, 0, 0];
    result_grid_BLTR_Diag = validate_grid(grid_BLTR_Diag);
    console.log("result_grid_BLTR_Diag", result_grid_BLTR_Diag);
    if (result_grid_BLTR_Diag !== true) {
        console.log("result_grid_BLTR_Diag WAS NOT TRUE. TEST FAILED");            
    }   
    var grid_BLTR_Diag_fail = [0, 0, 5, 0, 2, 0, 5, 0, 0];
    result_grid_BLTR_Diag_fail = validate_grid(grid_BLTR_Diag_fail);
    console.log("result_grid_BLTR_Diag_fail", result_grid_BLTR_Diag_fail);
    if (result_grid_BLTR_Diag_fail !== false) {
        console.log("result_grid_BLTR_Diag_fail WAS TRUE. TEST FAILED");            
    }   
    
}    