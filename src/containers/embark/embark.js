import React, { Component } from 'react';
import './embark.css';
import API from '../../utils/api';
import Header from '../../components/header';
import Slider from '../../components/slider';
import Tabs from '../../components/tabs';
import Menu from '../../components/menu';
import SplashScreen from '../../components/splash-screen';
import LoadingScreen from '../../components/loading-screen';


class Embark extends Component {

  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      contents: ['panorama', 'visia'],
      appOK: false
    }
  }

  componentDidMount() {
    API.datasetsFeatured()
       .then(d => {
        this.setState({datasets: d});
       })
       .then(() => this.getContent())
       .catch(e => console.log(e));
  }  

  getContent() {
    API.content(this.state.contents.join('+'))
        .then(c => {
            this.setState({contents: c});
        })
        .catch(e => console.log(e));
  }

  onSplashScreenRendered = () => {
    this.setState({appOK: true});
  }

  render() {
    console.log(this.state);
    return (
      <main className='home-view'>
          <LoadingScreen appOK={this.state.appOK} />
          <Menu />
          <section className='section'>
            <SplashScreen onRendered={this.onSplashScreenRendered} />
          </section>
          <section className='section'>
            <Header level={4} title='Une' 
              subtitle={`Embarquez dans nos aventures, pour découvrir ou redécouvrir les femmes qui se sont distinguées dans la littérature, héroïnes incontournables ou méconnues d'hier et d'aujourd'hui.`} />
            <Slider data={this.state.datasets} active={0} />
          </section>
          <section className='section'>
            <Header level={4} title='Préface' />
            <Tabs data={this.state.contents} />
          </section>
      </main>
    );
  }
}

export default Embark;
