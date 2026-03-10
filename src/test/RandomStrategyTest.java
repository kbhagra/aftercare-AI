package test;

import model.Move;
import strategy.RandomStrategy;

/**
 * Self-contained sanity tests for RandomStrategy.
 *
 * Run:
 *   javac -d out $(find src -name "*.java")
 *   java -cp out test.RandomStrategyTest
 */
public class RandomStrategyTest {

    private static void assertTrue(boolean condition, String message) {
        if (!condition) {
            throw new AssertionError(message);
        }
    }

    private static void testOnlyValidMoves() {
        RandomStrategy strategy = new RandomStrategy();
        for (int i = 0; i < 1000; i++) {
            Move move = strategy.chooseMove();
            assertTrue(move != null, "chooseMove() should never return null");
            assertTrue(
                move == Move.ROCK || move == Move.PAPER || move == Move.SCISSORS,
                "chooseMove() must return ROCK, PAPER, or SCISSORS (got: " + move + ")"
            );
        }
    }

    private static void testEventuallyProducesAllMoves() {
        RandomStrategy strategy = new RandomStrategy();
        boolean seenRock = false;
        boolean seenPaper = false;
        boolean seenScissors = false;

        // Very low probability of missing a move over 10,000 trials.
        for (int i = 0; i < 10_000 && !(seenRock && seenPaper && seenScissors); i++) {
            Move move = strategy.chooseMove();
            if (move == Move.ROCK) {
                seenRock = true;
            } else if (move == Move.PAPER) {
                seenPaper = true;
            } else if (move == Move.SCISSORS) {
                seenScissors = true;
            }
        }

        assertTrue(seenRock, "Expected to see ROCK at least once");
        assertTrue(seenPaper, "Expected to see PAPER at least once");
        assertTrue(seenScissors, "Expected to see SCISSORS at least once");
    }

    public static void main(String[] args) {
        testOnlyValidMoves();
        testEventuallyProducesAllMoves();
        System.out.println("RandomStrategyTest: PASS");
    }
}

