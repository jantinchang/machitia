import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class PleaseConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
    };
  }

  componentDidMount() {}

  render() {
    const background = require("../../assets/images/auth-layer.png");

    return (
      <div>
        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="authentication-main">
              <div className="row">
                <div className="col-md-4 p-0">
                  <div
                    className="auth-innerleft"
                    style={{ backgroundImage: "url(" + background + ")" }}
                  >
                    <div className="text-center">
                      <img
                        src={require("../../assets/images/machitia_logo.png")}
                        className="logo-login"
                        alt=""
                      />
                      <hr />
                    </div>
                  </div>
                </div>

                <div className="col-md-8 p-0">
                  <div className="auth-innerright">
                    <div className="custom-card card">
                      <h4>Please Confirm Your Email</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PleaseConfirm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(PleaseConfirm);
