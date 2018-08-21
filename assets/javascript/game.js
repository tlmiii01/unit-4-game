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
            console.log("You won!");
        }
    } else {
        // Update the enemy hitpoint display
        $(".defender #hitPoints").text(myEnemy.healthPts);
        
        myCharacter.healthPts -= myEnemy.counterAttackPts;
        $("#status").append("<p>" + myEnemy.name + " has counter attacked with " + myEnemy.counterAttackPts + "!</p>");

        if (myCharacter.healthPts <= 0) {
            console.log("Game Over.");
        } else {
            $("#my-character #hitPoints").text(myCharacter.healthPts);
        }
    }

}

$(document).ready(function() {

    // Create a new character
    var characters = [ new Character("Darth Vader", "./assets/images/Vader-1.jpg", 0, 125, 40, 20),
                       new Character("Luke Skywalker", "./assets/images/luke-1.jpg", 1, 100, 60, 30),
                       new Character("Boba Fett", "./assets/images/boba-1.jpg", 2, 80, 80, 40),
                       new Character("Yoda", "./assets/images/yoda-1.jpg", 3, 200, 20, 10)];
    
    for (let i = 0; i < characters.length; i++) {
        buildCharacterTile(characters[i]);
    }
    
    $(".character-list>.tile").on("click", function() {
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
        // console.log("My character's name is: " + myCharacter.name);
        // console.log("My enemy's name is: " + myEnemy.name);

        // Add myCharacter attackPts to the currentAttackPts
        currentAttackPts += myCharacter.attackPts;
        // console.log("New attack level: " + currentAttackPts);
        // console.log("Counter attack: " + myEnemy.counterAttackPts);

        evaluateAttack();
    });

    

    

}); 