// This variable is the amount of characters used in the input box
let characterCount = 0;

// This variable is the actual hidden word that needs to be found
let theWord = "";

// This variable keeps track of how many incorrect guesses the player has
let strikeCount = 0;

// This is the variable that is used to display which letters need 
let hiddenWord = "";

// This variable keeps track if the dropdown menu is down or hidden
let drop = false;

// This variable is the hint, or topic, assigned by the player
let theTopic = "";

// This variable keeps track if the player used a hint
let hintUse = false;

// This keeps track if the player chose to play Single Player or Two Player
let singlePlayer = true;

// This is to change source of the hangman image for varying themes
let hangmanSource = "";

// This is to change the type of hangman image for varying themes
let type = ".svg";

// This is to check whether to set the word or start the game in Two Player mode
let initializeGame = false;

let lastPage = 0;

// This function acts as a drop menu for the themes button 
function dropdownToggle(pageOpen){
    if(pageOpen == 1){
        // Open the pop up menu
        document.getElementById('moreMenuDiv').style.display="flex";
        document.getElementById("moreButton1").style.display = "none";
        document.getElementById("moreButton2").style.display = "flex";
        document.getElementById("mainGame").style.pointerEvents = "none";
    }else if (pageOpen == 2) {
        // Open the themes page
        lastPage = pageOpen;
        document.getElementById("backButton").style.display = "flex";
        document.getElementById("exitButton").style.display = "none";
        document.getElementById("menuContentsFlex").style.display = "none";
        document.getElementById("menuPagesFlex").style.display = "flex";
        document.getElementById("themeContainer").style.display = "flex";
    }else if(pageOpen == 3){
        lastPage = pageOpen;
        document.getElementById("backButton").style.display = "flex";
        document.getElementById("exitButton").style.display = "none";
        document.getElementById("menuContentsFlex").style.display = "none";
        document.getElementById("menuPagesFlex").style.display = "flex";
        document.getElementById("moreGamesContainer").style.display = "flex";
    }else if(pageOpen == 4){
        lastPage = pageOpen;
        document.getElementById("backButton").style.display = "flex";
        document.getElementById("exitButton").style.display = "none";
        document.getElementById("menuContentsFlex").style.display = "none";
        document.getElementById("menuPagesFlex").style.display = "flex";
        document.getElementById("creditsContainer").style.display = "flex";
    }else if(pageOpen == 5){
        if(lastPage == 2){
            document.getElementById("themeContainer").style.display = "none";
            document.getElementById("menuPagesFlex").style.display = "none";
            document.getElementById("menuContentsFlex").style.display = "flex";
        }else if(lastPage == 3){
            document.getElementById("moreGamesContainer").style.display = "none";
            document.getElementById("menuPagesFlex").style.display = "none";
            document.getElementById("menuContentsFlex").style.display = "flex";
        }else if(lastPage == 4){
            document.getElementById("creditsContainer").style.display = "none";
            document.getElementById("menuPagesFlex").style.display = "none";
            document.getElementById("menuContentsFlex").style.display = "flex";
        }
        document.getElementById("backButton").style.display = "none";
        document.getElementById("exitButton").style.display = "flex";
    }else{
        // close the pop up menu
        document.getElementById('moreMenuDiv').style.display="none";
        document.getElementById("moreButton1").style.display = "flex";
        document.getElementById("moreButton2").style.display = "none";
        document.getElementById("mainGame").style.pointerEvents = "all";
    }
}

// This function sets the letter in the input box
function set(letter) {

    // This makes sure that the word or phrase is not greater than 20 characters
    if (characterCount != 20){
        var tbInput = document.getElementById("wordSetInput");
        tbInput.value += letter;

        // This ensures that the spaces are not counted towards the character limit
        if (letter != " " ){
            characterCount++;
        }
    }
}

// This function serves to either delete a letter from the input box or clear it altogether
function del(key) {
    var tbInput = document.getElementById("wordSetInput");
    // This checks if the 'Delete' key was pressed, if so delete 1 character
    if (key == true){
        tbInput.value = tbInput.value.substr(0, tbInput.value.length - 1);
        if (characterCount != 0){
            characterCount--;
        }
    }
    // If the delete key wasn't pressed, the 'Clear' key was and should delete the whole word
    else{
    tbInput.value = tbInput.value.substr(0, tbInput.value.length - tbInput.value.length);
    characterCount = 0;
    }
}

// This function sets the word that needs to be found, then sets up for the topic to be written
function wordSet(){
    if (initializeGame == false){
        // This gets the value from the input box and assigns to theWord
        var tbInput = document.getElementById("wordSetInput");
        theWord = tbInput.value;

        // This clears the input box and resets the character count
        tbInput.value = tbInput.value.substr(0, tbInput.value.length - tbInput.value.length);
        characterCount = 0;
        
        // This changes the instructions
        document.getElementById("instructions").innerHTML = "Set the Topic";

        // This sets initializeGame to true, so the next time the function is called it begins the game
        initializeGame = true;
    }else {
        // This begins the game for Two Player Mode
        gameTwoStart();
    }
}

