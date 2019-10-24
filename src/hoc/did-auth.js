import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { get } from 'lodash';
// import { RestClient } from '../rest-client/rest-client';
// import { getCookie } from '../utils/cookies';

export const didAuth = async (OriginComponent, redirectUrl) => {
  class WrappedComponent extends React.Component {
    render() {
      const { token } = this.props;

      return !token ? (
        <OriginComponent {...this.props} />
      ) : (
        <Redirect to={redirectUrl} />
      );
    }
  }

  const mapStateToProps = state => ({
    token: get(state, ['authReducer', 'token'])
  });

  return connect(
    mapStateToProps,
    null
  )(WrappedComponent);
};
