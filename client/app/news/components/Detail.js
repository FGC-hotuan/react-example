import React, {Component} from 'react';

import Moment from 'moment';
import _ from 'lodash';
import ApiService from "../../../services/ApiService";


class Detail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            model: null
        };
    }

    componentDidMount() {
        const newsId = _.get(this.props, 'match.params.id', null);
        if (!newsId) return;

        ApiService.get('news/' + newsId).then((response) => {
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
            </div>
        );
    }
}

export default Detail
