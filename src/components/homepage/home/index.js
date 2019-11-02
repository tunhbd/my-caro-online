import React from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';

import './home.styles.css';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <header className="home__header">
          <img
            className="home__header__logo"
            src="/images/caro-logo.jpg"
            alt="logo"
          />
        </header>
        <div className="home__content">
          <Link to="/play-with-computer" className="home__content__selection">
            <Button type="primary">
              <img src="/images/caro-computer.png" alt="caro computer" />
              Play with computer
            </Button>
          </Link>
          <Link to="/fighting" className="home__content__selection">
            <Button type="primary">
              <img src="/images/caro-vs.jpg" alt="caro fighting" />
              Fighting
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
