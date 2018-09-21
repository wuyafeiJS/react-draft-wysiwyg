/* @flow */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Option from "../../../components/Option";
import "./styles.css";

const ClearComponent = ({ config, onChange, translations }) => {
  const { icon, className, title } = config;
  return (
    <div className="rdw-remove-wrapper" aria-label="rdw-remove-control">
      <Option
        className={classNames(className)}
        onClick={onChange}
        title={"清空"}
      >
        清空
      </Option>
    </div>
  );
};

ClearComponent.propTypes = {
  onChange: PropTypes.func,
  config: PropTypes.object,
  translations: PropTypes.object
};

export default ClearComponent;
