type CityOffersEmptyProps = {
  cityName: string;
};

function CityOffersEmpty({cityName}:CityOffersEmptyProps): JSX.Element {
  return (
    <>
      <section className="cities__no-places" data-testid='city-offer-empty'>
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description" data-testid=''>
                      We could not find any property available at the moment in {cityName}
          </p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </>
  );
}

export default CityOffersEmpty;
