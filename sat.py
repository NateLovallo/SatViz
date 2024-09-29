import math
import json

from skyfield.api import load
from skyfield.iokit import parse_tle_file
from skyfield.toposlib import wgs84

ts = load.timescale()

with load.open('oneweb.tle') as f:
    satellites = list(parse_tle_file(f, ts))

print('Loaded', len(satellites), 'satellites')

t = ts.now()

data = []

for satellite in satellites:
    geocentric = satellite.at(t)
    print(geocentric.position.km)
    lat, lon = wgs84.latlon_of(geocentric)

    sat = {
     'name' : satellite.name,
     'value' : [math.degrees(lat.radians), math.degrees(lon.radians)]
    }

    data.append(sat)

    print(json.dumps(sat))


with open('sats.json', 'w') as satsfile:
    satsfile.write(json.dumps(data, indent='  '))