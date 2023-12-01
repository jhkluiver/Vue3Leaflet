<template>
  <div class="mapContainer">
    <l-map ref="map" :zoom="zoom" :center="center" :useGlobalLeaflet="false">
      <l-tile-layer :url="getWsUrl()" layer-type="base" name="OpenStreetMap"
        attribution="© OpenStreetMap contributors"></l-tile-layer>
      <l-feature-group ref="fg">
        <l-marker v-for="loc in  locations " :lat-lng="getlatLon(loc)" :key="loc.Title">
          <l-tooltip>
            {{ loc.Title }}
          </l-tooltip>
        </l-marker>
      </l-feature-group>
      <l-polygon :lat-lngs="getPolygonArea()" color="red" :fill="true" :fillOpacity="0.2" fillColor="red" />

    </l-map>
  </div>
  <div>Map with vue-leaflet library</div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LPolygon, LTooltip, LFeatureGroup } from '@vue-leaflet/vue-leaflet'
import { onMounted, ref, nextTick } from 'vue'
import { useMainStore } from './../stores/mainstore'
import { storeToRefs } from 'pinia'
import { LocationInfo } from '../models/LocationInfo'
import { PointTuple } from 'leaflet'
const main = useMainStore()
const { locations } = storeToRefs(main)

const getWsUrl = (): string => {
  return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
}

const getlatLon = (item: LocationInfo): PointTuple => {
  return [item.Latitude, item.Longitude]
}

const getPolygonArea = (): PointTuple[] => {
  return main.polygon.map(coordinate => [coordinate.Latitude, coordinate.Longitude])
}

onMounted(() => {
  nextTick(() => {
    /* if (map.value) {
            // How to ref a reference to map?!
        } */
  })
})
const zoom = ref(15)
const center = ref<PointTuple>([52.09895303362214, 4.2637035702751405])
const map = ref<typeof LMap>()
const fg = ref<typeof LFeatureGroup | null>(null)

</script>

<style >
.mapContainer {
  width: 100%;
  height: 600px;
}

.leaflet-div-icon {
  background: steelblue;
  color: rgba(255, 255, 255, 0.5);
  border-radius: 80%;
  font-weight: bold;
  font-size: large;
  text-align: center;
  line-height: 21px;
}
</style>
