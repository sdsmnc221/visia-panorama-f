import React, { Component } from 'react';
import '../assets/styles/components/call-to-action.css';


class CallToAction extends Component {

  static defaultProps = {
      actions: []
  }

  renderCalltoAction = () => {
    const {actions} = this.props;
    if (actions.length > 0) {
      return actions.map((a, i) => 
          <li key={`call-to-action--${i}`}> 
              {(a.url && <a href={a.url}> {a.details} </a>)
              ||
              <span> {a.details} </span>} 
          </li>
      );
    } else {
      return false;
    }
  }

  render() {
    return <ul className="action">
            {this.renderCalltoAction()}
            <li key={`call-to-action--add`}>
              <button>Il est aussi grand temps de proposer votre propre histoire !</button>
            </li>
          </ul>;
  }
}

export default CallToAction;