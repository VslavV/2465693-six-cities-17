function FavoriteEmpty(): JSX.Element {
  return (
    <div className="favorites__status-wrapper" data-testid='favorite-empty'>
      <b className="favorites__status">Nothing yet saved.</b>
      <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
    </div>
  );
}

export default FavoriteEmpty;
