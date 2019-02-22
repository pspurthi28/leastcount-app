FROM python:3.7-alpine

LABEL author="Winter Soldier"
LABEL description="Python-Node image to run the leastcount app"

WORKDIR /usr/src/app

RUN apk add python3-dev
RUN apk add build-base

## TODO- Replace this with requirement.txt sometime
RUN pip install --no-cache-dir cherrypy cherrypy-cors dataclasses-json routes Pyrebase4

RUN apk add git && \
    apk add nodejs && \
    apk add npm && \
    git clone https://github.com/pspurthi28/leastcount-app.git . && \
    cd frontend && \
    npm install && \
    npm run build

RUN ls && \
    cp -r frontend/build/* /usr/src/app/backend/src/main/python/ && \
    apk del git && \
    apk del npm && \
    apk del nodejs && \
    rm -r frontend/node_modules

RUN cd backend/src/main/python/

WORKDIR /usr/src/app/backend/src/main/python

ENTRYPOINT [ "python", "app.py" ]