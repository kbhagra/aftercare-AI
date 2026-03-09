package player;
import java.util.Scanner;
import model.Move;

public class HumanPlayer extends Player {//subclass of Player
    private final Scanner scanner; //scanner for user input

    public HumanPlayer(){ //constructor to initialize the scanner
        scanner = new Scanner(System.in);
    }

    @Override
    public Move getMove(){ //get move from human player by prompting user input
        while(true) {
            System.out.print("Choose(1=ROCK, 2=PAPER, 3=SCISSORS): ");
            String input = scanner.nextLine().trim();

            switch(input){ //switch statement to determine the move based on user input
                case "1" -> {
                    return Move.ROCK;
                }
                case "2" -> {
                    return Move.PAPER;
                }
                case "3" -> {
                    return Move.SCISSORS;
                }
                default -> System.out.println("Invalid input. Please enter 1, 2, or 3.");
            }
        }
    }
}