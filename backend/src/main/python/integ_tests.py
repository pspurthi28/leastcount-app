import run
import domain.entities as ent
import datastore.queries as qs


def initialize_app():
    run.initialize_application()


def create_player(identifier):
    return ent.Player(lastname=identifier, firstname=identifier, playerID=identifier)


def create_score(player, score):
    return ent.RoundScore(player=player, score=score)


def create_game():
    suchi = create_player("SK")
    spu = create_player("SP")
    ajay = create_player("AJ")
    sutti = create_player("SM")
    nik = create_player("NR")
    pru = create_player("RS")
    dad = create_player("SV")
    akka = create_player("SG")
    dj = create_player("PG")
    sha = create_player("AR")
    players = [suchi, spu, sutti, ajay, nik, pru, dad, akka, dj, sha]
    first_round = ent.Round(roundID="1", rWinner=suchi, showcount=5, scores=[
        create_score(suchi, 5),
        create_score(spu, 8),
        create_score(ajay, 15),
        create_score(sutti, 7),
        create_score(nik, 23),
        create_score(pru, 14),
        create_score(dad, 30),
        create_score(akka, 37),
        create_score(dj, 20),
        create_score(sha, 10)
    ])
    second_round = ent.Round(roundID="2", rWinner=ajay, showcount=13, scores=[
        create_score(suchi, 14),
        create_score(spu, 18),
        create_score(ajay, 13),
        create_score(sutti, 17),
        create_score(nik, 24),
        create_score(pru, 14),
        create_score(dad, 15),
        create_score(akka, 30),
        create_score(dj, 15),
        create_score(sha, 25)
    ])
    game = ent.Game(rounds=[first_round, second_round], players=players)
    game.winner = suchi
    print(qs.Queries().save_game(game=game))


if __name__ == '__main__':
    initialize_app()
    create_game()
    #-LYYllq4tGAVTs0SIGQQ




