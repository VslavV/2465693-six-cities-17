import { ChangeEvent, useState } from 'react';
import { FormStateType, Ratings } from '../../types/form-comment';
import FormRating from '../form-rating/form-rating';
import { ComentsLenght } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviewAction } from '../../store/api-actions';
import { selectReviewsPosting } from '../../store/reviews/reviews-selector';

const INITIAL_STATE_FORM: FormStateType = {
  rating: 0,
  comment: '',
};

const RATINGS: Ratings = [
  [5, 'perfect'],
  [4, 'good'],
  [3, 'not bad'],
  [2, 'badly'],
  [1, 'terribly'],
];

type FormCommentProps = {
  offerId: string;
}

function FormComment({offerId}:FormCommentProps):JSX.Element{
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormStateType>(INITIAL_STATE_FORM);
  const isReviewPosting = useAppSelector(selectReviewsPosting);

  const handleFieldChange = ((name: string, value: number | string) =>
    setFormData({...formData, [name]: value}));


  const handleFormSubmit = (evt:ChangeEvent<HTMLFormElement>)=>{
    evt.preventDefault();
    const postFormData = {...formData};
    dispatch(postReviewAction({postFormData, offerId}))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          setFormData({
            comment: '',
            rating: 0
          });
        }
      });
    evt.currentTarget.reset();
  };

  return(
    <form onSubmit={handleFormSubmit} className="reviews__form form" action="#" method="post">
      <label
        className="reviews__label form__label"
        htmlFor="review"
      >
      Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map(([value, title]) => (
          <FormRating key={value} value={value} title={title} handleFieldChange={handleFieldChange} currentRating={formData.rating}/>
        )
        )}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(({currentTarget}) => {
          handleFieldChange(currentTarget.name, currentTarget.value);
        })}
        value={formData.comment}
        disabled={isReviewPosting}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            formData.comment.length <= ComentsLenght.MIN || formData.comment.length >= ComentsLenght.MAX || !formData.rating || isReviewPosting
          }
        >
          {isReviewPosting ? 'Submitting' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default FormComment;
