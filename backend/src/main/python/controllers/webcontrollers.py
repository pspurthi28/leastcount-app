import cherrypy
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
        rawData = cherrypy.request.json
        joinresp = gS.GameService().join_game(game_join_req=rawData)
        return joinresp

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def save_game(self):
        saveresp = gS.GameService().create_game()
        return saveresp


if __name__ == '__main__':
    d = cherrypy.dispatch.RoutesDispatcher()
    web_controller = WebController()
    d.connect(name='join', route='/join', controller=web_controller,
              conditions=dict(method=['POST']), action="join")
    d.connect(name='get_game', route='/find', controller=web_controller,
              action='get_game', conditions=dict(method=['GET']))
    d.connect('save_game', controller=web_controller, route='/create',
              action='save_game', conditions=dict(method=['POST']))
    conf = {
        '/': {
            'request.dispatch': d,
            'tools.sessions.on': True,
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'application/json')],
        }
    }
    cherrypy.tree.mount(WebController(), '/games', conf)
    cherrypy.engine.start()
    cherrypy.engine.block()
