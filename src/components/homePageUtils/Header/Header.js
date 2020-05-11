import React from 'react';
import headerImage from "../../../images/home3.jpg";
import { Parallax } from 'react-parallax';
import Card from '../cards/Card';
import './Header.scss';

export default class Header extends React.PureComponent {
    render() {
        return (
            <Parallax bgImage={headerImage} bgImageStyle={{objectFit: "fill", opacity: 0.7}} strength={500}>
                <div id="header">
                    <Card/>
                    {/*<p> Control your property </p>*/}
                </div>
            </Parallax>
        )
    }
}