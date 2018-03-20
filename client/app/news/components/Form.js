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

import renderText from "../../../components/common/form/renderText";
import renderRadioGroup from "../../../components/common/form/renderRadioGroup";
import renderTextArea from "../../../components/common/form/renderTextArea";

/**
 * Import all constants as an object.
 */
// import Common from '../../constants/common';
import Model from '../../../constants/model';
import ApiService from "../../../services/ApiService";

/**
 * Import all apiAction and crudAction as an object.
 */
// import * as apiAction from '../../actions/apiAction';
// import * as crudAction from '../../actions/crudAction';
// import * as flashMessage  from '../../actions/flashMessage';

// import renderText from '../common/form/renderText';
// import renderTextArea from '../common/form/renderTextArea';
// import renderSelect from '../common/form/renderSelect';
// import renderRadioGroup from '../common/form/renderRadioGroup';

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            model: this.props.match.params.id ? null : {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    componentDidMount() {
        // http request
        //console.log(this.props.match);
        const modelId = this.props.match.params.id;
        if (!modelId) return;

        ApiService.get('product/' + modelId).then((response) => {
            const model = ((response || {}).data || {}).data || null;
            if (model) {
                this.setState({
                    model: model
                });
            }
        });
    }


    // componentWillMount() {
    //     if (this.props.params.id) {
    //         this.props.actions.fetchById(Common.PRODUCT, this.props.params.id);
    //         // Redux form will reinitialize
    //         this.props.initialize();
    //     }
    // }

    // componentWillUnmount() {
    //     this.props.actions.clearSelectedItem(Common.PRODUCT);
    //     this.props.actions.apiClearState();
    // }

    onHandleSubmit(formProps) {
        //console.log(formProps);
        const modelId = this.props.match.params.id;

        // this.props.actions.submitForm(Common.PRODUCT, formProps, this.props.params.id);
        // this.props.actions.submitForm(Common.PRODUCT, this.props.selectedItem.product, this.props.params.id);
        if (modelId) {
            ApiService.put('product/' + modelId, this.state.model).then(function (response) {
                console.log(response);
            });
        } else {
            ApiService.post('product', this.state.model).then(function (response) {
                console.log(response);
            });
        }


    }

    handleChange(event) {
        console.log(event);
        const {name, value} = event.target;
        const model = _.assign({}, this.state.model);
        model[name]=value;
        console.log(name,value,model);
        this.setState({
            model: model
        });
        // var key = event.target.name;
        // var value = event.target.value;
        // this.props.actions.updateSelectedItem(Common.PRODUCT, key, value);
    }

    render() {
        console.log(this.state.model);

        if (!this.state.model)
            return null;

        //console.log(this.state.model);

        const {handleSubmit, submitting, match} = this.props;
        // const status = this.props.selectedItem.product.status || '0';
        const modelId = match.id;

        return (

            <div className="row">
                <div className="col-xs-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">{modelId ? 'Edit Product' : 'Add Product'}</h3>
                        </div>
                        <form className="form-horizontal" onSubmit={handleSubmit(this.onHandleSubmit)}>
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <Field
                                            name="first_name"
                                            component={renderText}
                                            label="first_name"
                                            type="text"
                                            data={this.state.model.first_name}
                                            onChange={this.handleChange}
                                        />
                                        <Field
                                            name="last_name"
                                            component={renderText}
                                            label="last_name"
                                            type="text"
                                            data={this.state.model.last_name}
                                            onChange={this.handleChange}
                                        />
                                        <Field
                                            name="email"
                                            component={renderText}
                                            label="email"
                                            type="text"
                                            data={this.state.model.email}
                                            onChange={this.handleChange}
                                        />

                                        <Field
                                            name="status"
                                            component={renderRadioGroup}
                                            label="Status"
                                            type="radio"
                                            data={this.state.model.status}
                                            onChange={this.handleChange}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="box-footer">
                                <div className="col-xs-6">
                                    <div className="form-group">
                                        <button type="submit"
                                                className="btn btn-primary"
                                                disabled={submitting}>{modelId ? 'Update' : 'Save'}</button>
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
    }
}

/**
 * Map the actions to props.
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(_.assign({}, crudAction, apiAction, flashMessage), dispatch)
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
    form: 'ProductForm', // ←A Unique identifier for this form
    validate: validateForm,  // ←Callback function for client-side validation
    // destroyOnUnmount: true,
    // enableReinitialize: true,
    // keepDirtyOnReinitialize: true
})(Form))