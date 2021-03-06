//Core
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

//Styles
import '../assets/styles/components/menu.css';

class Menu extends Component {

  ref = React.createRef();
  
  componentDidMount() {
        let node = this.ref.current,
              els = node.querySelectorAll('.menu a, .menu header'),
              groupLen = Math.ceil(els.length/3),
              groupNb = 0,
              i = 1;
        
        node.style.setProperty('--count', `${els.length}`);

        els.forEach(el => {
            if (i > groupLen) {
                groupNb++;
                i = 1;
            }
            el.setAttribute('data-group', groupNb);
        el.style.setProperty('--delay-out', '0s');
            i++;
        });

        els.forEach((el, j) => {
            el.style.setProperty('--top', `${el.getBoundingClientRect().top + (el.getAttribute('data-group') * -15) - 20}px`);
            el.style.setProperty('--delay-in',` ${j*.1}s`);
            el.style.setProperty('--delay-out', `${(els.length-j)*.1}s`);
        });

        node.querySelector('footer button').addEventListener('click', e => {
            e.preventDefault();
            els.forEach((el, j) => {
                el.style.setProperty('--top', `${el.getBoundingClientRect().top + (el.getAttribute('data-group') * -15) - 20}px`);
                el.style.setProperty('--delay-in',` ${j*.1}s`);
                el.style.setProperty('--delay-out', `${(els.length-j)*.1}s`);
            });
            node.classList.toggle('closed');
            e.stopPropagation();
        });

        setTimeout(() => {
            node.classList.contains('origin') && node.classList.remove('origin');
        }, 400);
  }

  render() {
    return <nav ref={this.ref} className="menu closed origin">
        <header><span>×</span></header>
        <ul>
            <li className="menu__gritem">
                <Link to="/">Embarquement</Link>
                <ul className="menu__sub">
                    <li className="menu__item"><Link to="/">une.</Link></li>
                    <li className="menu__item"><Link to="/">préface.</Link></li>
                </ul>
            </li>
            <li className="menu__gritem">
                <Link to="/explore/datasets">Exploration</Link>
                <ul className="menu__sub">
                    <li className="menu__item"><Link to="/explore/datasets">aventures.</Link></li>
                    <li className="menu__item"><Link to="/explore/authors">héroines.</Link></li>
                </ul>
            </li>
        </ul>
        <footer><button aria-label="Afficher/Cacher le menu">Afficher/Cacher le menu</button></footer>
    </nav> ;
  }
}

export default Menu;
