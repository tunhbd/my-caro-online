import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { Button } from 'antd';

import { authActions } from '../../../actions';
import { DEFAULT_AVATAR } from '../../../contants';
import './signed-in-layout.styles.css';

class Layout extends React.Component {
  constructor() {
    super();

    this.onClickSignOut = this.onClickSignOut.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchProfile();
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
            {this.props.children}
          </div>
        </div>
        <div className="signed-in-layout__right-section">
          <div className="signed-in-layout__right-section__user-menu">
            <div className="signed-in-layout__right-section__user-menu__avatar">
              <img
                src={get(profile, ['avatar'], DEFAULT_AVATAR) || DEFAULT_AVATAR}
                alt="user avatar"
              />
            </div>
            <div className="signed-in-layout__right-section__user-menu__name">
              {get(profile, ['display_name'], 'Your name')}
            </div>
            <ul className="signed-in-layout__right-section__user-menu__menu">
              <li className="signed-in-layout__right-section__user-menu__menu__item">
                <Link to="/">
                  <Button type="primary">Home</Button>
                </Link>
              </li>
              <li className="signed-in-layout__right-section__user-menu__menu__item">
                <Link to="/profile">
                  <Button type="primary">My profile</Button>
                </Link>
              </li>
              <li className="signed-in-layout__right-section__user-menu__menu__item">
                <Link to="/sign-out" onClick={this.onClickSignOut}>
                  <Button type="danger">Sign out</Button>
                </Link>
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
        signOut: authActions.signOut,
        fetchProfile: authActions.fetchProfile
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
