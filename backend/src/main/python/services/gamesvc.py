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
        game = entities.Game(players=[], rounds=[])
        gameId = self.queryHandler.save_game(game)
        game_class = self.queryHandler.get_game_by_game_id(gameId)
        game_class.gameID = gameId
        self.queryHandler.update_game(game_class, gameId)
        return {"gameId": gameId}

    def create_round(self, gameId):
        game = self.queryHandler.get_game_by_game_id(gameId)
        rID = str(len(game.rounds)+1)
        round = entities.Round(scores=[], roundID=rID)
        game.rounds.append(round)
        return self.queryHandler.update_game(game=game, game_id=gameId)

    def player_score(self, rnd_scr_req):
        game_class = self.queryHandler.get_game_by_game_id(rnd_scr_req['gameId'])
        currentplyr = None
        plyrs = game_class.players
        print(plyrs)
        for p in plyrs:
            if p["playerID"] == rnd_scr_req['playerId']:
                currentplyr = p
        rs = entities.RoundScore(player=currentplyr, score=rnd_scr_req['score'])
        currentrnd = None
        rnds = game_class.rounds
        for r in rnds:
            if r["isCompleted"] == False:
                currentrnd = r
        if "scores" not in currentrnd.keys():
            currentrnd['scores'] = []
        currentrnd['scores'].append(rs)
        self.queryHandler.update_game(game_class, rnd_scr_req['gameId'])
        return self.queryHandler.get_game_by_game_id(rnd_scr_req['gameId'])

    def end_round(self, gameid):
        game_class = self.queryHandler.get_game_by_game_id(gameid)
        currentrnd = None
        rnds = game_class.rounds
        for r in rnds:
            if r["isCompleted"] == False:
                currentrnd = r
        roundscores = currentrnd["scores"]
        playerscore = {}
        scores = []
        for s in roundscores:
            playerscore[s['player']["playerID"]] = s["score"]
            scores.append(s["score"])
        winnerID = min(playerscore, key=lambda k: playerscore[k])
        showcount = min(scores)
        plyrs = game_class.players
        winner = None
        for p in plyrs:
            if p["playerID"] == winnerID:
                winner = p
        currentrnd["isCompleted"] = True
        currentrnd["rWinner"] = winner
        currentrnd["showcount"] = showcount
        self.queryHandler.update_game(game_class, gameid)
        return self.queryHandler.get_game_by_game_id(gameid)

    def game_totals(self,gameid):
        game_class = self.queryHandler.get_game_by_game_id(gameid)
        playertotals = []
        players = game_class.players
        rounds = game_class.rounds
        for p in players:
            total = 0
            for r in rounds:
                roundscores = r['scores']
                for rs in roundscores:
                    if rs["player"]["playerID"] == p["playerID"]:
                        total += rs["score"]
            playertotals.append({"player": p, "total": total})
        return playertotals


    def end_game(self,gameid):
        game_class = self.queryHandler.get_game_by_game_id(gameid)
        playtots = self.game_totals(gameid)
        playerscore = {}
        scores = []
        for t in playtots:
            playerscore[t['player']["playerID"]] = t["total"]
            scores.append(t["total"])
        gwinnerID = min(playerscore, key=lambda k: playerscore[k])
        wintotal = min(scores)
        gwinner = None
        for p in game_class.players:
            if p["playerID"] == gwinnerID:
                gwinner = p
        game_class.status = 'completed'
        game_class.winner = gwinner
        game_class.wintotal = wintotal
        self.queryHandler.update_game(game_class, gameid)
        return self.queryHandler.get_game_by_game_id(gameid)
