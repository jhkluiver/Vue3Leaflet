/*
Example how to use Leaflet directly
*/

<template>
  <div id="placeholdermap" class="mapContainer">

  </div>
  <div>Map without vue-leaflet (use leaflet directly)</div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { nextTick, onMounted, ref } from 'vue'
import L, { LeafletEventHandlerFn } from 'leaflet'
import { useMainStore } from './../stores/mainstore'
import { storeToRefs } from 'pinia'

// import { map, latLng, tileLayer, MapOptions } from 'leaflet'
const main = useMainStore()
const { locations } = storeToRefs(main)

const leafletMap = ref<L.Map>()

onMounted(() => {
  // Inject the leaflet map after the page is fully rendered
  nextTick(() => {
    initLeafletMap()
  })
})

const initLeafletMap = () => {
  // Find div element 'placeholdermap' in html and inject the leaflet map object
  leafletMap.value = L.map('placeholdermap', {
    center: new L.LatLng(52.09895303362214, 4.2637035702751405),
    zoom: 15
  })

  // Example how to set center and zoom level (with intellisense)
  // leafletMap.value.setView([52.103839, 4.252742], 13 /* zoom level */)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '© OpenStreetMap contributors'
  }).addTo(leafletMap.value)

  // L.marker([52.103839, 4.252742], { icon: customDivIcon }).addTo(leafletMap.value)

  // Add locations
  main.locations.forEach(loc => {
    if (leafletMap.value) {
      const marker = L.marker([loc.Latitude, loc.Longitude])
        .addTo(leafletMap.value)

        .bindTooltip(loc.Title, {
          permanent: true,
          offset: new L.Point(10, -25),
          direction: 'center',
          className: 'my-labels'
        })
        .bindPopup('Tooltip!<br> ' + loc.Title)
      if (marker.dragging) marker.dragging?.enable()
      // marker.on('dragend', (event: LeafletEventHandlerFn) => {
      //  const latlng = event.target.getLatLng()
      //  console.log(latlng.lat, latlng.lng)
      // })
    }
  })
  L.polygon(main.polygon.map(pnt => [pnt.Latitude, pnt.Longitude]), { color: 'red' }).addTo(leafletMap.value)
}

</script>
<style>
.my-labels {
  background-color: transparent;
  border: transparent;
  box-shadow: none;
  font-weight: bold;
  font-size: 16px;
  color: red;
}
</style>

<style scoped>
.mapContainer {
  width: 100%;
  height: 600px;
}
</style>
