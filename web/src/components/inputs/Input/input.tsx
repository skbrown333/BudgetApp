import React from "react";

/* Styles */
import "./_input.scss";

export default class InputComponent extends React.Component<any, any> {
  render() {
    const { header, type, placeholder, onChange, error } = this.props;

    return (
      <div className="input">
        <div className="input--header">{header}</div>
        <input
          className="input--field"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
        { error ? <div></div> : null }
      </div>
    );
  }
}
