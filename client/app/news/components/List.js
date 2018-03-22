import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Table from 'rc-table';
//libraries
import _ from 'lodash';
import ApiService from "../../../services/ApiService";
import ListItem from "./ListItem";
import Paginator from "../../../components/common/Paginator";

/**
 * Import all constants as an object.
 */

class List extends Component {

    constructor(props) {
        super(props);

        this.state = {
            models: null,
            meta: null
        };

        this.fetchNews.bind(this);
    }

    componentDidMount() {
        this.fetchNews();
    }

    fetchNews(params = {}) {
        ApiService.get('news', params).then((response) => {
            console.log(response);
            this.setState({
                models: _.get(response, 'data.data', []),
                meta: {
                    pageCount: Math.ceil(_.get(response, 'data.total', 0) / _.get(response, 'data.per_page', 1)),
                    currentPage: _.get(response, 'data.current_page', 0)
                }
            });
        });
    }

    render() {

        if (!this.state.models) return (
            <h4>Loading...</h4>
        );

        const listNews = this.state.models.map(model => {
            return (<ListItem model={model} key={model.id} />);
        });

        return (
            <div>
                <h3>List news</h3>
                {listNews}
                <div>
                    <Paginator
                        pageCount={this.state.meta.pageCount}
                        onPageChange={(data) => {
                            this.setState({models: null});
                            this.fetchNews({page: data.selected + 1});
                        }}
                        currentPage={this.state.meta.currentPage - 1}
                    />
                </div>
            </div>
        );
    }
}

export default List
