import cherrypy
import cherrypy_cors
from controllers import webcontrollers as wc

if __name__ == '__main__':
    import sys
    import os
    cwd = os.getcwd()
    print(cwd)
    sys.path.append(cwd)
    cherrypy_cors.install()
    routes_dispatcher = cherrypy.dispatch.RoutesDispatcher()
    web_controller = wc.WebController()
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

    index_conf = {
        '/': {
            'tools.sessions.on': True,
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.on': './static'
        }
    }
    cherrypy.tools.CORS = cherrypy.Tool('before_handler', wc.MIN_CORS)
    cherrypy.tree.mount(web_controller, '/games', conf)
    cherrypy.tree.mount(wc.IndexController(), '/', index_conf)
    cherrypy.config.update({'server.socket_host': '0.0.0.0'})
    cherrypy.engine.start()
    cherrypy.engine.block()
