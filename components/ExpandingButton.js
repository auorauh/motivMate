import React, { useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
function ExpandingButton() {
    const [expanded, setExpanded] = useState(false);
    const scaleValue = new Animated.Value(1);
  
    const handlePress = () => {
      setExpanded(!expanded);
  
      // Use layout animation to smoothly animate the button expansion
      Animated.spring(scaleValue, {
        toValue: expanded ? 1 : 2, // Adjust the scale value as needed
        useNativeDriver: false, // We're using the scale transform
      }).start();
    };
  
    return (
      <View style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={() => null}>
          <Animated.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity onPress={handlePress}>
              <View style={{ backgroundColor: 'blue', padding: 20, borderRadius: 10 }}>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  };
  export default ExpandingButton;