import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';

import { authActions } from '../../../actions';
import './signed-in-layout.styles.css';

class Layout extends React.Component {
  constructor() {
    super();

    this.onClickSignOut = this.onClickSignOut.bind(this);
  }

  onClickSignOut(e) {
    e.preventDefault();

    this.props.actions.signOut();
  }

  render() {
    const { profile } = this.props;

    return (
      <div className="signed-in-layout">
        <div className="signed-in-layout__left-section">
          <div className="signed-in-layout__left-section__content">
            {this.children}
          </div>
        </div>
        <div className="signed-in-layout__right-section">
          <div className="signed-in-layout__right-section__user-menu">
            <div className="signed-in-layout__right-section__user-menu__avatar">
              <img src={profile.avatar} alt="user avatar" />
            </div>
            <ul className="signed-in-layout__right-section__user-menu__menu">
              <li>
                <a href="/profile">My profile</a>
              </li>
              <li>
                <a href="/sign-out" onClick={this.onClickSignOut}>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: get(state, ['authReducer', 'profile'])
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        signOut: authActions.signOut
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
