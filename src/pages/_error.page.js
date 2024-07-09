import Error from 'next/error';
import { ErrorMessage } from '~/components/atoms';

function ErrorPage({ statusCode }) {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <ErrorMessage errorText="Something went wrong. Please reload the page." />
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
