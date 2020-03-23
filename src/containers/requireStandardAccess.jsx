import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { notify } from '../utils';

import { verifyToken } from '../actions/authActions';

const withStandardAccess = Component => props => {
  useEffect(() => {
    if (props.accountType === 'RESTRICTED') {
      props.redirectHome();
    }
  }, []);

  // TODO: Make redirecting screen and return that if not authenticated.
  return <Component {...props} />;
};

const mapStateToProps = state => ({
  accountType: state.user.profile.accountType,
});

const mapDispatchToProps = dispatch => ({
  redirectHome: () => {
    notify("You need to verify your email first before accessing the ACM Store!");
    dispatch(replace('/'));
  }
});
const requireStandardAccess = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStandardAccess
)

export default requireStandardAccess;
