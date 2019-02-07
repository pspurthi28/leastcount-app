from dataclasses import dataclass
from dataclasses_json import dataclass_json


@dataclass_json
@dataclass
class Player:
    playerID: str
    firstname: str
    lastname: str


@dataclass_json
@dataclass
class RoundScore:
    player: Player
    score: int


@dataclass_json
@dataclass
class Round:
    roundID: str
    rWinner: Player
    showcount: int
    scores: [RoundScore]


@dataclass_json
@dataclass
class Game:
    gameID: str
    winner: Player
    rounds: [Round]
    wintotal: int
    status: str
    players: [Player]
    threshold: int
