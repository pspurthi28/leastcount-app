import pyrebase
import json


class ConnectionFactory:
    database: object = None

    @staticmethod
    def initialize_db(config):
        if ConnectionFactory.database is None:
            firebase = pyrebase.initialize_app(config)
            ConnectionFactory.database = firebase.database()
        return ConnectionFactory

    @staticmethod
    def getDatabase():
        return ConnectionFactory.database
