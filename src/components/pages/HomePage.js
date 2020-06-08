import React, { PureComponent } from "react";
import { HashRouter } from "react-router-dom";
import accounts from '../../images/accounts.jpg';
import headerImage from '../../images/home3.jpg';
import idea from '../../images/idea3.jpg';
import comfortable from '../../images/comfortable.jpg';
import simple from '../../images/simple.jpg';
import advanced from '../../images/advanced3_.jpg';
import NavBar from '../homePageUtils/NavBar/NavBar';
import Header from '../homePageUtils/Header/Header';
import CardIdea from '../homePageUtils/cards/CardIdea';
import CardTeam from '../homePageUtils/cards/CardTeam';
import shoham from '../../images/team/shohamTeam.jpg';
import daniel from '../../images/team/danielTeam.jpg';
import bar from '../../images/team/barTeam.jpg';
import ron from '../../images/team/ronTeam.jpg';
import nir from '../../images/team/nirTeam.jpg';




import "./HomePage.scss"
// import * as $ from 'jquery'
import { Parallax } from 'react-parallax';

class HomePage extends PureComponent {

    render() {
        const textIdea = "Tired of managing property accounts in different places? \n In an unordered way? \n Want to move forward? \n That's what we're here for, Properit!"
        const textSimple = "A lot of assets? \n Lots of renters? \n Too many accounts.\n  It's convenient to manage them all in one place"
        const textComfortable = "All assets, all renters, all accounts \n No unnecessary headaches, all in one place \n All in Properit"
        const textAdvanced = "A smart system that knows how to manage all your assets\n" + "Get a live snapshot so nothing gets missed\n" + "All at the touch of a button"

        return (
            <HashRouter>
                <div className={'bla'}>
                    <NavBar />
                    <div className="content">
                        <Header />
                        <section className="container section" id="section_1">
                            <CardIdea
                                image={idea}
                                title="Idea"
                                id="section_1"
                                text={textIdea}
                            />
                            <CardIdea
                                image={simple}
                                title="Simple"
                                imageOffset="offset-l1 push-l7"
                                textOffset="offset-l1 pull-l5 right-align"
                                text={textSimple}
                            />
                            <CardIdea
                                image={comfortable}
                                title="Comfortable"
                                textOffset="offset-l1"
                                text={textComfortable}
                            />
                            <CardIdea
                                image={advanced}
                                title="Advanced"
                                imageOffset="offset-l1 push-l7"
                                textOffset="offset-l1 pull-l5 right-align"
                                text={textAdvanced}
                            />
                        </section>


                        <Parallax bgImage={accounts}>
                            <div style={{ height: '600px'}}/>
                        </Parallax>

                        <div id="section_2">
                            <p className="descriptionTeam">
                                <span className="spanText"> Final Project 2020</span>
                                <span className="spanText"> Department of Computer Science of the College of Management</span>
                                <span className="spanText"> Group #807</span>
                            </p>
                            <div className="cardRow">
                                <CardTeam
                                    image={shoham}
                                    title="Shoham Yaakov"
                                    id="section_2"
                                />
                                <CardTeam
                                    image={daniel}
                                    title="Daniel Cohen Ambalo"
                                    id="section_2"
                                />
                                <CardTeam
                                    image={nir}
                                    title="Nir Ida"
                                    id="section_2"
                                />
                                <CardTeam
                                    image={bar}
                                    title="Bar Castel"
                                    id="section_2"
                                />
                                <CardTeam
                                    image={ron}
                                    title="Ron Arviv"
                                    id="section_2"
                                />
                            </div>
                         </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}


export default HomePage;