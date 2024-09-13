import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Helper function to mimic withRouter for class components in React Router v6
export function withRouter(Component) {
  function ComponentWithRouterProps(props) {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <Component
        {...props}
        router={{ params, navigate, location }}
      />
    );
  }

  return ComponentWithRouterProps;
}
