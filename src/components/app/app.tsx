import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  offerCardsCount: number;
};

function App({ offerCardsCount }: AppScreenProps): JSX.Element {
  return <MainScreen offerCardsCount={offerCardsCount} />;
}

export default App;
