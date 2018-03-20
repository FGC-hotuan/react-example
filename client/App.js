import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import {getToken} from './utils/actionUtil'

import ReduxToastr from 'react-redux-toastr'

import NotFoundPage from "./components/error/notFound";
import LoginForm from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import User from './app/user/User'
import Product from "./app/product/Product";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            getToken() ?
                (<Component {...props} />)
                : (<Redirect to={{pathname: "/login", state: {from: props.location}}} />)
        }
    />
);

class App extends Component {
    render() {
        return (
            <BrowserRouter basename="/#">
                <div>
                    <Switch>
                        <Route exact path="/login" component={LoginForm}/>

                        <PrivateRoute exact path="/" component={Dashboard}/>
                        <PrivateRoute path="/user" component={User} />
                        <PrivateRoute path="/product" component={Product} />
                        {/*<Route exact path='/' component={RequireAuth(Dashboard)} />*/}
                        {/*<Route exact path='/' component={Dashboard} />*/}
                        {/*<Route path="/products" component={RequireAuth(Product)}>*/}
                        {/*<IndexRoute component={ProductList}/>*/}
                        {/*<Route path="new" component={ProductForm}/>*/}
                        {/*<Route path=":id" component={ProductForm}/>*/}
                        {/*<Route path=":id/view" component={ProductDetail}/>*/}
                        {/*</Route>*/}
                        {/*</Route>*/}
                        {/*<PrivateRoute exact path="/" component={Dashboard}/>*/}

                        <Route path="*" component={NotFoundPage}/>
                    </Switch>
                    <ReduxToastr
                        timeOut={4000}
                        newestOnTop={false}
                        preventDuplicates
                        position="top-left"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App