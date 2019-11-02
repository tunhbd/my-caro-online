import React from 'react';
import './non-signed-in-layout.styles.css';

class NonSignedInLayout extends React.Component {
  render() {
    return <div className="non-signed-in-layout">{this.props.children}</div>;
  }
}

export default NonSignedInLayout;
