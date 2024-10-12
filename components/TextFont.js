import {useState, useEffect, React}  from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';

const loadFonts = () => Font.loadAsync({
    'Montserrat': require('../assets/static/Montserrat-Medium.ttf'),
});

const TextFont = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontLoaded(true));
  }, []);

  return (
    <Text {...props} style={[props.style, { fontFamily: 'Montserrat' }]}>
      {props.children}
    </Text>
  );
};

export default TextFont;
