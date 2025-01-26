import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import RandomCity from '../../components/random-city/random-city';
import LoginForm from '../../components/login-form/login-form';

function LoginPage(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 городов. Добро пожаловать!</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm/>
          <RandomCity/>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
