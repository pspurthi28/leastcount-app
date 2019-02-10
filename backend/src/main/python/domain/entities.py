from dataclasses import dataclass, field
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
    roundID: str = field(repr=False, default="0")
    rWinner: Player = field(repr=False, default=None)
    showcount: int = field(repr=False, default=0)
    scores: [RoundScore] = field(default_factory=list)


@dataclass_json
@dataclass
class Game:
    gameID: str = field(repr=False, default="NO_ID")
    winner: Player = field(repr=False, default=None)
    wintotal: int = field(repr=False, default=-1)
    status: str = field(repr=False, default="running")
    threshold: int = field(default=300, repr=False)
    rounds: [Round] = field(default_factory=list)
    players: [Player] = field(default_factory=list)


