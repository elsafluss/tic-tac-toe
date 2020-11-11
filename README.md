# colorful tic-tac-toe
Elsa's Tic-Tac-Toe game: mod 1 final project

[Here is the spec for this project.](https://frontend.turing.io/projects/module-1/tic-tac-toe-solo.html)

I built this game during the last week of mod 1 at Turing, using everything I'd learned in the past five weeks. Now I can play tic-tac-toe whenever I want, and you can too.

Before you play tic-tac-toe, you should probably know the rules of the game. If you don't, [here's the Wikipedia page](https://en.wikipedia.org/wiki/Tic-tac-toe), where you can learn more than you ever wanted to. Other than that, there are no prerequisites for playing - everything will happen in your browser. Chrome is, of course, recommended.

## How to play
To play a game, click in any square. Your token will show up in that square. Then let your opponent click in a different square, and their token will appear. When the game is over, the board will reset after a short pause. You can then start your next game by clicking to place your token in any square. Win counts will persist even if you refresh the page.

![dino vs squid game](https://media.giphy.com/media/hJcQ5sZqZQ5jzzSQm4/giphy.gif)

## Custom tokens?!
If you want to customize your tokens, you can do so easily with a find/replace in index.html and styles.css. More information on how to do this is at the bottom of index.html.

## The tools
I wrote the logic for this game in JavaScript, built the structure in HTML, and made it pretty with CSS. Atom is my code editor, and Spotify for Desktop plays my jams.

## The architecture
There are four JS files:
* main.js holds querySelectors and two event listeners, sets the major variables, and instantiates the classes.
* game.js holds the Game class, which has methods for determining if a win or draw has occured, and for resetting the game.
* turn.js holds the Turn class, which has a helper method that runs for each turn.
* player.js holds the Player class, which saves and gets the player win counts from storage.

## The hard stuff
The most difficult logic I had to work through was for determining win conditions. I went through 5 or 6 iterations, plus more on paper, before settling on "put the game board into an array of arrays on each turn, then check if the values of those sub-arrays all match each other". Once I had built the whole game, I decided to add the Turn class, which meant I had to move functions around and make sure the right variables were being passed correctly.

## And also the good stuff
The feeling when this:
```javascript
function resetBoard() {
  document.querySelector("#a").disabled = false
  document.querySelector("#b").disabled = false
  document.querySelector("#c").disabled = false
  document.querySelector("#d").disabled = false
  document.querySelector("#e").disabled = false
  document.querySelector("#f").disabled = false
  document.querySelector("#g").disabled = false
  document.querySelector("#h").disabled = false
  document.querySelector("#i").disabled = false
}
```
Became this:
```javascript
function toggleButtons(onOrOff) {
  // true === off, false === on
  var buttonLetters = ["#a", "#b", "#c", "#d", "#e", "#f", "#g", "#h", "#i"]
  for (var i = 0; i < buttonLetters.length; i++) {
    document.querySelector(`${buttonLetters[i]}`).disabled = onOrOff
  }
}
```
The more I worked with the functions I'd written, the clearer it became when I could shorten them. Also, most of my testing was done with octopus vs squid, and it's a combination that I highly recommend.

## A pat on the back
I wrote all this code, y'all. Special thanks to my mentor and teachers. I listened to a lot of [Eagles of Death Metal](https://en.wikipedia.org/wiki/Eagles_of_Death_Metal) during this project. That's another wiki link. Check them out.

## Legal stuff
The icons are all from [OpenMoji.org](https://openmoji.org/)
