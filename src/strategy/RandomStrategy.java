package strategy;
import java.util.Random;
import model.Move;

public class RandomStrategy implements MoveStrategy {
    private final Random random = new Random(); //random number generator object created

    @Override
    public Move chooseMove() {
        int pick = random.nextInt(3); //randomly pick a number between 0 and 2 to determine the move

        return switch (pick) {
            case 0 -> Move.ROCK;
            case 1 -> Move.PAPER;
            default -> Move.SCISSORS;
        };
    }
}
