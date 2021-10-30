import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tileLayer, latLng, LeafletMouseEvent, Marker, marker } from 'leaflet';
import { coordinatesMap } from './coordinates';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.layers = this.initialCoordinatess.map(value => marker([value.latitude, value.longitude]));
  }

  @Input()
  initialCoordinatess : coordinatesMap[] = [];


  @Output()
  onSelectedLocation = new EventEmitter<coordinatesMap>();



  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Angular Movies' })
    ],
    zoom: 14,
    center: latLng(6.565951014315645,3.327499736915343)
  };

  layers: Marker<any>[]= [];

  handleMapClick(event : LeafletMouseEvent){
    const latitude = event.latlng.lat;
    const longitude = event.latlng.lng;
    console.log({latitude,longitude});
    this.layers = [];
    this.layers.push(marker([latitude,longitude]));
    this.onSelectedLocation.emit({latitude, longitude});
  }

}
