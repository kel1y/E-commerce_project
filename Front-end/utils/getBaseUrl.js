const extractRoute = (fullRoute) => {
    if (fullRoute === '/dashboard') return '/dashboard';
    const splitRoutes = fullRoute.split('/');
    return splitRoutes.slice(0, 3).join('/');
  };
  export default extractRoute;