package player;
import model.Move;
import strategy.MoveStrategy;

public class ComputerPlayer extends Player {//subclass of Player
    private final MoveStrategy strategy; //strategy for computer player to choose moves

    public ComputerPlayer(MoveStrategy strategy) { //constructor
        this.strategy = strategy;
    }

    @Override
    public Move getMove() { //get move from computer player using the strategy
        return strategy.chooseMove();
    }
}
