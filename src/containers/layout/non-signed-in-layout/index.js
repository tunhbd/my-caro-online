import React from 'react';

class NonSignedInLayout extends React.Component {
  render() {
    return <div className="non-signed-in-layout">{this.children}</div>;
  }
}
