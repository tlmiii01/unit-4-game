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
    var Vader = new Character("Darth Vader", "./assets/images/Vader-1.jpg", "vader", 100, 25, 10);
    var yoda = new Character("Yoda", "./assets/images/yoda-1.jpg", "yoda", 50, 10, 20);
    
    buildCharacterTile(Vader);
    buildCharacterTile(yoda);
    
    $(".tile").on("click", function() {
        // If player isn't selected, move the clicked charcter to myCharacter
        console.log("Got inside character-tile click handler");
        if (!isPlayerSelected) {
            var myCharacter = $(this).detach();
            $("#my-character").append(myCharacter);
            isPlayerSelected = true;
        } 
    });

    $("#attack-button").on("click", function() {
        console.log("Attack clicked!");
    })

    

    

}); 