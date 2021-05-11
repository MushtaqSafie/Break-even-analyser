import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { StoreProvider } from "./utils/GlobalState";
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import NoMatch from "./pages/NoMatch"
import ProductInformation from "./pages/ProductInformation";

function App() {
  return (
    <Router>
      <div>
        {/* <StoreProvider> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/productInformation" component={ProductInformation} />
            <Route component={NoMatch} />
          </Switch>
        {/* </StoreProvider> */}
      </div>
    </Router>
  );
}

export default App;
