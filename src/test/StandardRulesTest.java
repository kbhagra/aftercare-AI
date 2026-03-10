package test;

import model.Move;
import player.Player;
import rules.StandardRules;

/**
 * Self-contained tests for Standard RPS rules.
 *
 * Run:
 *   javac -d out $(find src -name "*.java")
 *   java -cp out test.StandardRulesTest
 */
public class StandardRulesTest {

    private static class DummyPlayer extends Player {
        @Override
        public Move getMove() {
            return Move.ROCK; // not used directly in these tests
        }
    }

    private static void assertNull(Object actual, String message) {
        if (actual != null) {
            throw new AssertionError(message + " | expected null but was: " + actual);
        }
    }

    private static void assertSame(Object expected, Object actual, String message) {
        if (expected != actual) {
            throw new AssertionError(message + " | expected same instance: " + expected + " but was: " + actual);
        }
    }

    public static void main(String[] args) {
        StandardRules rules = new StandardRules();
        Player human = new DummyPlayer();
        Player computer = new DummyPlayer();

        // Draws
        assertNull(rules.determineWinner(human, Move.ROCK, computer, Move.ROCK), "ROCK vs ROCK should be a draw");
        assertNull(rules.determineWinner(human, Move.PAPER, computer, Move.PAPER), "PAPER vs PAPER should be a draw");
        assertNull(rules.determineWinner(human, Move.SCISSORS, computer, Move.SCISSORS), "SCISSORS vs SCISSORS should be a draw");

        // Human wins
        assertSame(human, rules.determineWinner(human, Move.ROCK, computer, Move.SCISSORS), "ROCK beats SCISSORS");
        assertSame(human, rules.determineWinner(human, Move.PAPER, computer, Move.ROCK), "PAPER beats ROCK");
        assertSame(human, rules.determineWinner(human, Move.SCISSORS, computer, Move.PAPER), "SCISSORS beats PAPER");

        // Computer wins
        assertSame(computer, rules.determineWinner(human, Move.ROCK, computer, Move.PAPER), "PAPER beats ROCK");
        assertSame(computer, rules.determineWinner(human, Move.PAPER, computer, Move.SCISSORS), "SCISSORS beats PAPER");
        assertSame(computer, rules.determineWinner(human, Move.SCISSORS, computer, Move.ROCK), "ROCK beats SCISSORS");

        System.out.println("StandardRulesTest: PASS");
    }
}

