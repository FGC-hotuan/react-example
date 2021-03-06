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
import Dropzone from "react-dropzone";
import renderText from "../../../components/common/form/renderText";
import {Link} from "react-router-dom";
import {Editor} from '@tinymce/tinymce-react';


class Form extends Component {

    constructor(props) {
        super(props);

        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    componentDidMount() {
        const modelId = this.props.match.params.id;
        if (!modelId) { // create form
            // tinymce.init({
            //     selector: '#content',
            //     plugins : 'advlist autolink link image lists charmap print preview'
            // });
            return;
        }

        // update form
        ApiService.get('news/' + modelId).then((response) => {
            this.props.initialize(_.get(response, 'data', {}));
            // tinymce.init({
            //     selector: '#content',
            //     plugins : 'advlist autolink link image lists charmap print preview'
            // });
        });
    }

    onHandleSubmit(formProps) {
        const modelId = this.props.match.params.id;

        if (modelId) {
            return ApiService.post('news/' + modelId, formProps).then((response) => {
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

    renderTinyMCE(field) {
        const props = _.assign({}, field, {
            plugins: 'link,image,lists,paste,code,preview'
        });

        return (<Editor {...props} value={props.input.value} onEditorChange={(content) => {
            field.input.onChange(content);
        }} />);
    }

    render() {
        const {handleSubmit, submitting, pristine, match} = this.props;
        const modelId = match.params.id;

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
                                <div className="drop-zone">
                                    <Dropzone
                                        multiple={false}
                                        accept="image/*"
                                        onDrop={(acceptedFiles) => {
                                            let data = new FormData();
                                            data.append('image', acceptedFiles[0]);

                                            ApiService.post('file/upload', data)
                                                .then((response) => {
                                                    this.props.change("image", _.get(response, "data.sortPath"));
                                                    document.getElementById("image-preview").setAttribute("src", _.get(response, "data.fullPath"));
                                                });
                                        }}
                                    >
                                        <div>Try dropping some files here, or click to select files to upload.</div>
                                    </Dropzone>
                                </div>
                                <div className="img-preview">
                                    <img src="http://via.placeholder.com/350x150" alt="" id="image-preview"/>
                                    <Field name="image" component="input" type="hidden"/>
                                </div>
                            </div>

                            <div>
                                <label>Content</label>
                                <div>
                                    {/*<Field*/}
                                    {/*id="content"*/}
                                    {/*name="content"*/}
                                    {/*component="textarea"*/}
                                    {/*className="form-control"*/}
                                    {/*/>*/}
                                </div>
                                <Field
                                    name="content"
                                    component={this.renderTinyMCE}
                                />
                            </div>


                            <div className="box-footer">
                                <div className="col-xs-6">
                                    <div className="form-group">
                                        <Link to={`/news/${modelId}`}>
                                            Cancel
                                        </Link>
                                        {' | '}
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