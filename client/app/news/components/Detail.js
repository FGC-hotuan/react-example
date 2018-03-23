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
            const model = _.get(response, 'data', {});
            this.setState({
                model: model
            });
            document.title = model.title;
        });
    }

    render() {
        const {model} = this.state;

        if (!model) return (
            <h4>Loading...</h4>
        );

        return (
            <div>
                <ul className="breadcrumb">
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                </ul>
                <div className="news details">
                    <h3 className="news-title">{model.title}</h3>
                    <div className="news-image">
                        <img src={model.image_url} alt={model.title}/>
                    </div>
                    <div className="news-content">
                        <div dangerouslySetInnerHTML={{__html: model.content}}/>
                    </div>

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
            </div>
        );
    }
}

export default Detail
