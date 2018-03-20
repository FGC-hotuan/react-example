import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class FlashMessage extends Component {

    render() {

        const type = this.props.message.type;
        const text = this.props.message.text;

        if(!text){
            return null;
        }
        return (
            <div className={classnames('alert', {
                'alert-success': type === 'success',
                'alert-danger': type === 'error',
                'alert-warning': type === 'warning',
                'alert-info': type === 'info'
            })}>
                {text}
            </div>
        );
    }
}

FlashMessage.propTypes = {
    message: PropTypes.object.isRequired
};

export default FlashMessage;