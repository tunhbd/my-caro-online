import React from 'react';

export default class ErrorLabel extends React.Component {
  render() {
    return (
      <div className="error-label" style={{ color: '#f5222d', padding: '5px' }}>
        {this.props.message}
      </div>
    );
  }
}
