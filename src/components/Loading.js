import React from 'react';
import img from '../loading_spinner.gif'

let Loading = ({ loading }) => (
    loading ?
        <div style={{ textAlign: 'center' }}>
            <img src={img} alt='loading' />
        </div> :
        null
);
export default Loading;