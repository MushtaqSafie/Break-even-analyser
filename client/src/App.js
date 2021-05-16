import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StoreProvider } from "./utils/GlobalState";
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import NoMatch from "./pages/NoMatch"
import AuthRoute from "./utils/auth"
import ProductInformation from "./pages/ProductInformation";
import FixedCosts from "./pages/FixedCosts";
import MaterialCosts from "./pages/MaterialCosts";
import CVPanalysis from "./pages/CVPanalysis";

function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <AuthRoute exact path='/productInformation' component={ProductInformation} />
            <AuthRoute exact path='/fixedCosts' component={FixedCosts} />
            <AuthRoute exact path='/materialCosts' component={MaterialCosts} />
            <AuthRoute exact path='/CVPanalysis' component={CVPanalysis} />
            <Route component={NoMatch} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
