import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { FormEvent, useRef } from 'react';
import { loginAction } from '../../store/api-actions';
import { RoutePath } from '../../const';

function LoginForm(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmitLogin = (evt:FormEvent<HTMLFormElement>)=>{
    evt.preventDefault();
    if (emailRef.current && passwordRef.current) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            navigate(RoutePath.Index);
          }
        });
    }
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" action="#" method="post" onSubmit={handleSubmitLogin}>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            ref={emailRef}
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            ref={passwordRef}
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            pattern='^.*(?=.*[a-zA-Z])(?=.*\d).*$'
            title='Пароль должен содержать как минимум 1 букву и 1 цифру'
            required
          />
        </div>
        <button
          className="login__submit form__submit button"
          type="submit"
        >
                Sign in
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
