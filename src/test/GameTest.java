package test;

import game.Game;
import model.Move;
import player.Player;
import rules.GameRules;

/**
 * Self-contained tests for Game score tracking over 20 rounds.
 *
 * Notes:
 * - Game prints a lot to stdout; that's expected.
 *
 * Run:
 *   javac -d out $(find src -name "*.java")
 *   java -cp out test.GameTest
 */
public class GameTest {

    // Player that always returns the same move
    private static class FixedMovePlayer extends Player {
        private final Move move;

        FixedMovePlayer(Move move) {
            this.move = move;
        }

        @Override
        public Move getMove() {
            return move;
        }
    }

    // Rules stub that always returns a fixed winner
    private static class FixedWinnerRules extends GameRules {
        private final Player winner; // null means draw

        FixedWinnerRules(Player winner) {
            this.winner = winner;
        }

        @Override
        public Player determineWinner(Player p1, Move move1, Player p2, Move move2) {
            return winner;
        }
    }

    private static void assertEqualsInt(int expected, int actual, String message) {
        if (expected != actual) {
            throw new AssertionError(message + " | expected: " + expected + " but was: " + actual);
        }
    }

    private static void testAllDraws() {
        Player human = new FixedMovePlayer(Move.ROCK);
        Player computer = new FixedMovePlayer(Move.ROCK);
        GameRules rules = new FixedWinnerRules(null); // always draw

        Game game = new Game(human, computer, rules);
        game.startGame();

        assertEqualsInt(0, game.getHumanScore(), "All-draws: humanScore");
        assertEqualsInt(0, game.getComputerScore(), "All-draws: computerScore");
        assertEqualsInt(20, game.getDrawCount(), "All-draws: drawCount");
    }

    private static void testAllHumanWins() {
        Player human = new FixedMovePlayer(Move.ROCK);
        Player computer = new FixedMovePlayer(Move.SCISSORS);
        GameRules rules = new FixedWinnerRules(human); // human always wins

        Game game = new Game(human, computer, rules);
        game.startGame();

        assertEqualsInt(20, game.getHumanScore(), "All-human-wins: humanScore");
        assertEqualsInt(0, game.getComputerScore(), "All-human-wins: computerScore");
        assertEqualsInt(0, game.getDrawCount(), "All-human-wins: drawCount");
    }

    private static void testAllComputerWins() {
        Player human = new FixedMovePlayer(Move.SCISSORS);
        Player computer = new FixedMovePlayer(Move.ROCK);
        GameRules rules = new FixedWinnerRules(computer); // computer always wins

        Game game = new Game(human, computer, rules);
        game.startGame();

        assertEqualsInt(0, game.getHumanScore(), "All-computer-wins: humanScore");
        assertEqualsInt(20, game.getComputerScore(), "All-computer-wins: computerScore");
        assertEqualsInt(0, game.getDrawCount(), "All-computer-wins: drawCount");
    }

    public static void main(String[] args) {
        testAllDraws();
        testAllHumanWins();
        testAllComputerWins();
        System.out.println("GameTest: PASS");
    }
}

