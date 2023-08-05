import React, { useEffect, useRef, useState,  useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';

const SlidingNotification = (props, ref) => {
  const slideAnim = useRef(new Animated.Value(-160)).current;
  const OpenSpinner = () => {
    Animated.timing(slideAnim, {
        toValue: 0, 
        duration: 600,
        useNativeDriver: true, 
      }).start();
  }
  const CloseSpinner = () => {
        Animated.timing(slideAnim, {
        toValue: -160,
        duration: 600,
        useNativeDriver: true,
        }).start();
  }
  useImperativeHandle(ref, () => ({
    OpenSpinner: () => { OpenSpinner() },
    CloseSpinner: () => { CloseSpinner() }
  }))

  return (
    <Animated.View style={[styles.notificationContainer, { transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="black" />
        <View>
          <Text >Logging in...</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0CCA4A',
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
  },
  spinnerContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(12, 202, 74, 0.6)',
  },

});

export default forwardRef(SlidingNotification);
