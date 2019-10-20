import React from 'react';
import { Redirect } from 'react-router-dom';
import { RestClient } from '../rest-client/rest-client';

export const withAuth = async OriginComponent => {
  // console.log('res', res);

  // if (res && res.authorizated) {
  //     return function WrappedComponent(props) {
  //         return <OriginComponent {...props} />
  //     }
  // }

  // return <Redirect to="/sign-in" />
  class WrappedComponent extends React.Component {
    componentDidMount() {
      this.actions.checkAuthorizatedUser();
    }

    render() {
      // const {}
      // return (
      //     {
      //         this.state.isChecking
      //             ? <Loading />
      //             : this.state.authorizated
      //                 ? <OriginComponent {...this.props} />
      //                 : <Redirect to="/sign-in" />
      //     }
      // );
      return null;
    }
  }
};
