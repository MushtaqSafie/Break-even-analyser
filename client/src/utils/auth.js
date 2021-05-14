import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router'
import { useStoreContext } from "./GlobalState";


const AuthRoute = ({ component: Component, ...rest }) => {
  const [state, dispatch] = useStoreContext();
  return (
    <Route {...rest} render={(props) => (
      state.isAuthenticated
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
  )  
}

export default AuthRoute;