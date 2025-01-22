import classNames from 'classnames';
import { selectCity, selectCurrentSort } from '../../store/app/app-selector';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentSort } from '../../store/app/app-slice';
import { useEffect, useRef, useState, memo } from 'react';
import { SortOption } from '../../const';

function Sorting ():JSX.Element {
  const [isSortingListOpen, setIsSortingListOpen] = useState(false);
  const sortingListClass = classNames('places__options places__options--custom', isSortingListOpen && 'places__options--opened');

  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(selectCurrentSort);
  const currentCity = useAppSelector(selectCity);

  const sortSpanRef = useRef<HTMLElement>(null);

  useEffect(() => (
    () => {
      dispatch(setCurrentSort(SortOption.Popular));
    }
  ), [currentCity, dispatch]);

  useEffect(()=> {
    const hideSortList = (evt: MouseEvent) => {
      if (evt.target instanceof HTMLElement && sortSpanRef.current && !sortSpanRef.current.contains(evt.target)) {
        setIsSortingListOpen(false);
      }
    };

    document.addEventListener('click', hideSortList);

    return () => {
      document.removeEventListener('click', hideSortList);
    };
  }, []);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={()=> setIsSortingListOpen(!isSortingListOpen)}
        ref={sortSpanRef}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={sortingListClass}>
        {Object.values(SortOption).map((item) => (
          <li
            key={item}
            className={classNames('places__option ', {'places__option--active': item === currentSort})}
            tabIndex={0}
            onClick={()=> {
              setIsSortingListOpen(!isSortingListOpen);
              dispatch(setCurrentSort(item));
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default memo(Sorting);
