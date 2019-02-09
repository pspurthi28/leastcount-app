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
    @cherrypy.tools.accept(media='application/json')
    def GET(self, gameId):
        game = q.Queries().get_game_by_game_id(gameId)
        return json.loads(game.to_json())

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def POST(self):
        rawData = cherrypy.request.json
        joinresp = gS.GameService().join_game(game_join_req=rawData)
        print(rawData)
        print(joinresp)
        return joinresp

    def somemethod(self):
        return ''


if __name__ == '__main__':
    conf = {
        '/': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.sessions.on': True,
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'application/json')],
        }
    }
    cherrypy.tree.mount(WebController(), '/games', conf)
    cherrypy.engine.start()
    cherrypy.engine.block()
