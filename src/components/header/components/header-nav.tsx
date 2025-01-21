import { selectUserInfo } from '../../../store/auth/auth-selector';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { logoutAction } from '../../../store/api-actions';
import { RoutePath } from '../../../const';
import { Link } from 'react-router-dom';
import { selectFavorites } from '../../../store/favorites/favorite-selector';

function HeaderNav (): JSX.Element {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const favoritesCount = useAppSelector(selectFavorites).length;
  const userAvatar = useAppSelector(selectUserInfo)?.avatarUrl;

  const handleSignOutClick = () =>{
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          {userInfo ?
            <Link
              className="header__nav-link header__nav-link--profile"
              to={RoutePath.Favorites}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: `url(${userAvatar})`, borderRadius: '50%'}}/>
              <span className="header__user-name user__name">
                {userInfo?.email}
              </span>
              {userInfo && <span className="header__favorite-count">{favoritesCount}</span>}
            </Link>
            :
            <Link
              className="header__nav-link header__nav-link--profile"
              to={RoutePath.Login}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"/>
              <span className="header__login">Sign in</span>
            </Link>}
        </li>
        <li className="header__nav-item">
          {
            userInfo &&
              <a
                className="header__nav-link"
                onClick={(evt) => {
                  evt.preventDefault();
                  handleSignOutClick();
                }}
              >
                <span className="header__signout">Sign out</span>
              </a>
          }
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
