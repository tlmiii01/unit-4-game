// Class for character
class Character {
    constructor(name, picture, charID, healthPts, attackPts, counterAttackPts ) {
        this.name = name
        this.picture = picture;
        this.charID = charID;
        this.healthPts = healthPts;
        this.attackPts = attackPts;
        this.counterAttackPts = counterAttackPts;
    }
}

var isPlayerSelected = false;
var isEnemySelected = false;
var currentAttackPts = 0;

// Charater during gameplay
var myCharacter = null;
var myEnemy = null;

// Array of character objects.
var characters = [ new Character("Darth Vader", "./assets/images/Vader-1.jpg", 0, 125, 40, 20),
                   new Character("Luke Skywalker", "./assets/images/luke-1.jpg", 1, 100, 60, 30),
                   new Character("Boba Fett", "./assets/images/boba-1.jpg", 2, 80, 80, 40),
                   new Character("Yoda", "./assets/images/yoda-1.jpg", 3, 200, 20, 10)];

                   
function buildCharacterTile(character) {
    var newCharacter = $("<button>");
    newCharacter.addClass("tile");
    newCharacter.attr("id", character.charID);

    // Adding stuff to tile
    var tempElement = $("<div>");
    tempElement.text(character.name);
    newCharacter.append(tempElement);
    tempElement = $("<img>");
    tempElement.attr("src", character.picture);
    newCharacter.append(tempElement);

    tempElement = $("<div>");
    tempElement.attr("id", "hitPoints");
    tempElement.text(character.healthPts);
    newCharacter.append(tempElement);
    
    $(".character-list").append(newCharacter);
}

function evaluateAttack() {
    // User character will always win the tie.
    myEnemy.healthPts -= currentAttackPts;

    $("#status").empty();
    $("#status").append("<p>" + myCharacter.name + " has attacked with " + currentAttackPts + "!</p>");
    
    // Check to see if the Enemy is dead
    if (myEnemy.healthPts <= 0) {
        // console.log("Enemy is dead...");
        $("#status").append("<p>" + myEnemy.name + " was defeated! Pick another fighter! </p>");
        // Do stuff to kill the enemy
        $(".defender>.tile").fadeOut(1500);
        
        if ($(".enemy-list .tile").length > 0) {
            isEnemySelected = false;
        } else {
            $("#status").empty();
            $("#status").append("<p>You are victorious...</p>");
            $("#status").append("<p>Press the Reset button to play again!</p>");
            generateReset();
        }
    } else {
        // Update the enemy hitpoint display
        $(".defender #hitPoints").text(myEnemy.healthPts);
        
        myCharacter.healthPts -= myEnemy.counterAttackPts;
        $("#status").append("<p>" + myEnemy.name + " has counter attacked with " + myEnemy.counterAttackPts + "!</p>");

        if (myCharacter.healthPts <= 0) {
            $("#status").empty();
            $("#status").append("<p>You have been defeated...</p>");
            $("#status").append("<p>Press the Reset button to play again!</p>");
            generateReset();
        } else {
            $("#my-character #hitPoints").text(myCharacter.healthPts);
        }
    }
}

function generateReset() {
    var newButton = $("<button>");
    newButton.text("Reset Game");
    newButton.addClass("reset");
    $("#status").append(newButton);

}

function createCharacter() {
    // Create a new character
    for (let i = 0; i < characters.length; i++) {
        buildCharacterTile(characters[i]);
    }
}

$(document).ready(function() {

    createCharacter();

    $(".character-list").on("click", ".tile", function() {
        // If player isn't selected, move the clicked charcter to myCharacter
        if (!isPlayerSelected) {
            var myCharacterTile = $(this).detach();
            $("#my-character").append(myCharacterTile);
            // $(this).css("background", "blue");

            // Add the associated character to the gameboard
            var charIndex = $(this).attr('id');
            myCharacter = characters[charIndex];
            
            // Move the rest of the buttons to the enemies list
            $(".character-list>.tile").detach().appendTo(".enemy-list");
            // $(".enemy-list>.tile").css("background", "red");
            isPlayerSelected = true;
        } 
    });

    $(".enemy-list").on("click", ".tile", function() {
        if (!isEnemySelected) {
            $(this).detach().appendTo(".defender");

            // Add the associated character to the gameboard
            var charIndex = $(this).attr('id');
            myEnemy = characters[charIndex];

            isEnemySelected = true;
        }
    });

    $("#attack-button").on("click", function() {
                
        if ($("#my-character .tile").length === 0) {
            $("#status").empty();
            $("#status").append("<p>Please select a character.</p>");
        } else if ($(".defender .tile").length === 0) {
            $("#status").empty();
            $("#status").append("<p>Please select an opponent.</p>");
        } else {
            // Add myCharacter attackPts to the currentAttackPts
            currentAttackPts += myCharacter.attackPts;
            evaluateAttack();
        }

    });

    // Event handler for reset button
    $("#status").on("click", ".reset", function(){
        // clear global variables
        myCharacter = null;
        myEnemy = null;
        currentAttackPts = 0;
        isEnemySelected = false;
        isPlayerSelected = false;

        // Empty divs
        $("#my-character").empty();
        $(".enemy-list").empty();
        $("#status").empty();

        // Create the characters again
        createCharacter();
    });

    

    

}); 