import time
from datastore import queries
from domain import entities


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
        rID = str(len(game.rounds) + 1)
        round = entities.Round(scores=[], roundID=rID)
        game.rounds.append(round)
        self.queryHandler.update_game(game=game, game_id=gameId)
        return self.queryHandler.get_game_by_game_id(gameId)

    def player_score(self, rnd_scr_req):
        game_class = self.queryHandler.get_game_by_game_id(rnd_scr_req['gameId'])
        currentplyr = None
        playcount = self.player_count(rnd_scr_req['gameId'], game_class.threshold)
        print("player count: ", playcount)
        plyrs = game_class.players
        print(plyrs)
        for p in plyrs:
            if p["playerID"] == rnd_scr_req['playerId']:
                currentplyr = p
        rs = {"player": currentplyr, "score": rnd_scr_req['score']}
        currentrnd = None
        rnds = game_class.rounds
        for r in rnds:
            if r["isCompleted"] == False:
                currentrnd = r
        if "scores" not in currentrnd.keys():
            currentrnd['scores'] = []

# this section avoids duplicate score submissions
        existing_roundscore = None
        if len(currentrnd['scores']) > 0:
            for iterable_score in currentrnd['scores']:
                iterable_player = iterable_score['player']
                if iterable_player['playerID'] == rnd_scr_req['playerId']:
                    existing_roundscore = iterable_score
                    break
        if existing_roundscore:
            existing_roundscore['score'] = rnd_scr_req['score']
        else:
            currentrnd['scores'].append(rs)
        scrcnt = len(currentrnd['scores'])
        if playcount == scrcnt:
            game_class = self.prep_end_round(game_class)
            rID = str(len(game_class.rounds) + 1)
            round = entities.Round(scores=[], roundID=rID)
            game_class.rounds.append(round)
        self.queryHandler.update_game(game_class, rnd_scr_req['gameId'])
        return self.queryHandler.get_game_by_game_id(rnd_scr_req['gameId'])

    def end_round(self, gameid):
        game_class = self.queryHandler.get_game_by_game_id(gameid)
        game_class = self.prep_end_round(game_class)
        self.queryHandler.update_game(game_class, gameid)
        return self.queryHandler.get_game_by_game_id(gameid)

    def game_totals(self, gameid):
        game_class = self.queryHandler.get_game_by_game_id(gameid)
        playertotals = []
        players = game_class.players
        rounds = game_class.rounds
        for p in players:
            total = 0
            for r in rounds:
                if "scores" in r.keys() and r["isCompleted"] is True:
                    roundscores = r['scores']
                    for rs in roundscores:
                        if rs["player"]["playerID"] == p["playerID"]:
                            total += rs["score"]
            playertotals.append({"player": p, "total": total})
        return playertotals

    def end_game(self, gameid):
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

    def player_count(self, gameid, threshold):
        playtots = self.game_totals(gameid)
        playcount = 0
        for t in playtots:
            if t["total"] < threshold:
                playcount = playcount + 1
        return playcount

    def prep_end_round(self, game_class):
        currentrnd = None
        rnds = game_class.rounds
        for r in rnds:
            if r["isCompleted"] == False:
                currentrnd = r
        if "scores" not in r.keys():
            return game_class
        roundscores = currentrnd["scores"]
        print(roundscores)
        playerscore = {}
        scores = []
        for s in roundscores:
            player = s['player']
            playerscore[player["playerID"]] = s["score"]
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
        return game_class
