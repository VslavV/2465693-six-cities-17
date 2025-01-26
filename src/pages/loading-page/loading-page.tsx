import '../../pages/loading-page/loading-page.css';

function LoadingPage (): JSX.Element{
  return (
    <div className="loader-container" data-testid='loading-page-container'>
      <div className="custom-loader"></div>
    </div>
  );
}

export default LoadingPage;

