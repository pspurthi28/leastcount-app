import time
from src.main.python.datastore import queries
from src.main.python.domain import entities


class GameService:

    def __init__(self):
        self.queryHandler = queries.Queries()

    def join_game(self, game_join_req):
        game = self.queryHandler.get_game_by_game_id(game_join_req['gameId'])
        ts = time.time()
        name = game_join_req['name']
        generated_player_id = name + str(ts)
        player = entities.Player(playerID=generated_player_id, firstname=name, lastname=name)
        game.players.append(player)
        self.queryHandler.update_game(game, game_join_req['gameId'])
        return {"gameId": game_join_req['gameId'], "playerId": generated_player_id}

    def create_game(self):
        game = entities.Game()
        gameId = self.queryHandler.save_game(game)
        return {"gameId": gameId}

    def create_round(self):
        return ''
