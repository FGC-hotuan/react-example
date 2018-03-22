import React, {Component} from 'react';

import Moment from 'moment';
import _ from 'lodash';
import ApiService from "../../../services/ApiService";
import {Link} from "react-router-dom";


class Detail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            model: null
        };
    }

    componentDidMount() {
        const modelId = _.get(this.props, 'match.params.id', null);
        if (!modelId) return;

        ApiService.get('news/' + modelId).then((response) => {
            console.log(response);
            this.setState({
                model: _.get(response, 'data', {})
            });
        });
    }

    render() {
        const {model} = this.state;

        if (!model) return (
            <h4>Loading...</h4>
        );

        return (
            <div>
                <h3>{model.title}</h3>
                <div>{model.content}</div>
                <p>{model.created_at}</p>
                <p>{Moment(model.created_at).format('DD/MM/YYYY hh:ss')}</p>
                <hr/>
                <p>
                    <Link to={`/news/${model.id}/edit`} className="btn btn-primary">
                        Edit
                    </Link>
                    {' | '}
                    <button onClick={() => {
                        if (confirm('Are you sure want to delete this news?')) {
                            ApiService.delete(`/news/${model.id}`).then((response) => {
                                if (_.get(response, 'data.status') === "success") {
                                    this.props.history.push('/news');
                                }
                            });
                        }
                    }}>
                        Delete
                    </button>
                </p>
            </div>
        );
    }
}

export default Detail