// This function starts the game for two players
function gameTwoStart(){

    // This takes the input and assigns it to theTopic
    var tbInput = document.getElementById("wordSetInput");
    theTopic = tbInput.value;

    // This hides everything visible to the setter
    document.getElementById("settingKeyboard").style.display = "none";
    document.getElementById("boxForInput").style.display = "none";
    document.getElementById("instructions").style.display = "none";

    // This sends theWord to be hidden
    hideWord();

    // This sets up the game for guesser to begin playing
    document.getElementById("hangmanCharacter").style.display = "flex";
    document.getElementById("guessingKeyboardTwoPlayer").style.display = "flex";
    document.getElementById("gameDisplay").style.display = "flex";
    document.getElementById("wordDisplay").innerHTML = hiddenWord;
    document.getElementById("wordDisplay").style.display = "flex";
    document.getElementById("hintDisplay").innerHTML  = theTopic;
    document.getElementById("hintDisplay").style.display = "flex";
}

// This function changes hiddenWord to underscores representing the missing letters
function hideWord(){
    for (let x = 0; x < theWord.length; x++){
        // If the character at x is a space, don't replace it with a underscore
        if (theWord.charAt(x) == " "){
            hiddenWord += " ";
        }
        // Since the character is not a space it must be a letter, thus replace it with an underscore
        else {
            hiddenWord += "_";
        }
    }
}

// This function checks if the letter guessed is in the hidden word, then removes the button clicked
function guessCheck(letter, button){

    // These variables are used to check if the guess was correct and if theres any letters left
    let correctLetter = false;
    let lettersLeft = false;
    const remainingLettersSet = new Set();

    // Thides the keyboard that was used to guess
    document.getElementById(button).style.display = "none";

    // This checks if the letter guessed is actually in the word
    for (let x = 0; x < theWord.length; x++){
        // If it is, it sets correct letter to true, replaces the underscore at x in hiddenWord with the letter, then displays the updates hiddenWord
        if (letter == theWord.charAt(x)){
            correctLetter = true;
            hiddenWord = hiddenWord.substring(0, x) + letter + hiddenWord.substring(x + 1);
            document.getElementById("wordDisplay").innerHTML  = hiddenWord;
        }
    }

    // If correctLetter remains false, meaning a wrong guess, the add to the strike count and change the hangman picture
    if (correctLetter == false){
        strikeCount++;
        document.getElementById("hangmanCharacter").src="assets/Strike_" + strikeCount +  hangmanSource + type;
    }

    for (let y = 0; y < theWord.length; y++){
        if (hiddenWord.charAt(y) == "_"){
            lettersLeft = true;
            remainingLettersSet.add(theWord.charAt(y));
        }
    }

    // This checks if the players is allowed to have a guess
    hintCheck(remainingLettersSet);

    // If lettersLeft remains false, meaning theres remaining letters, then you won
    if(lettersLeft == false){
        youWon();
    }

    // If you reach 6 strikes, then you lost
    if (strikeCount == 6){
        youLost();
    }
}

// This function displays the losing page
function youLost(){
    // This hides the keyboards
    document.getElementById('guessingKeyboardTwoPlayer').style.display="none";
    document.getElementById('guessingKeyboardSinglePlayer').style.display="none";

    // This displays the final message
    document.getElementById("finalMessage").style.display="flex";
    document.getElementById("message").innerHTML = "You Lost";

    // Then reveals the word
    hiddenWord = theWord;
    document.getElementById("wordDisplay").innerHTML  = hiddenWord;
}

// This function displays the winning page
function youWon(){
    // This hides the keyboards
    document.getElementById('guessingKeyboardSinglePlayer').style.display="none";
    document.getElementById('guessingKeyboardTwoPlayer').style.display="none";

    // This displays the final message
    document.getElementById("finalMessage").style.display="flex";
    document.getElementById("message").innerHTML = "You Won!"

    // Then plays a little jingle
    document.getElementById('sound1').play();
}


// This function starts the game depending if the user chose Single Player or Two Player
function loadGame(playerCount){
    // This assigns single play to either true or false depending on if the player chose Single Player or Two Player
    singlePlayer = playerCount;

    //This hides the loading page then displays the actual game
    document.getElementById("loadingPage").style.display="none";
    document.getElementById("mainGame").style.display="flex";

    // If the player chose Single Player mode, then it will display the div for that mode
    if(playerCount == true){
        document.getElementById("singlePlayer").style.display = "flex";
        document.getElementById("twoPlayer").style.display = "none";
        gameOneStart();
    }
    // If not, they chose Two Player mode then it will display the div for that mode
    else{
        document.getElementById("singlePlayer").style.display = "none";
        document.getElementById("twoPlayer").style.display = "flex";
    }
}


