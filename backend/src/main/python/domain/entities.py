from dataclasses import dataclass, field
from dataclasses_json import dataclass_json


@dataclass_json
@dataclass
class Player:
    playerID: str
    firstname: str
    lastname: str

    @staticmethod
    def get_default_winner():
        return Player(playerID='BLAH', firstname='BLAH', lastname='BLAH')


@dataclass_json
@dataclass
class RoundScore:
    player: Player
    score: int
    isshow: bool = False


@dataclass_json
@dataclass
class Round:
    scores: [RoundScore] = field(repr=False)
    rWinner: Player = field(repr=False, default_factory=Player.get_default_winner)
    roundID: str = field(repr=False, default="0")
    showcount: int = field(repr=False, default=0)
    isCompleted: bool = False


@dataclass_json
@dataclass
class Game:
    players: [Player] = field(repr=False)
    rounds: [Round] = field(repr=False)
    winner: Player = field(repr=False, default_factory=Player.get_default_winner)
    gameID: str = field(repr=False, default="NO_ID")
    wintotal: int = field(repr=False, default=-1)
    status: str = field(repr=False, default="running")
    threshold: int = field(default=300, repr=False)
