import os


def config():
    APIKEY = os.environ["FIREB_APIKEY"]
    AUTHDOMAIN = os.environ["FIREB_AUTHDOMAIN"]
    DATABASEURL = os.environ["FIREB_DATABASEURL"]
    PROJECTID = os.environ["FIREB_PROJECTID"]
    STORAGEBUCKET = os["FIREB_STORAGEBUCKET"]
    MESSAGINGSENDERID = os["FIREB_MESSAGINGSENDERID"]

    cfg = {
        "apiKey": APIKEY if APIKEY is not None else "",
        "authDomain": AUTHDOMAIN if AUTHDOMAIN is not None else "",
        "databaseURL": DATABASEURL if DATABASEURL is not None else "",
        "projectId": PROJECTID if PROJECTID is not None else "",
        "storageBucket": STORAGEBUCKET if STORAGEBUCKET is not None else "",
        "messagingSenderId": MESSAGINGSENDERID if MESSAGINGSENDERID is not None else ""
    }
    return cfg
