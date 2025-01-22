
import classNames from 'classnames';
import { AuthorizationStatus, BookmarkButtonSize, RoutePath} from '../../const';
import { useAppDispatch, useAppSelector} from '../../hooks';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { selectAuthorizationStatus } from '../../store/auth/auth-selector';
import { useMemo } from 'react';
import { redirectToRoute } from '../../store/action';
import { memo } from 'react';

type BookmarkButtonProps = {
  isFavorite: boolean;
  offerId: string;
  pageType: 'place-card' | 'offer';
}

function BookmarkButton ({isFavorite, offerId, pageType}:BookmarkButtonProps):JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isAuthorized = useMemo(()=>authorizationStatus === AuthorizationStatus.Auth, [authorizationStatus]);
  const buttonClass = classNames(`${pageType}__bookmark-button`, {[`${pageType}__bookmark-button--active`]:isFavorite && isAuthorized }, 'button');

  const handleBookmarButtonClick = ()=> {
    if (isAuthorized) {
      dispatch(changeFavoriteStatusAction(
        {
          status: Number(!isFavorite),
          offerId: offerId
        }
      ));
    } else {
      dispatch(redirectToRoute(RoutePath.Login));
    }
  };

  return (
    <button className={buttonClass} type="button"
      onClick={handleBookmarButtonClick}
    >
      <svg className={`${pageType}__bookmark-icon`} width={BookmarkButtonSize[pageType].width} height={BookmarkButtonSize[pageType].height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">${isFavorite ? 'In Bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default memo(BookmarkButton);
