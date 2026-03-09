package game;
import model.Move;
import player.Player;
import rules.GameRules;

public class Game {
    private final Player human; //human player object created
    private final Player computer; //computer player object created
    private final GameRules rules; //game rules object created

    private int humanScore = 0; //human score initialized to 0
    private int computerScore = 0; //computer score initialized to 0
    private int drawCount = 0; //draw count initialized to 0
    private static final int TOTAL_ROUNDS = 20; //total rounds set to 20

    public Game(Player human, Player computer, GameRules rules) { //constructor 
        this.human = human;
        this.computer = computer;
        this.rules = rules;
    }

    public void startGame() { //start the game
        System.out.println("Welcome to Rock-Paper-Scissors!");
        for (int round = 1; round <= TOTAL_ROUNDS; round++) { //loop to play the specified number of rounds
            System.out.println("\nRound " + round);
            playRound(); //call playRound method to play a single round of the game
        }
        displayScore(); //call displayScore method to show the final score after all rounds are completed
    }

    private void playRound() { //play a single round of the game
        Move humanMove = human.getMove(); //get move from human player
        Move computerMove = computer.getMove(); //get move from computer player

        System.out.println("You chose: " + humanMove);
        System.out.println("Computer chose: " + computerMove);

        Player winner = rules.determineWinner(human, humanMove, computer, computerMove); //determine the winner of the round using the game rules

        if (winner == null) { //if there is a draw
            System.out.println("Draw!");
            drawCount++;
        } else if (winner == human) { //if human wins
            System.out.println("You win!");
            humanScore++;
        } else { //if computer wins
            System.out.println("Computer wins!");
            computerScore++;
        }
        System.out.println("Score: Human: " + humanScore + " | Computer: " + computerScore + " | Draws: " + drawCount);
    }
    
    private void displayScore() { //display final score after all rounds are completed
        System.out.println("\nFinal Score:");
        System.out.println("Human: " + humanScore);
        System.out.println("Computer: " + computerScore);
        System.out.println("Draws: " + drawCount);
    }
}
