<h1 align="center">Exoplanet-scouter - Graphql API</h1>

A public Graphql API for information about known exoplanets and stars.
This project uses [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/)
as a datasource following closely to the schema provided by the archive (fields), only with few expections and additions.

Demo: https://exoscout.static-memory.dev

NOTE:
This code is in alpha stages so it might change radically before version 1 release.
You can use the "Demo" api for any purpose you like, but be aware that it might be taken down or changed at any moment.
I suggest to use this API locally or in self provided environments.

## Todo:
[] - Issues and milestones for version 1
[] - Better readme and explanations
[] - External datasource result caching
[] - Higher testing coverage
[] - Github action step for testing and building the application
[] - Clear separation of development and production packages
[] - Development dockerfile and Makefile for easier testing and building purposes

## Queries

```graphql
{
  exoplanets {
    name
    potentiallyHabitable
    yearOfDiscovery
    controversial
    updatedAt
    star {
      name
      mass
      distance
      coordinates(unit:XYZ) {
        ... on XYZ {
          x
          y
          z
        }
      }
    }
  }
}
```

The above query will produce following json:
```json
{
"data": {
  "exoplanets": [
    {
      "name": "Kepler-767 b",
      "orbitSemiMajorAxis": null,
      "potentiallyHabitable": false,
      "yearOfDiscovery": 2016,
      "controversial": false,
      "updatedAt": "2016-05-06",
      "star": {
        "name": "Kepler-767",
        "distance": 2251.03,
        "mass": 0.96,
        "radius": 0.94,
        "temperature": 5694,
        "coordinates": {
          "x": 733.1841204025841,
          "y": 2091.6379400733967,
          "z": 393.2274585211571
        }
      }
    },
    {
      "name": "Kepler-260 b",
      "orbitSemiMajorAxis": 0.075,
      "potentiallyHabitable": false,
      "yearOfDiscovery": 2014,
      "controversial": false,
      "updatedAt": "2014-05-14",
      "star": {
        "name": "Kepler-260",
        "distance": 627.365,
        "mass": null,
        "radius": 0.86,
        "temperature": 5250,
        "coordinates": {
          "x": 203.4251363490311,
          "y": 583.7692967475767,
          "z": 106.85721922835964
        }
      }
    },

    ...

  ]
}
```

## Features
* Find exoplanets that exists in a habitable zone
* Find star locations in the galaxy by Galaxy Coordinate System (latitude, longitude) or in cartesian format (x, y, z)
* Filter exoplanets by their controversiality or by possible habitability
* Sort by distance to our sun or by the year the planet was discovered
