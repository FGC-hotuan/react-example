import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import NewsList from "./components/List";
import NewsForm from "./components/Form";
import NewsDetail from "./components/Detail";


class News extends Component {

    render() {
        const {match} = this.props;
        return (
            <div>
                <h2>News</h2>
                <section className="content">

                    <Switch>
                        <Route exact path={match.path} component={NewsList}/>
                        <Route exact path={`${match.path}/create`} component={NewsForm}/>
                        <Route exact path={`${match.path}/:id/edit`} component={NewsForm}/>
                        <Route exact path={`${match.path}/:id`} component={NewsDetail}/>
                    </Switch>

                </section>
            </div>
        );
    }
}

export default News;