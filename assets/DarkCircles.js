import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlString = `

<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 440 800'>
<rect fill='#000000' width='800' height='800'/>
<g fill-opacity='1'>
<circle fill='#222'  cx='400' cy='400' r='600'/><circle fill='#222'  cx='400' cy='400' r='500'/>
<circle fill='#666'  cx='400' cy='400' r='400'/><circle fill='#999'  cx='400' cy='400' r='300'/>
<circle fill='#DDD'  cx='400' cy='400' r='200'/><circle fill='#FFF'  cx='400' cy='400' r='100'/>
</g>
</svg>

`;

export default () => <SvgXml xml={xmlString} width='400' height='540' style={{ position: 'absolute', zIndex: -1, }}/>;