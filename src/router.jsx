import { createBrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout'
import Contact from './pages/Contact'
import About from './pages/About'
import HomePage from './pages/HomePage'
import Cart from './pages/Cart'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import UpdatePassword from './components/UpdatePassword'
import Destinations from './components/Destinations'
import Orders from './components/Orders'
import Payment from './pages/Payment'
import ShoppingCartIcon from './pages/ShoppingCartIcon'
import Continents from './components/Continents'
import Asia from './Continents/Asia'
import Africa from './Continents/Africa'
import SouthAmerica from './Continents/SouthAmerica'
import NorthAmerica from './Continents/NorthAmerica'
import Europe from './Continents/Europe'

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/about", element: <About /> },
          { path: "/contact", element: <Contact /> },
          { path: "/destinations", element: <Destinations /> },
          { path: "/continents", element: <Continents /> },

          {
            path: "/continents",
            children: [
              { path: "/continents/asia", element: <Asia /> },
              { path: "/continents/africa", element: <Africa /> },
              { path: "/continents/southAmerica", element: <SouthAmerica /> },
              { path: "/continents/northAmerica", element: <NorthAmerica /> },
              { path: "/continents/europe", element: <Europe /> },
            ],
          },
          
          { path: "/orders", element: <Orders /> },
          { path: "/payment", element: <Payment /> },
          { path: "/shoppingCartIcon", element: <ShoppingCartIcon/>},  

          {
            path: "/auth",
            children: [
              { index: true, element: <SignIn /> },
              { path: "update-password", element: <UpdatePassword /> },
              { path: "signup", element: <SignUp /> },
              { path: "orders", element: <SignUp /> },
            ],
          },
        ],
      },
    ]);
    

export default router;




