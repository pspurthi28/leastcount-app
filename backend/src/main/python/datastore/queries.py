import domain.entities as entities
import json
from datastore import connectionFactory as cF


class Queries:
    db: object

    def __init__(self):
        self.db = cF.ConnectionFactory.getDatabase()

    def get_game_by_game_id(self, game_id):
        game = self.db.child("games").child(game_id).get().val()
        if game is not None:
            if "players" not in game.keys():
                game['players'] = []
            if "rounds" not in game.keys():
                game['rounds'] = []
            return entities.Game.schema().load(game)
        return None

    def save_game(self, game: entities.Game):
        data_saved = self.db.child("games").push(json.loads(game.to_json()))
        return data_saved["name"]

    def update_game(self, game, game_id):
        data_updated = self.db.child("games").child(game_id).update(json.loads(game.to_json()))
        print(data_updated)
        return data_updated
