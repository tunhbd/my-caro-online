import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import './play-layout.styles.css';

class PlayLayout extends React.Component {
  render() {
    return (
      <div className="play-layout">
        <div className="play-layout__content">
          <Link to="/" className="play-layout__content__back-home-button">
            <Button type="primary">Home</Button>
          </Link>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PlayLayout;
