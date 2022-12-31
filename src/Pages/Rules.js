import GitHubIcon from '@mui/icons-material/GitHub';

function greetings() {
  if (new Date().getHours() < 12) { return 'morning'; }
  else if (new Date().getHours() < 18) { return 'afternoon'; }
  else { return 'evening'; };
};

function AboutUs() {
  return (
    <div>
      <h1>Good {greetings()}!</h1>
      <h3>Welcome to our site's open Beta! (Version 1.1.1)</h3>
      <h3>The rules of Shut The Box are simple:</h3>
      <ul>
        <li>Shut the box is a dice game that can be played by one or more players.</li>
        <li>The game is played using a box with nine numbered tiles, each with a number from 1 to 9. The tiles are initially all uncovered.</li>
        <li>Each player starts their turn by rolling two dice and adding the numbers together. The player must then try to cover any of the tiles that add up to the total rolled. For example, if a player rolls a 4 and a 3, they can cover either the 7 tile or the tiles with the numbers 4 and 3.</li>
        <li>If a player is unable to cover any of the remaining tiles, their turn ends and their score is the sum of the tiles that are left uncovered. If a player is able to cover all of the tiles, they score a "shut" and their score is 0 for that round.</li>
        <li>If a player rolls a number that cannot be covered using the remaining tiles, they must forfeit their turn and their score is the sum of the tiles that are left uncovered.</li>
        <li>Players can also choose to cover multiple tiles in a single turn, as long as the total of the covered tiles adds up to the total rolled on the dice. For example, a player who rolls a 6 could cover the tiles with the numbers 1 and 5, or the tiles with the numbers 2 and 4.</li>
        <li>The game continues until all players have had a turn. The player with the lowest score wins the game.</li>
        <li>If multiple players tie for the lowest score, the tie can be broken by playing additional rounds until a winner is determined.</li>
      </ul>
      <p>This is a website made by: <a href="https://github.com/MadeOfBees">MadeOfBees </a><GitHubIcon /></p>
      <p>Check out the source code on <a href="https://github.com/MadeOfBees/JShutTheBox">GitHub</a></p>
      <p>Idea for the JavaScript port by Steve Nichols, thank you for teaching me the game!</p>
    </div>
  );
}

export default AboutUs;