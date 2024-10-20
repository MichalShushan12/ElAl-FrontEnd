import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  if (error) {
    // Handle the error (e.g., display a custom error message)
    console.error('Error caught by route-level ErrorBoundary:', error);
    // You can render an error page or a fallback UI here
    return (
      <div>
        <h1>Oops! Something went wrong.</h1>
        <p>Error details: {error.message}</p>
      </div>
    );
  }

  // If no error, render the children (routes)
  return <>{/* Your route components go here */}</>;
};

export default ErrorBoundary;

