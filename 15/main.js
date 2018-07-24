//To do
//Have an icon/picture to remind player which role they are playing
//Make validate grid a list of lists


rand_int = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var binary = [-1, 1];
var random_binary = binary[Math.floor(Math.random() * binary.length)];
var turn = 1;
var available_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var available_positions = [];
var Player1 = "";
var Player2 = "";
var Player1role = "";
var Player2role = "";
var activeplayer = "";
var AI_EASY = "";
var Players = [];
var i = "";
var Player1Score = 0;
var Player2Score = 0;





//Get human input when submitted
GET_HUMAN_INPUT = function() {
    for (i = 0; i < grid_inputs.length; ++i) {
        if (grid_inputs[i].disabled !== true) {
            if (grid_inputs[i].value != 0) {
                submitted_value = +grid_inputs[i].value;
                break;
            }
        }
    }
}

//AI CODE
//code to find available positions left on the board
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

//AI EASY - picking random position
function AI_EASY_position() {
    get_available_positions();
    var AI_position = available_positions[Math.floor(Math.random() * available_positions.length)];
    console.log("Getting random position",AI_position)
    return AI_position;
}

//AI EASY - picking random number
function AI_number() {
    var AI_number = available_numbers[Math.floor(Math.random() * available_numbers.length)];
    console.log("Getting random number",AI_number)
    return AI_number
}

//AI EASY taking a turn
AI_EASY_TURN = function() {
    submitted_value = AI_number();
    console.log("putting AI number into submitted value",submitted_value);
    i = AI_EASY_position();
    console.log("putting AI position into i",i);
    document.getElementById("grid_"+i).value = +submitted_value;   
    console.log("Printing AI number and position on the board");
}
//FORMATTING/VISUAL CODE

//setting up the scoring table

function print_scoreboard() {
    document.getElementById("player1score").innerHTML = Player1Score;
    document.getElementById("player2score").innerHTML = Player2Score;
    document.getElementById("player1name").innerHTML = Player1;
    document.getElementById("player2name").innerHTML = Player2;
}

//this adds the class 'used' so that the display is none on the used number (makes it invisible)
function change_board_colour(activeplayer) {    
    var element = document.getElementById("board");
    element.classList.add(activeplayer);
}

function remove_board_colour(activeplayer) {    
    var element = document.getElementById("board");
    element.classList.remove(activeplayer);
}


function remove_used_number(b) {
    var element = document.getElementById("used_"+b);
    element.classList.add("used");
}

//colours the winning boxes if the attacker wins
function winningboxes(a) {
    var element = document.getElementById("grid_"+a);
    element.classList.add("winning");
}

//removes the winning colours - called when a new game begins
function removewinningboxes() {
    grid_inputs = document.querySelectorAll("#board table input"); 
    for (i = 0; i < grid_inputs.length; ++i) {
        var element = document.getElementById("grid_"+i);
        element.classList.remove("winning");
    }
    console.log("Remove winning colour class")
}

//makes all the numbers visible - called when a new game begins
function show_all_numbers() { 
    for (i = 1; i < 10; ++i) {
        var element = document.getElementById("used_"+i);
        element.classList.remove("used");
    }
    console.log("Remove winning colour class")
}

//print active player/scores/etc.
print_player = function(player_turn) {
    if ((turn == 1) && (activerole == "ATTACKER")) {
        document.getElementById("status_update").innerHTML = activeplayer + " has the the first turn.  You cannot use the middle square on your first turn as the ATTACKER.";
    }
    else if ((turn == 1) && (activerole == "DEFENDER")) {
        document.getElementById("status_update").innerHTML = activeplayer + " has the the first turn as the DEFENDER.";
    }
    document.getElementById("player_turn").innerHTML = activeplayer;
    document.getElementById("player_role").innerHTML = activerole;
    console.log("change board colour to",activeplayer);
    change_board_colour(activeplayer);
    print_scoreboard()
    
}

