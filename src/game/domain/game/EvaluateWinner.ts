import { PlayerChoiceNotMadeException } from '../exceptions/PlayerChoiceNotMadeException';

import { Player, GameChoice } from '../player/Player';

export class EvaluateWinner {
  static execute(player1: Player, player2: Player): Player | null {
    if (!player1.doesMadeChoice() || !player2.doesMadeChoice()) {
      throw new PlayerChoiceNotMadeException();
    }

    const hostChoice = player1.getChoice();
    const opponentChoice = player2.getChoice();

    if (hostChoice === opponentChoice) {
      return null;
    }

    if (hostChoice == GameChoice.Rock) {
      if (opponentChoice == GameChoice.Paper) {
        return player2;
      }
      return player1;
    }

    if (hostChoice == GameChoice.Scissors) {
      if (opponentChoice == GameChoice.Rock) {
        return player2;
      }
      return player1;
    }

    if (opponentChoice == GameChoice.Scissors) {
      return player2;
    }
    return player1;
  }
}