// This function starts the game for Single Player mode
function gameOneStart(){
    // This displays the Hangman and guessing keyboard
    document.getElementById("gameDisplay").style.display = "flex";
    document.getElementById("hangmanCharacter").style.display = "flex";
    document.getElementById("guessingKeyboardSinglePlayer").style.display = "flex";

    // This hides the instruction and input box since it is Single Player Mode
    document.getElementById("instructions").style.display = "none";
    document.getElementById("boxForInput").style.display = "none";

    // This then calls to find a random word then display it
    getRandomWord();
    document.getElementById("wordDisplay").style.display = "flex";
}

// This function gets the information from the online txt file, then sends it to handleImportantData
function getRandomWord(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) { // If the request is complete with status code "OK"
            handleImportantData(req.responseText);
        }
    };
    req.open("GET", "https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa.txt", true);
    req.send();
}

// This function receives the data from getRandomWord, then splits the txt file into different words and chooses one at random
function  handleImportantData(data){

    // This gets the information from the txt file, separates it by line, then adds to its array
    var lines = data.split("\n");

    // This chooses a random number with the highest number being the amount size of the array
    var a = Math.floor(Math.random() * lines.length);

    // This sends the word to be checked if it is the appropriate size
    var b = setWord(lines[a]);

    // If so, assign theWord to that random word
    theWord = b;

    // Then hide that random word
    hideWord();

    // Change the display to show the hidden word
    document.getElementById("wordDisplay").innerHTML  = hiddenWord;
}

// This function checks if the word given is not less than 5 or greater than 15 letters, if so it start the random word search over again
function setWord(data){

    //Assigns a to the random word given by the previous function
    var a = data.substring(0, data.length);

    // This changes the word to upper case
    a = a.toUpperCase();

    // This checks if the letter is of appropriate size, if so return it and assign it to theWord, if not start agaim
    if (a.length > 15 || a.length < 5){
        getRandomWord();
    }else{
        return a;
    }
}

// This function swaps the them, then changes the hangman image source to match the theme 
function swapTheme(theme, number){
    document.getElementById('stylesheet').setAttribute('href', theme);

    // This changes the css file and hangman picture depending on the button clicked
    if (number == 1 || number  == 2){
        hangmanSource = "";
        type = ".svg"
        document.getElementById("body").style.backgroundImage = "none";
    }else if (number == 3){
        hangmanSource = "_Terminal";
        type = ".png"
        document.getElementById("body").style.backgroundImage = "none";
    }else{
        hangmanSource = "_90";
        type = ".png";
        let a = Math.floor(Math.random() * 14);
        document.getElementById("body").style.backgroundImage = "url('assets/bg_" + a + type +"')";
    }

    // This is so the hangman picture gets updated alongside the css file
    document.getElementById("hangmanCharacter").src="assets/Strike_" + strikeCount +  hangmanSource + type;
}


// This function reveals a letter for the player when they are stuck
function showHint(){
    let underscoreCounter = 0;

    // This makes it so it shows that a hint was used, thus can't be used again
    hintUse = true;

    // This counts how many underscores, or hidden letters, there are left
    for (let x = 0; x < hiddenWord.length; x++){
        if (hiddenWord.charAt(x) == "_"){
            underscoreCounter++;
        }
    }

    // This gets a random number with as zero the lowest bound and the amount of hidden letters left as the highest
    let letterPosition = Math.floor(Math.random() * underscoreCounter + 1);

    let letterRevealer = 0;

    //This goes through each letter in the hidden word
    for (let y = 0; y < hiddenWord.length; y++){
        // It checks if character at Y is an underscore
        if (hiddenWord.charAt(y) == "_"){
            // if it is, add 1 to the letterRevealer variable
            letterRevealer++;

            // Once letterRevealer and letterPosition are the same, essentially when it finally reaches random hidden letter position then reveal it
            if (letterRevealer == letterPosition){

                // Checks if it is single player mode so it can input and remove the appropriate button
                if (singlePlayer == true){
                    guessCheck(theWord.charAt(y), theWord.charAt(y)+'btn1');
                }else{
                    guessCheck(theWord.charAt(y), theWord.charAt(y)+'btn2');
                }
            }
        }
    }
}