//function that gets called when a new active box is clicked, it clears all the other active boxes so user cannot enter two numbers at once
clear_active_inputs = function() {
    grid_inputs = document.querySelectorAll("#board table input"); // select all "input" elements under the element with the id "question-settings"
    for (i = 0; i < grid_inputs.length; ++i) {
        if (grid_inputs[i].disabled != true) {
            grid_inputs[i].value = "";
        }
    }
    
    console.log("Clear Active Inputs")
}

//clear active inputs on focus
grid_inputs = document.querySelectorAll("#board table input"); // select all "input" elements under the element with the id "question-settings"
for (i = 0; i < grid_inputs.length; ++i) {
  
    grid_inputs[i].onfocus = clear_active_inputs;
}




//GAME FUNCTION CODE



//check to see if a winning combination is present
check_for_winning_combination = function(grid) {
    console.log("Starting to check for winning combinations");
    grid_lines_positions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];  
    for (i = 0; i < grid_lines_positions.length; ++i) {
        if (grid[grid_lines_positions[i][0]]&&grid[grid_lines_positions[i][1]]&&grid[grid_lines_positions[i][2]] != 0) {
            if (grid[grid_lines_positions[i][0]] + grid[grid_lines_positions[i][1]] + grid[grid_lines_positions[i][2]] == 15) {
                console.log("USING NEW FORMULA TO GET ATTACKING WINNER");
                for (g = 0; g < grid_lines_positions[i].length; ++g) {
                    winningboxes(grid_lines_positions[i][g]);
                }
                return true;   
            }    
        }
    }
    console.log("Nothing adds to 15 yet")
    return false;    
}

