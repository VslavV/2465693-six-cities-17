import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import FavoriteList from '../../components/favorite-component/favorite-list';
import { useAppSelector } from '../../hooks';
import { selectFavorites } from '../../store/favorites/favorite-selector';
import { memo } from 'react';

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(selectFavorites);

  return (
    <div className={classNames('page', { 'page--favorites-empty': !offers.length })}>
      <Helmet>
        <title>6 городов. Избранное</title>
      </Helmet>
      <Header />

      <main className={classNames('page__main', 'page__main--favorites', { 'page__main--favorites-empty': !offers.length })}>
        <div className="page__favorites-container container">
          <section className={classNames('favorites', { 'favorites--empty': !offers.length })}>
            <h1 className={offers.length ? 'favorites__title' : 'visually-hidden'}>
              {offers.length ? 'Saved listing' : 'Favorites (empty)'}
            </h1>
            <FavoriteList offers={offers} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default memo(FavoritesPage);
