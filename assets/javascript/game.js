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

function buildCharacterTile(character) {
    var newCharacter = $("<button>");
    newCharacter.addClass("tile");

    // Adding stuff to tile
    var tempElement = $("<div>");
    tempElement.text(character.name);
    newCharacter.append(tempElement);
    tempElement = $("<img>");
    tempElement.attr("src", character.picture);
    newCharacter.append(tempElement);

    tempElement = $("<div>");
    tempElement.text(character.healthPts);
    newCharacter.append(tempElement);
    
    $(".character-list").append(newCharacter);
}

$(document).ready(function() {

    // Create a new character
    var characters = [ new Character("Darth Vader", "./assets/images/Vader-1.jpg", 0, 100, 25, 10),
                       new Character("Luke Skywalker", "./assets/images/luke-1.jpg", 1, 80, 30, 110),
                       new Character("Boba Fett", "./assets/images/boba-1.jpg", 2, 75, 20, 15),
                       new Character("Yoda", "./assets/images/yoda-1.jpg", "yoda", 50, 10, 20)];
    
    for (let i = 0; i < characters.length; i++) {
        buildCharacterTile(characters[i]);
    }
    
    $(".character-list>.tile").on("click", function() {
        // If player isn't selected, move the clicked charcter to myCharacter
        if (!isPlayerSelected) {
            var myCharacter = $(this).detach();
            $("#my-character").append(myCharacter);
            $(this).css("background", "blue");
            
            // Move the rest of the buttons to the enemies list
            $(".character-list>.tile").detach().appendTo(".enemy-list");
            $(".enemy-list>.tile").css("background", "red");
            isPlayerSelected = true;
        } 
    });

    $(".enemy-list").on("click", ".tile", function() {
        debugger;
        if (!isEnemySelected) {
            $(this).detach().appendTo(".defender");
            isEnemySelected = true;
        }
    })

    $("#attack-button").on("click", function() {
        console.log("Attack clicked!");
    })

    

    

}); 