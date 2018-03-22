import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types'

//libraries
import _ from 'lodash';

import * as apiAction from '../../../actions/apiAction';
import * as crudAction from '../../../actions/crudAction';
import * as flashMessage from '../../../actions/flashMessage';
import * as newsAction from '../meta/action';

import ApiService from "../../../services/ApiService";


class Form extends Component {

    constructor(props) {
        super(props);

        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    componentDidMount() {
        const modelId = this.props.match.params.id;
        if (!modelId) return;

        ApiService.get('news/' + modelId).then((response) => {
            this.props.initialize(_.get(response, 'data', {}));
        });
    }

    onHandleSubmit(formProps) {
        const modelId = this.props.match.params.id;

        // this.props.actions.submitForm(Common.PRODUCT, formProps, this.props.params.id);
        // this.props.actions.submitForm(Common.PRODUCT, this.props.selectedItem.product, this.props.params.id);
        if (modelId) {
            return ApiService.post('news/' + modelId, formProps).then((response) => {
                console.log(response);
                if (_.get(response, 'data.status') === "success") {
                    this.props.history.push('/news/' + modelId);
                }
            });
        } else {
            return ApiService.post('news', formProps).then((response) => {
                if (_.get(response, 'data.status') === "success") {
                    this.props.history.push('/news/' + response.data.model.id);
                }
            });
        }
    }

    render() {
        const {handleSubmit, submitting, pristine, match} = this.props;
        const modelId = match.id;

        return (
            <div className="row">


                <div className="col-xs-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">{modelId ? 'Edit Product' : 'Add Product'}</h3>
                        </div>
                        <form className="form-horizontal" onSubmit={handleSubmit(this.onHandleSubmit)}>

                            <div>
                                <label>Title</label>
                                <div>
                                    <Field
                                        name="title"
                                        component="input"
                                        placeholder="Title"
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div>
                                <label>Content</label>
                                <div>
                                    <Field
                                        name="content"
                                        component="textarea"
                                        className="form-control"
                                    />
                                </div>
                            </div>


                            <div className="box-footer">
                                <div className="col-xs-6">
                                    <div className="form-group">
                                        <button type="submit"
                                                className="btn btn-primary"
                                                disabled={submitting || pristine}>{modelId ? 'Update' : 'Save'}</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

/**
 * Map the state to props.
 */
function mapStateToProps(state) {
    return {
        // selectedItem: state.crud.selectedItem,
        // initialValues: state.crud.selectedItem.product,
        // apiState: state.api,
        // message: state.flash.message
        //initialValues: state.news.data
        //initialValues: {title: "abcd"}
    }
}

/**
 * Map the actions to props.
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(_.assign({}, crudAction, apiAction, flashMessage, newsAction), dispatch)
    }
}

const validateForm = values => {
    const errors = {};
    // if (!values.code) {
    //     errors.code = '(This field is required.)'
    // }
    // if (!values.name) {
    //     errors.name = '(This field is required.)'
    // }
    // if (!values.vendor) {
    //     errors.vendor = '(This field is required.)'
    // }
    // if (!values.status) {
    //     errors.status = '(This field is required.)'
    // }
    return errors
};

/**
 * Connect the component to the Redux store.
 */

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'NewsForm',
    //enableReinitialize: true,
    validate: validateForm,
    // destroyOnUnmount: true,
    // enableReinitialize: true,
    // keepDirtyOnReinitialize: true
})(Form))