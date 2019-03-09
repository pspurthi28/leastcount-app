import pyrebase


class ConnectionFactory:
    database: object = None

    @staticmethod
    def noquote(s):
        return s

    @staticmethod
    def initialize_db(config):
        if ConnectionFactory.database is None:
            pyrebase.pyrebase.quote = ConnectionFactory.noquote
            firebase = pyrebase.initialize_app(config)
            ConnectionFactory.database = firebase.database()
        return ConnectionFactory

    @staticmethod
    def getDatabase():
        return ConnectionFactory.database
