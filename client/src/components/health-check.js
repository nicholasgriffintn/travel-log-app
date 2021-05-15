import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHealth } from '../store/actions/basic';

class HealthCheck extends Component {
  static propTypes = {
    getHealth: PropTypes.func.isRequired,
    health: PropTypes.object.isRequired,
  };

  static defaultProps = {
    health: {},
  };

  componentWillMount() {
    this.props.getHealth();
  }

  render() {
    return (
      <div>
        {this.props.health ? (
          <>
            <h2>Health Check Result:</h2>
            <br></br>
            <strong>
              {this.props.health.status} - {this.props.health.message}
            </strong>
          </>
        ) : (
          <h2>Waiting for health check response....</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  health: state.basic,
});

const dispatchToProps = (dispatch) => ({
  getHealth: () => dispatch(getHealth()),
});

export default connect(mapStateToProps, dispatchToProps)(HealthCheck);
