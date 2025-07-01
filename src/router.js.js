// router.js
import { createBrowserRouter } from 'react-router-dom';
createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true
  }
});

console.log("Router with v7_startTransition flag is active");

import App from './App';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
    // Add additional routes here as needed
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

export default router;

