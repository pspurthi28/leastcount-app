import src.main.python.domain.entities as entities
import json
from src.main.python.datastore import connectionFactory as cF


class Queries:
    db: object

    def __init__(self):
        self.db = cF.ConnectionFactory.getDatabase()

    def get_game_by_game_id(self, game_id):
        game = self.db.child("games").child(game_id).get().val()
        if game is not None:
            return entities.Game.schema().load(game)
        else:
            return None

    def save_game(self, game: entities.Game):
        data_saved = self.db.child("games").push(json.loads(game.to_json()))
        return data_saved["name"]

