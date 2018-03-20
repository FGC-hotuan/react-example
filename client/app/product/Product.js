import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import ProductList from "./components/List";
import ProductForm from "./components/Form";
import ProductDetail from "./components/Detail";


class Product extends Component {

    render() {
        return (
            <div>
                <h2>User</h2>
                <section className="content">

                    <Switch>
                        <Route exact path="/product" component={ProductList}/>
                        <Route exact path="/product/create" component={ProductForm}/>
                        <Route exact path="/product/:id/edit" component={ProductForm}/>
                        <Route exact path="/product/:id" component={ProductDetail}/>
                    </Switch>

                </section>
            </div>
        );
    }
}

export default Product;