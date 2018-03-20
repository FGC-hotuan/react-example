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
            this.setState({
                models: _.get(response, 'data.data', []),
                meta: _.get(response, 'data.meta', {})
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
                        pageCount={this.state.meta.pagination.total_pages}
                        onPageChange={(data) => {
                            this.fetchNews({page: data.selected});
                        }}/>
                </div>
            </div>
        );
    }
}

export default List
