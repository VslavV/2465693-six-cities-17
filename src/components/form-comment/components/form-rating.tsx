type FormRatingType = {
  value: number;
  title: string;
  handleFieldChange: (name: string, value: number) => void;
  currentRating: number;
}

function FormRating({value, title, handleFieldChange: handleFieldChange, currentRating}: FormRatingType):JSX.Element {

  return(
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        onChange={({currentTarget}) => handleFieldChange(currentTarget.name, value)}
        checked={value === currentRating}
      />
      <label
        htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}

export default FormRating;
