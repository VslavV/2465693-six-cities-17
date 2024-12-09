import classNames from 'classnames';
import { Link } from 'react-router-dom';

type CityPropsType = {
  name: string;
  isActiveCity: boolean;
};

function City(CityProps: CityPropsType): JSX.Element {
  const { name, isActiveCity } = CityProps;
  const linkClass = classNames('locations__item-link', 'tabs__item', { 'tabs__item--active': isActiveCity });

  return (
    <li className="locations__item">
      {/* поправить ссылку */}
      <Link className={linkClass} to=''>
        <span>{name}</span>
      </Link>
    </li>
  );
}

export default City;
