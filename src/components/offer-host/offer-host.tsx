import classNames from 'classnames';
import { HostType } from '../../types/offer';

type OfferHostProps = {
  host: HostType;
  description: string;
}

function OfferHost({host, description} :OfferHostProps):JSX.Element {
  const {name, avatarUrl, isPro} = host;
  const avatarClass = classNames('offer__avatar-wrapper', {'offer__avatar-wrapper--pro':isPro}, 'user__avatar-wrapper');

  return (
    <div className="offer__host" data-testid='offer-host-container'>
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className={avatarClass}>
          <img
            className="offer__avatar user__avatar"
            src={avatarUrl}
            width="74"
            height="74"
            alt="Host avatar"
          />
        </div>
        <span className="offer__user-name">{name}</span>
        {isPro ? <span className="offer__user-status">Pro</span> : ''}
      </div>
      <div className="offer__description">
        <p className="offer__text">
          {description}
        </p>
      </div>
    </div>
  );
}

export default OfferHost;
