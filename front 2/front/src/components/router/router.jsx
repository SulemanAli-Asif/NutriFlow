// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import UserInterface from '../page/UserInterface';
import Pricing from '../page/Pricing';
import Signup from '../page/Signup';
import Login from '../page/Login';
import RequireAuth from '../page/RequiredAuth';
import About from '../page/About';
import Contact from '../page/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/user-interface',
    element: (
      <RequireAuth>
        <UserInterface />
      </RequireAuth>
    ),
  },
  {
    path: '/pricing',
    element: <Pricing />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
]);

export default router;