// This function restarts the game over again
function restart(){

    // Reset all the variables to their intitial state
    characterCount = 0;
    theWord = "";
    strikeCount = 0;
    hiddenWord = "";
    theTopic = "";
    hintUse = false;
    initializeGame = false;

    // If single player, reset the game for single player mode
    if (singlePlayer == true){
        document.getElementById("finalMessage").style.display="none";
        document.getElementById('gameHelp').style.display = "none";
        document.getElementById("hangmanCharacter").src="assets/Strike_" + strikeCount +  hangmanSource + type;
        resetLetters(true);
        gameOneStart();
    }
    // Else reset the game for two Player mode
    else{
        document.getElementById("finalMessage").style.display="none";
        document.getElementById("gameDisplay").style.display = "none";
        document.getElementById("boxForInput").style.display = "flex";
        document.getElementById("instructions").innerHTML = "Set the Word";
        document.getElementById("instructions").style.display = "flex";
        document.getElementById("twoPlayer").style.display = "flex";
        document.getElementById('gameHelp').style.display = "none";
        document.getElementById("hangmanCharacter").src="assets/Strike_" + strikeCount +  hangmanSource + type;
        del(false);
        resetLetters(false);
        document.getElementById("guessingKeyboardTwoPlayer").style.display = "none";
        document.getElementById("settingKeyboard").style.display = "flex";
    }
}


// This function resets the letters clicked so they can be used again
function resetLetters(singlePlayerGame){
    if (singlePlayerGame == true){
        document.getElementById("Qbtn1").style.display="flex";
        document.getElementById("Wbtn1").style.display="flex";
        document.getElementById("Ebtn1").style.display="flex";
        document.getElementById("Rbtn1").style.display="flex";
        document.getElementById("Tbtn1").style.display="flex";
        document.getElementById("Ybtn1").style.display="flex";
        document.getElementById("Ubtn1").style.display="flex";
        document.getElementById("Ibtn1").style.display="flex";
        document.getElementById("Obtn1").style.display="flex";
        document.getElementById("Pbtn1").style.display="flex";
        document.getElementById("Abtn1").style.display="flex";
        document.getElementById("Sbtn1").style.display="flex";
        document.getElementById("Dbtn1").style.display="flex";
        document.getElementById("Fbtn1").style.display="flex";
        document.getElementById("Gbtn1").style.display="flex";
        document.getElementById("Hbtn1").style.display="flex";
        document.getElementById("Jbtn1").style.display="flex";
        document.getElementById("Kbtn1").style.display="flex";
        document.getElementById("Lbtn1").style.display="flex";
        document.getElementById("Zbtn1").style.display="flex";
        document.getElementById("Xbtn1").style.display="flex";
        document.getElementById("Cbtn1").style.display="flex";
        document.getElementById("Vbtn1").style.display="flex";
        document.getElementById("Bbtn1").style.display="flex";
        document.getElementById("Nbtn1").style.display="flex";
        document.getElementById("Mbtn1").style.display="flex";
    }else{
        document.getElementById("Qbtn2").style.display="flex";
        document.getElementById("Wbtn2").style.display="flex";
        document.getElementById("Ebtn2").style.display="flex";
        document.getElementById("Rbtn2").style.display="flex";
        document.getElementById("Tbtn2").style.display="flex";
        document.getElementById("Ybtn2").style.display="flex";
        document.getElementById("Ubtn2").style.display="flex";
        document.getElementById("Ibtn2").style.display="flex";
        document.getElementById("Obtn2").style.display="flex";
        document.getElementById("Pbtn2").style.display="flex";
        document.getElementById("Abtn2").style.display="flex";
        document.getElementById("Sbtn2").style.display="flex";
        document.getElementById("Dbtn2").style.display="flex";
        document.getElementById("Fbtn2").style.display="flex";
        document.getElementById("Gbtn2").style.display="flex";
        document.getElementById("Hbtn2").style.display="flex";
        document.getElementById("Jbtn2").style.display="flex";
        document.getElementById("Kbtn2").style.display="flex";
        document.getElementById("Lbtn2").style.display="flex";
        document.getElementById("Zbtn2").style.display="flex";
        document.getElementById("Xbtn2").style.display="flex";
        document.getElementById("Cbtn2").style.display="flex";
        document.getElementById("Vbtn2").style.display="flex";
        document.getElementById("Bbtn2").style.display="flex";
        document.getElementById("Nbtn2").style.display="flex";
        document.getElementById("Mbtn2").style.display="flex";
    }
}

function hintCheck(remainingLetters){

    // This checks how many remaining letters are left
    let remainingLettersCounter = 0;

    // This adds 1 to remainingLettersCounter for the size of the set containing the different letters left in hiddenWord
    for (let z = 0; z < remainingLetters.size; z++){
        remainingLettersCounter++;
    }

    // Check if the appropriate conditions are met to display a hint
    if (strikeCount < 3 || remainingLettersCounter <= 2 || hintUse == true){
        document.getElementById('gameHelp').style.display = "none";
        document.getElementById('gameHelp2').style.display = "none";
    }else{
        document.getElementById('gameHelp').style.display = "flex";
        document.getElementById('gameHelp2').style.display = "flex";
    }

}