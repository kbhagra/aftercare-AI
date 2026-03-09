package rules;
import model.Move;
import player.Player;
public class StandardRules extends GameRules { //subclass of GameRules that implements the standard rules of RPS
@Override
    public Player determineWinner(Player p1, Move move1, Player p2, Move move2) {
        if (move1 == move2) return null; // draw
        switch (move1) { //determine winner based on the moves of both players
            case ROCK -> {
                return (move2 == Move.SCISSORS) ? p1 : p2;
            }
            case PAPER -> {
                return (move2 == Move.ROCK) ? p1 : p2;
            }
            case SCISSORS -> {
                return (move2 == Move.PAPER) ? p1 : p2;
            }
        }
        return null; //should never happen
    }
}
