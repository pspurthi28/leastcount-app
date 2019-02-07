import pyrebase
import json


class ConnectionFactory:

    database: object = None

    @staticmethod
    def getDatabase():
        return ConnectionFactory.database

    @staticmethod
    def loadConfig(filepath):
        with open(filepath) as filePointer:
            config_json = json.loads(filePointer.read())
            print(config_json)
            return config_json

    @staticmethod
    def initialize_db(filePath):
        config = ConnectionFactory.loadConfig(filePath)
        if ConnectionFactory.database is None:
            firebase = pyrebase.initialize_app(config)
            ConnectionFactory.database = firebase.database()
        return ConnectionFactory
