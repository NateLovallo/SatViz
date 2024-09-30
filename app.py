import math
import json

from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin

from skyfield.api import load
from skyfield.iokit import parse_tle_file
from skyfield.toposlib import wgs84

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello():
    return "Hello, World!"

@app.route('/oneweb_sats', methods=['GET'])
@cross_origin()
def login():
    if request.method == 'GET':
       ts = load.timescale()

    with load.open('oneweb.tle') as f:
        satellites = list(parse_tle_file(f, ts))

    print('Loaded', len(satellites), 'satellites')

    t = ts.now()

    data = []

    for satellite in satellites:
        geocentric = satellite.at(t)
        #print(geocentric.position.km)
        lat, lon = wgs84.latlon_of(geocentric)

        sat = {
        'name' : satellite.name,
        'value' : [ math.degrees(lon.radians), math.degrees(lat.radians)]
        }

        data.append(sat)

    return data
