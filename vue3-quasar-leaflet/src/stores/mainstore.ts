import { defineStore } from 'pinia'
import { LocationInfo } from './../models/LocationInfo'
import { LatLon } from 'src/models/LatLon'

export type IMainStore = {

  locations: LocationInfo[];
  polygon: LatLon[];
};

export const useMainStore = defineStore('mainstore', {
  state: (): IMainStore => ({
    locations: [
      {
        Latitude: 52.103839,
        Longitude: 4.252742,
        Title: 'Point 1'
      },
      {
        Latitude: 52.104085313459706,
        Longitude: 4.256030458886158,
        Title: 'Point 2'
      }

    ],
    polygon: [
      {
        Latitude: 52.099738624938254,
        Longitude: 4.253472755089291
      },
      {
        Latitude: 52.092615424361725,
        Longitude: 4.263618313481771
      },
      {
        Latitude: 52.09879591369889,
        Longitude: 4.274019642253535
      },
      {
        Latitude: 52.10487081438146,
        Longitude: 4.263021515928983
      },
      {
        Latitude: 52.099738624938254,
        Longitude: 4.253472755089291
      }

    ]
  })

})
