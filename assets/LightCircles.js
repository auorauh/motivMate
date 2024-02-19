import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlString = `
<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 450 800'><rect fill='#FFF9EF' width='800' height='800'/><g fill-opacity='1'><circle fill='#FFF9EF'  cx='400' cy='400' r='600'/><circle fill='#c7c2b8'  cx='400' cy='400' r='500'/><circle fill='#928d84'  cx='400' cy='400' r='400'/><circle fill='#615c54'  cx='400' cy='400' r='300'/><circle fill='#332f28'  cx='400' cy='400' r='200'/><circle fill='#444'  cx='400' cy='400' r='100'/></g></svg>`;

export default () => <SvgXml xml={xmlString} width='450' height='450' style={{ position: 'absolute', zIndex: -1, opacity: 0.6}}/>;