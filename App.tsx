import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import MapView, { Polygon } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {


  const [cords, setCords] = useState([])
  const [cords1, setCords1] = useState([])
  const [cords2, setCords2] = useState([])
  const [cords3, setCords3] = useState([])

  const createCircle = (circleCenterX, circleCenterY, circleRadius, pointsToEnd) => {
    let angleToAdd = 360 / pointsToEnd;
    let coords = [];
    let angle = 0;
    for (let i = 0; i < pointsToEnd; i++) {
      angle += angleToAdd;
      let coordX = circleCenterX + circleRadius * Math.cos(angle * Math.PI / 180);
      let coordY = circleCenterY + circleRadius * Math.sin(angle * Math.PI / 180);
      coords.push({ latitude: coordY, longitude: coordX });
    }
    setCords3(coords);
  }

  const geocords = () => {
    var centerX = -122.4324;
    var centerY = 37.78825;
    var radius = 30;

    // an array to save your points
    var cords1 = [];
    var cords2 = [];

    for (var degree = 0; degree < 360; degree++) {
      var radians = degree * Math.PI / 180;
      var x = centerX + radius * Math.cos(radians);
      var y = centerY + radius * Math.sin(radians);
      cords1.push({ latitude: y, longitude: x });
    }
    var steps = 150
    for (var i = 0; i < steps; i++) {
      var x2 = (centerX + 0.2 * Math.cos(2 * Math.PI * i / steps));
      var y2 = (centerY + 0.2 * Math.sin(2 * Math.PI * i / steps));
      cords2.push({ latitude: y2, longitude: x2 });
    }
    var n = Math.ceil(2.0 * Math.PI * 0.2 / 0.01); // integer number of points (rounded up)

    var da = 2.0 * Math.PI / n;           // floating angular step between points
    var a = 0.0
    var cords = []
    var i = 0
    var x = 0
    var y = 0
    for (a, i; i < n; i++, a += da) {
      x = -122.4324 + 1 * Math.cos(a);
      y = 37.78825 + 1 * Math.sin(a);
      // here x,y is your point
      cords.push({ latitude: y, longitude: x })

    }
    setCords(cords);
    setCords1(cords1);
    setCords2(cords2);
  }
  useEffect(() => {
    geocords()
    createCircle(-122.4324, 37.78825, 0.5, 120)
  }, [])


  console.log(cords)
  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polygon coordinates={cords} strokeColor="#000" fillColor="#fba55f44"
          strokeWidth={2} />
        <Polygon coordinates={cords1} strokeColor="#000" fillColor="#fde35466"
          strokeWidth={2} />
        <Polygon coordinates={cords2} strokeColor="#000" fillColor="#fa6f5f44"
          strokeWidth={2} />
        <Polygon coordinates={cords3} strokeColor="#000" fillColor="#af5fff44"
          strokeWidth={2} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
