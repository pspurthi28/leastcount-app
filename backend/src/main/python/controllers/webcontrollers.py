import cherrypy
import cherrypy_cors
from src.main.python import configfile as configfile
from src.main.python.datastore import connectionFactory as cF
from src.main.python.datastore import queries as q
import json
from src.main.python.services import gamesvc as gS


@cherrypy.expose
class WebController:
    initialized: bool = True

    def __init__(self):
        self.initialized = True
        cF.ConnectionFactory.initialize_db(configfile.config())

    @cherrypy.tools.json_out()
    @cherrypy.tools.accept(media='text/html')
    def get_game(self, gameId):
        game = q.Queries().get_game_by_game_id(gameId)
        return json.loads(game.to_json())

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    @cherrypy.tools.accept(media='application/json')
    def join(self):
        if cherrypy.request.method == 'OPTIONS':
            return {}
        else:
            rawData = cherrypy.request.json
            joinresp = gS.GameService().join_game(game_join_req=rawData)
            return joinresp

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def save_game(self):
        if cherrypy.request.method == 'OPTIONS':
            return {}
        saveresp = gS.GameService().create_game()
        return saveresp

    ## TODO -- Get game_id, player_id and his score from here and append to game's round's roundscore & then return the game itself
    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def record_score(self):
        if cherrypy.request.method == 'OPTIONS':
            return {}
        request_json = cherrypy.request.json
        game = q.Queries().get_game_by_game_id(request_json['gameId'])
        return json.loads(game.to_json())


def CORS():
    cherrypy.response.headers["Access-Control-Allow-Origin"] = "*"
    cherrypy.response.headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, HEAD, OPTIONS, DELETE"
    cherrypy.response.headers["Access-Control-Allow-Headers"] = "*"
    cherrypy.response.headers["Access-Control-Expose-Headers"] = "*"
    cherrypy.response.headers[
        "Access-Control-Allow-Headers"] = "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
    return


def MIN_CORS():
    cherrypy.response.headers["Access-Control-Allow-Origin"] = "*"
    cherrypy.response.headers["Access-Control-Allow-Headers"] = "Origin, X-requested-With, Content-Type, Accept"
    return


if __name__ == '__main__':
    cherrypy_cors.install()
    routes_dispatcher = cherrypy.dispatch.RoutesDispatcher()
    web_controller = WebController()
    routes_dispatcher.connect(name='join', route='/join', controller=web_controller,
                              conditions=dict(method=['POST', 'OPTIONS']), action="join")
    routes_dispatcher.connect(name='get_game', route='/find', controller=web_controller,
                              action='get_game', conditions=dict(method=['GET', 'OPTIONS']))
    routes_dispatcher.connect('save_game', controller=web_controller, route='/create',
                              action='save_game', conditions=dict(method=['POST', 'OPTIONS']))
    routes_dispatcher.connect('score', controller=web_controller, route='/score',
                              action='record_score', conditions=dict(method=['POST', 'OPTIONS']))
    conf = {
        '/': {
            'request.dispatch': routes_dispatcher,
            'tools.sessions.on': True,
            'tools.response_headers.on': True,
            'tools.CORS.on': True,
            'cors.expose.on': True
        }
    }
    cherrypy.tools.CORS = cherrypy.Tool('before_handler', MIN_CORS)
    cherrypy.tree.mount(WebController(), '/games', conf)
    cherrypy.engine.start()
    cherrypy.engine.block()
