from domain import entities as lcc
from src.main.python import configfile
from src.main.python.datastore import connectionFactory as cF, queries


def initialize_application():
    print("Starting application bootup")
    cF.ConnectionFactory.initialize_db(configfile.config())
    #connection feedback
    db = cF.ConnectionFactory.getDatabase()
    #print(db.child("games").child("-LY0JNbQc9uAv5hQ2Nl3").get().val())
    print("Connected to DB: ", db.database_url)
    return db


def create_game():
    player1 = lcc.Player(playerID='P001', firstname="Spu", lastname='Pai')
    player2 = lcc.Player(playerID='P002', firstname="Suchi", lastname="k")
    game1 = lcc.Game(gameID='G001', wintotal=10, winner=None, rounds=[], status='running', players=[], threshold=20)
    score1 = lcc.RoundScore(player=player1, score=10)
    score2 = lcc.RoundScore(player2, 3)
    score3 = lcc.RoundScore(player1, 9)
    score4 = lcc.RoundScore(player2, 20)
    round1 = lcc.Round(roundID='R001', rWinner=player2, scores=[score1, score2], showcount=3)
    round2 = lcc.Round(roundID='R002', rWinner=player1, scores=[score3, score4], showcount=9)

    game1.players.append(player1)
    game1.players.append(player2)
    game1.rounds.append(round1)
    game1.rounds.append(round2)
    game1.winner = player1
    game1.status = "completed"
    return game1


if __name__ == '__main__':
    import sys
    import os
    cwd = os.getcwd()
    print(cwd)
    domain_dir = os.path.join(cwd, r'domain')
    print(domain_dir)
    sys.path.append(cwd)
    sys.path.append(domain_dir)
    db = initialize_application()
    game = create_game()
    quers = queries.Queries()
    print(quers.save_game(game))

