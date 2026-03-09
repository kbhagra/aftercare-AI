package rules;
import model.Move;
import player.Player;

public abstract class GameRules {//abstract class for game rules
    public abstract Player determineWinner(Player p1, Move move1, Player p2, Move move2); //abstract method
}