//once human/AI has submitted a number, check it, validate it, print it. 
answer_was_submitted = function() {
    console.log("answer_was_submitted") 
    
    //check that number has not been used and in valid range
    submitted_value = 0;
    grid_inputs = document.querySelectorAll("#board table input"); // select all "input" elements under the element with the id "question-settings"
    if (activeplayer == "AI_EASY") {   
        AI_EASY_TURN();
    }
    else {
        GET_HUMAN_INPUT();
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
        
        if (submitted_value == grid[g]) {
            document.getElementById("status_update").innerHTML = "The number " + submitted_value + " has already been used.  Please try another number."         
            return false;
        }
    }
    
    
    grid[i] = +submitted_value;
    
    
    document.getElementById("grid_"+i).disabled = true; //disable the box that has had an input
    remove_used_number(submitted_value); //make the number invisible on the list of available numbers
    
    //adding a turn and switching the active role (need to change or add player)
    turn += 1;
    document.getElementById("status_update").innerHTML = activeplayer + " entered a " + submitted_value + " on the board"
    console.log("this turn active player is",activeplayer,"Player1 is", Player1, "Player2 is", Player2);
    console.log("It is turn",turn);
    
    //check to see if someone has won
    if(check_for_winning_combination(grid) === true) {
        if (Player1role == "ATTACKER") {
            console.log("Player1 is", Player1, Player1role)
            document.getElementById("status_update").innerHTML = Player1 + " WINS!!  Reset Board to play again";
            Player1Score += 1;
        }
        else if (Player2role == "ATTACKER") {
            console.log("Player2 is", Player2, Player2role)
            document.getElementById("status_update").innerHTML = Player2 + " WINS!!  Reset Board to play again";
            Player2Score += 1;
        }   
        disable_all_inputs();
        return false;    
    }
    if (turn == 10) {
    console.log("Check if all the boxes are full after checking for no winning combination")
        if (Player1role == "DEFENDER") {
            document.getElementById("status_update").innerHTML = Player1 + " WINS!!  Reset Board to play again";
            Player1Score += 1;
            return false;
            
        }   
        else if (Player2role == "DEFENDER") {
            document.getElementById("status_update").innerHTML = Player2 + " WINS!!  Reset Board to play again";
            Player2Score += 1;
            return false;
            
        }
        return false;
    }
    
    
    //removing number for available numbers list that the AI uses
    var index = available_numbers.indexOf(submitted_value);
    if (index > -1) {
        available_numbers.splice(index, 1);
    }
    
    //switching the active player
    if (activeplayer == Player1) {
        console.log("Changing the active player who is",activeplayer);
        remove_board_colour(activeplayer);
        activeplayer = Player2;
        console.log("New active player is",activeplayer);
    }
    
    else if(activeplayer == Player2) {
        console.log("Changing the active player who is",activeplayer);
        remove_board_colour(activeplayer);
        activeplayer = Player1;    
        console.log("New active player is",activeplayer);
    }
    //switching the active role
    console.log("Active role is",activerole)
    if (activerole == "ATTACKER") {
        activerole = "DEFENDER";
        console.log("New active role is",activerole)
    }
    else if(activerole == "DEFENDER") {
        activerole = "ATTACKER";
        console.log("New active role is",activerole)
    }
    //activate the middle box if it is turn two and the active player is the defender.  Will need to change once player_turn changes
    if ((turn==2)&&(activerole=="DEFENDER")) {
    console.log("Reactivating middle box when required")
    document.getElementById("grid_4").disabled = false;;
    }

    if (activeplayer == "AI_EASY") {
        answer_was_submitted();
    }
    
    //update commentary and active player
    print_player(player_turn);
    
    
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


submit_turn = function () {
    answer_was_submitted();

}

//reset the game/players
reset_game = function() {
    Player1Score = 0;
    Player2Score = 0;
    new_game();
}


//get the settings and start the game based on them
new_game = function () {  
    //get player selections
    Player1 = document.getElementById("Player1").value;
    Player2 = document.getElementById("Player2").value;
    console.log("Player1 is",Player1);
    console.log("Player2 is",Player2);
    Players = [Player1, Player2];
    document.getElementById("player1is").innerHTML = Player1;
    document.getElementById("player2is").innerHTML = Player2;
    
    //randomise roles
    randomise_roles = binary[Math.floor(Math.random() * binary.length)];
    if (randomise_roles == 1) {
        Player1role = "ATTACKER";
        Player2role = "DEFENDER";
    }
    else {
        Player1role = "DEFENDER";
        Player2role = "ATTACKER";
    }
    document.getElementById("player1role").innerHTML = Player1role;
    document.getElementById("player2role").innerHTML = Player2role;
    
    //randomise the first active player
    first_active_player = binary[Math.floor(Math.random() * binary.length)];
    if (first_active_player == 1) {
        activeplayer = Player1;
        activerole = Player1role;
    }
    else {
        activeplayer = Player2;
        activerole = Player2role;
    }
    document.getElementById("player_turn").innerHTML = activeplayer;
    document.getElementById("player_role").innerHTML = activerole;

    removewinningboxes();
    show_all_numbers();
    grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    turn = 1;
    available_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    available_positions = []
    print_player(player_turn);
    clear_all_inputs();  
    console.log("player 1 details",Player1,Player1role);
    console.log("player 2 details",Player2,Player2role);
    console.log("Active player is",activeplayer,activerole);
    console.log("The Players Are",Players);
    //block out middle box if attacker goes first
    if ((turn==1)&&(activerole=="ATTACKER")) {
        document.getElementById("grid_4").disabled = true;;
    }
    
    if (activeplayer == "AI_EASY") {
        answer_was_submitted();
    }
}


new_game();


//INTERFACE CODE - mouse, keyboard and buttons
answer_keydown = function(event) {
    if (event.keyCode == 13) {
        console.log("refresh causes this to fire");
        submit_turn();
    }
}

// -- attach the check_answer function to the submit button
document.getElementById("submit").onclick = submit_turn;
document.getElementById("reset").onclick = new_game;
document.getElementById("resetgame").onclick = reset_game;
// -- since this isn't a traditional html form, we can't rely
// on a normal submit (ask me about this later), so you had the
// right idea though; check the key presses and look for an "enter" press

for (i = 0; i < 9; ++i) {
    document.getElementById("grid_"+i).onkeydown = answer_keydown;
}


setting_was_changed = function() {
    // one of the settings were changed.
    console.log('the settings were changed');
        //show/hide things
    question_type = 0; //
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
}

setting_was_changed();
// Any time a setting is changed, call the setting_was_changed() function.
// -- get all the input elements under the #question-settings element
settings_inputs = document.querySelectorAll("#settings input"); // select all "input" elements under the element with the id "settings"
for (i = 0; i < settings_inputs.length; ++i) {
    // The next line attaches the "setting_was_changed" function on to the "onchange"
    // event for each of the "input" elements under the #question-settings element
    // ie. each time those input fields are changed, the setting_was_changed() function will be called.
    settings_inputs[i].onchange = setting_was_changed;
}



//run tests to see if working
run_tests = function() {
    
    // these tests should all be true
    var grid_top_row = [5, 5, 5, 0, 0, 0, 0, 0, 0];
    result_grid_top_row = check_for_winning_combination(grid_top_row);
    console.log("result_grid_top_row", result_grid_top_row);
    if (result_grid_top_row !== true) {
        console.log("result_grid_top_row WAS NOT TRUE. TEST FAILED");
    }    
    var grid_middle_row = [0, 0, 0, 5, 5, 5, 0, 0, 0];
    result_grid_middle_row = check_for_winning_combination(grid_middle_row);
    console.log("result_grid_middle_row", result_grid_middle_row);
    if (result_grid_middle_row !== true) {
        console.log("result_grid_middle_row WAS NOT TRUE. TEST FAILED");            
    }
    var grid_bottom_row = [0, 0, 0, 0, 0, 0, 5, 5, 5];
    result_grid_bottom_row = check_for_winning_combination(grid_bottom_row);
    console.log("result_grid_bottom_row", result_grid_bottom_row);
    if (result_grid_bottom_row !== true) {
        console.log("result_grid_bottom_row WAS NOT TRUE. TEST FAILED");            
    }    
    var grid_left_column = [5, 0, 0, 5, 0, 0, 5, 0, 0];
    result_grid_left_column = check_for_winning_combination(grid_left_column);
    console.log("result_grid_left_column", result_grid_left_column);
    if (result_grid_left_column !== true) {
        console.log("result_grid_left_column WAS NOT TRUE. TEST FAILED");            
    }      
    var grid_middle_column = [0, 5, 0, 0, 5, 0, 0, 5, 0];
    result_grid_middle_column = check_for_winning_combination(grid_middle_column);
    console.log("result_grid_middle_column", result_grid_middle_column);
    if (result_grid_middle_column !== true) {
        console.log("result_grid_middle_column WAS NOT TRUE. TEST FAILED");            
    }       
    var grid_right_column = [0, 0, 5, 0, 0, 5, 0, 0, 5];
    result_grid_right_column = check_for_winning_combination(grid_right_column);
    console.log("result_grid_right_column", result_grid_right_column);
    if (result_grid_right_column !== true) {
        console.log("result_grid_right_column WAS NOT TRUE. TEST FAILED");            
    }   
    var grid_TLBR_Diag = [5, 0, 0, 0, 5, 0, 0, 0, 5];
    result_grid_TLBR_Diag = check_for_winning_combination(grid_TLBR_Diag);
    console.log("result_grid_TLBR_Diag", result_grid_TLBR_Diag);
    if (result_grid_TLBR_Diag !== true) {
        console.log("result_grid_TLBR_Diag WAS NOT TRUE. TEST FAILED");            
    }   
    var grid_BLTR_Diag = [0, 0, 5, 0, 5, 0, 5, 0, 0];
    result_grid_BLTR_Diag = check_for_winning_combination(grid_BLTR_Diag);
    console.log("result_grid_BLTR_Diag", result_grid_BLTR_Diag);
    if (result_grid_BLTR_Diag !== true) {
        console.log("result_grid_BLTR_Diag WAS NOT TRUE. TEST FAILED");            
    }   
    var grid_BLTR_Diag_fail = [0, 0, 5, 0, 2, 0, 5, 0, 0];
    result_grid_BLTR_Diag_fail = check_for_winning_combination(grid_BLTR_Diag_fail);
    console.log("result_grid_BLTR_Diag_fail", result_grid_BLTR_Diag_fail);
    if (result_grid_BLTR_Diag_fail !== false) {
        console.log("result_grid_BLTR_Diag_fail WAS TRUE. TEST FAILED");            
    }   
    
}    