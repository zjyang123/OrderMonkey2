/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Delivery Tracking page
 * File path - '../../../../src/pages/delivery-tracking/delivery-tracking'
 */

import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapStyle } from '../../assets/config/map-style';
declare var google;

@IonicPage()
@Component({
  selector: 'page-delivery-tracking',
  templateUrl: 'delivery-tracking.html',
})
export class DeliveryTrackingPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public platform: Platform) {
  }

  ionViewDidLoad() {
    this.loadmap();
  }

  loadmap() {
    let user1Latlng = new google.maps.LatLng(23.7554464, 90.3856283);
    let user2Latlng = new google.maps.LatLng(23.7636971, 90.3706906);

    // Define Direction Service
    let directionsService = new google.maps.DirectionsService;

    let lineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      fillOpacity: 1,
      scale: 3
    };
    let polylineOptionsActual = new google.maps.Polyline({
      strokeColor: '#d0330f',
      strokeWeight: 5,
      icons: [{
        icon: lineSymbol,
        offset: '0',
        repeat: '10px'
      }],
      strokeOpacity: 0,
      fillOpacity: 0,
    });


    let directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true, polylineOptions: polylineOptionsActual });


    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 5,
      center: user1Latlng,
      styles: MapStyle
    });

    directionsDisplay.setMap(this.map);

    let icons = {
      start: {
        icon: 'assets/imgs/user1.png',
        name: 'Sinthia'
      },
      end: {
        icon: 'assets/imgs/user2.png',
        name: 'Mark'
      }
    };

    this.addMarker(user1Latlng, icons.start, 'start');
    this.addMarker(user2Latlng, icons.end, 'end');

    directionsService.route({
      origin: user1Latlng,
      destination: user2Latlng,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  addMarker(latlng, info, title) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon: info.icon,
      title: title,
      position: latlng
    });
    let content = info.name;
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    infoWindow.open(this.map, marker);
  }
}
