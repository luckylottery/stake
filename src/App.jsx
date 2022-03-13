import React from "react";
import { Provider } from 'react-redux';
import store from "./redux/sotre";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainLayout from "./layout/MainLayout";
import { Web3ContextProvider } from './hooks/web3Context';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Web3ContextProvider>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" component={MainLayout} />
            <Redirect to="/" />
          </Switch>
        </Router>
        <ToastContainer />
      </Provider>
    </Web3ContextProvider>
  );

}
export default App;
