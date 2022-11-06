import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import Register from './pages/auth/Register';
import Login from './pages/auth/LogIn';
import dashboard from './pages/dashboard';
import Home from './pages/Homoe';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';

import NewCustomer from './pages/customer/NewCustomer';
import CompanyInfo from './pages/CompanyInfo'
import BookingPayment from './pages/booking/BookingPayment'
import CreateBooking from './pages/booking/createBooking'
import Test from './pages/test';

import Orders from './pages/order/Orders';
// import Pricing from './pages/pricing';
import NotFound from './pages/NotFound'

// import Test from './pages/test'

import PrivateRoute from './components/routing/PrivateRoute';
import theme from './theme';
// import history from './store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './store';
import { Provider } from 'react-redux';
import {persistor,store} from './store'
import Notification from './pages/Notification';

function App() {
	return (
		<div className='App'>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
        <PersistGate persistor={persistor} />
          <Switch>
            <Route exact path='/' component={Home}></Route>
            {/* <Route exact path='/pricing' component={Pricing}></Route> */}
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/forgot' component={Forgot}></Route>
            <Route exact path='/reset' component={Reset}></Route>
            <Route exact path='/test' component={Test}></Route>

            <PrivateRoute exact path='/dashboard' component={dashboard}></PrivateRoute>
            <PrivateRoute exact path='/newcustomer' component={NewCustomer}></PrivateRoute>

            <PrivateRoute exact path='/orders' component={Orders}></PrivateRoute>
            <PrivateRoute exact path='/bookingPayment' component={BookingPayment}></PrivateRoute>
            <PrivateRoute exact path='/createBooking' component={CreateBooking}></PrivateRoute>
            <PrivateRoute exact path='/notifications' component={Notification}></PrivateRoute>

            <PrivateRoute exact path='/companyInfo' component={CompanyInfo}></PrivateRoute>

            <Route component={NotFound} />
          </Switch>
        </Router>
        </ThemeProvider>
      </Provider>
      <ToastContainer autoClose={2000} />
		</div>
	);
}

export default App;