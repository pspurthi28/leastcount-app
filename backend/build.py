from pybuilder.core import init, use_plugin

use_plugin("python.core")
use_plugin("python.install_dependencies")

default_task = "publish"

@init
def initialize(project):
    project.build_depends_on('dataclasses-json')
    project.build_depends_on('pyrebase4')
    project.build_depends_on('cherrypy')
    project.build_depends_on('cherrypy-cors')
    project.build_depends_on('routers')
