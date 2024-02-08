import React, { useRef } from 'react';
import { View, PanResponder, Animated, Text } from 'react-native';

const SwipeToDeleteComponent = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 100) {
          // If swiped more than 100 units (you can adjust this threshold)
          // Perform the delete action here, e.g., remove the component from the UI
          // You can implement your specific delete logic here.
          console.log('Deleted the component');
        } else {
          // Reset the position if not swiped enough
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }],
        }}
        {...panResponder.panHandlers}
      >
        <View style={{ width: '100%', height: 100, backgroundColor: 'lightblue' }}>
          <Text>Swipe Right to Delete</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default SwipeToDeleteComponent;
