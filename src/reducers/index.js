import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import AuthReducer from './AuthReducer';
import BannerReducer from './BannerReducer';
import EventsReducer from './EventsReducer';
import LeaderboardReducer from './LeaderboardReducer';
import RegisterReducer from './RegisterReducer';
import UserReducer from './UserReducer';
import PasswordReducer from './passwordReducer';
import ProfileReducer from './ProfileReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    banner: BannerReducer,
    events: EventsReducer,
    leaderboard: LeaderboardReducer,
    register: RegisterReducer,
    user: UserReducer,
    pass: PasswordReducer,
    profile: ProfileReducer,
  });
