import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIssuesIfNeeded } from '../actions/index.js';
import NProgress from 'nprogress';
import CellView from '../components/CellView.js';

class All extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    NProgress.start();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchIssuesIfNeeded('created', 10000));
  }

  render() {
    let showTemplate = () => {
      if (this.props.isFetching) {
        return null;
      }

      NProgress.done();
      return (
        <CellView title="全部" items={this.props.items} />
      );
    }

    return (
      <div className="list">
        {showTemplate()}
      </div>
    );
  }
};

function mapStateToProps(state) {
  const {
    isFetching,
    items
  } = state || {
    isFetching: true,
    items: []
  };

  return {
    isFetching,
    items
  }
}

export default connect(mapStateToProps)(All);
