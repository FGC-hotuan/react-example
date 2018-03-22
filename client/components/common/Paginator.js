import React from 'react';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';

class Paginator extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
		return (
			<ReactPaginate
				previousLabel={<span className="glyphicon glyphicon-chevron-left"></span>}
				nextLabel={<span className="glyphicon glyphicon-chevron-right"></span>}
				breakLabel={<a href="">...</a>}
				breakClassName={"break-me"}
				pageCount={this.props.pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={this.props.onPageChange}
				containerClassName={"pagination"}
				subContainerClassName={"pages pagination"}
				activeClassName={"active"}
                initialPage={_.get(this.props, 'currentPage', 0)}
                disableInitialCallback={true}
			/>
		);
	}
}

export default Paginator;
