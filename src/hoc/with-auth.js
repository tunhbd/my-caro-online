import React from 'react';
import { Redirect } from 'react-router-dom';
import { RestClient } from '../rest-client/rest-client';
import { getCookie } from '../utils/cookies';

export const withAuth = async OriginComponent => {
  const client = new RestClient();
  const res = await client.asyncGet('/user/check-authorizated');

  // console.log('res', res);
  console.log('check token', getCookie('token'));

  return function WrappedComponent(props) {
    return res && res.authorizated ? (
      <OriginComponent {...props} />
    ) : (
      <Redirect to="/sign-in" />
    );
  };

  // return class WrappedComponent extends React.Component {
  //     constructor() {}
  //     render() {
  //         return (
  //             {
  //                 this.state.isChecking
  //                     ? <Loading />
  //                     : this.state.authorizated
  //                         ? <OriginComponent {...this.props} />
  //                         : <Redirect to="/sign-in" />
  //             }
  //         );
  //     }
  // }
};
