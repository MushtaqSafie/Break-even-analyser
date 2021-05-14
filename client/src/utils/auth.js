import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router'


const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    true
      ? <Component {...props} />
      : <Redirect to='/signin' />
  )} />
)

export default AuthRoute;