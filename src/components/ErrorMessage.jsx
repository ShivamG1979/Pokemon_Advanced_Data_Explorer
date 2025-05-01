// src/components/ErrorMessage.jsx
function ErrorMessage({ message }) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{message}</p>
        <hr />
        <p className="mb-0">Please try refreshing the page or come back later.</p>
      </div>
    );
  }
  
  export default ErrorMessage;