import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { setCity } from '../../store/app/app-slice';
import { MouseEvent, useCallback, memo } from 'react';

type CityProps = {
  name: string;
  isActiveCity: boolean;
};

function City({ name, isActiveCity}: CityProps): JSX.Element {
  const dispatch = useAppDispatch();
  const linkClass = classNames('locations__item-link', 'tabs__item', { 'tabs__item--active': isActiveCity });
  const handleCityClick = useCallback((evt : MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setCity(name));
  },[name,dispatch]
  );

  return (
    <li className="locations__item">
      <a
        className={linkClass}
        onClick={handleCityClick}
      >
        <span>{name}</span>
      </a>
    </li>
  );
}
export default memo(City);
