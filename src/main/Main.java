package main;
import game.Game;
import player.ComputerPlayer;
import player.HumanPlayer;
import rules.StandardRules;
import strategy.RandomStrategy;

public class Main {
    public static void main(String[] args) {
        HumanPlayer human = new HumanPlayer(); //human object created
        ComputerPlayer computer = new ComputerPlayer(new RandomStrategy()); //computer object created with random strategy (can be created with other strategies) 
        StandardRules rules = new StandardRules(); //standard rules object created
        Game game = new Game(human, computer, rules); //game object created with human, computer and rules

        game.startGame(); //startGame method called to start the game
    }
}
