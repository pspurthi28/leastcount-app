import cherrypy
import cherrypy_cors
import configfile as configfile
from datastore import connectionFactory as cF
from datastore import queries as q
import json
from services import gamesvc as gS


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

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def record_score(self):
        if cherrypy.request.method == 'OPTIONS':
            return {}
        request_json = cherrypy.request.json
        game = gS.GameService().player_score(request_json)
        return json.loads(game.to_json())

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def create_round(self):
        if cherrypy.request.method == 'OPTIONS':
            return {}
        request_json = cherrypy.request.json
        game = gS.GameService().create_round(request_json['gameId'])
        return json.loads(game.to_json())

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def complete_round(self):
        if cherrypy.request.method == 'OPTIONS':
            return {}
        request_json = cherrypy.request.json
        game = gS.GameService().end_round(request_json['gameId'])
        return json.loads(game.to_json())

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def complete_game(self):
        if cherrypy.request.method == 'OPTIONS':
            return {}
        request_json = cherrypy.request.json
        game = gS.GameService().end_game(request_json['gameId'])
        return json.loads(game.to_json())


# This controller is responsible for rendering html/index.html where the React code is hosted
class IndexController:

    @cherrypy.expose
    def index(self, gameId='default'):
        cookie = cherrypy.response.cookie
        if gameId is not 'default':
            cherrypy.session['gameId'] = gameId
            cookie["leastcountapp-gameid"] = gameId
            cookie["leastcountapp-servedviabackend"] = True
        return open('index.html')


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
    routes_dispatcher.connect('complete_game', controller=web_controller, route='/complete',
                              action='complete_game', conditions=dict(method=['POST', 'OPTIONS']))
    routes_dispatcher.connect('complete_round', controller=web_controller, route='/round/complete',
                              action='complete_round', conditions=dict(method=['POST', 'OPTIONS']))
    routes_dispatcher.connect('create_round', controller=web_controller, route='/round/create',
                              action='create_round', conditions=dict(method=['POST', 'OPTIONS']))

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
    cherrypy.config.update({'server.socket_host': '0.0.0.0'})
    cherrypy.engine.start()
    cherrypy.engine.block()
