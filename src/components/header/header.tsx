
import HeaderLogo from '../header-logo/header-logo';
import HeaderNav from '../header-nav/header-nav';
import { memo } from 'react';

function Header():JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo/>
          <HeaderNav/>
        </div>
      </div>
    </header>
  );
}
export default memo(Header);
