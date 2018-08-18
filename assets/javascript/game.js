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

function buildCharacterTile(character) {
    var newCharacter = $("<div>");
    newCharacter.addClass("character-tile");

    // Adding stuff to tile
    var tempElement = $("<div>");
    tempElement.text(character.name);
    newCharacter.append(tempElement);
    tempElement = $("<img>");
    tempElement.attr("src", character.picture);
    newCharacter.append(tempElement);

    tempElement = $("<div>");
    tempElement.add
    tempElement.text(character.healthPts);
    
    $(".character-list").append(newCharacter);
}

$(document).ready(function() {

    // Create a new character
    var Vader = new Character("Darth Vader", "./assets/images/Vader-1.jpg" , 100, 25, 10);
    console.log(Vader.name);
    console.log(Vader.healthPts);
    console.log(Vader.attackPts);
    console.log(Vader.counterAttackPts);

    buildCharacterTile(Vader);
    

}); 