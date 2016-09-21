/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';

var StopWatch = React.createClass({
  getInitialState:function () {
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  },
  render: function () {
    return (
      <View style={styles.container}>
         <View style={[styles.header]}>
           <View style={[styles.timmerWrapper]}>
             <Text style={styles.timer}>
               {formatTime(this.state.timeElapsed)}
             </Text>
           </View>
           <View style={[styles.buttonWrapper]}>
             {this.startStopButton()}
             {this.lapButton()}
           </View>
         </View>
         <View style={[styles.footer]}>
             {this.laps()}
         </View>
      </View>
    );
  },
  laps: function () {
    return this.state.laps.map(function (time,index) {
      // Each child in an array or iterator should have a unique "key"
      //key={index}
      return(
        <View key={index} style={styles.lap}>
          <Text style={styles.lapText}>
            Lap #{index+1}
          </Text>
          <Text style={styles.lapText}>
          {formatTime(time)}
          </Text>
        </View>
      );
    });
  },
  startStopButton: function () {
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return (
      <TouchableHighlight
        underlayColor="gray"
        style={[styles.button,style]}
        onPress={() => this.handleStartPress()}>
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
    );
  },
  lapButton: function () {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="gray"
        onPress={() => this.handleLapPress()}
        >
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
    );
  },
  handleLapPress:function () {
    var lap = this.state.timeElapsed;
    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });
  },
  handleStartPress: function () {
    console.log('Start was pressed!');
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({running:false});
      return
    }
    var startTime = new Date();
    this.setState({startTime:new Date()});
    // Never do!!! in react
    // this.state.timeElapsed = new Date()
    // update our state with some new value and this
    // Cause our view to re-render
  this.interval = setInterval(
     () => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running:true
      });
    } , 30);
  }
});

var styles = StyleSheet.create({
  container:{
    flex:1 , // fill the entire the screen
    alignItems: 'stretch'
  },
  header:{ //yellow
    flex:1
  },
  footer:{ //blue
    flex:1
  },
  timmerWrapper:{ //Red
    flex:5, //takes up 5/8ths  (total = 5+3)of the available space
    justifyContent: 'center',
    alignItems:'center'
  },
  buttonWrapper:{ //Green
    flex:3, //takes up 3/8ths of the available space
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems:'center'
  },
  timer:{
    fontSize: 60
  },
  button:{
    borderWidth:2,
    height:90,
    width:90,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center'
  },
  startButton:{
    borderColor: '#00CC00'
  },
  stopButton:{
    borderColor: '#CC0000'
  },
  lap:{
    justifyContent:'space-around',
    flexDirection:'row'
  },
  lapText:{
    fontSize: 30
  }
})

AppRegistry.registerComponent('stopwatch', () => StopWatch);
