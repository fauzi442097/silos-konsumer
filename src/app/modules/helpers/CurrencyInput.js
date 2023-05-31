import React, { Component } from 'react';

class CurrencyInput extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      init: "",
      DECIMAL_SEPARATOR: "",
      THOUSANDS_SEPARATOR: ".",
      FRACTION_SIZE: "2",
      PADDING: "0000000"
    };
    this.handleKeyDownEvent = this.handleKeyDownEvent.bind(this);
  }
  componentWillMount() {
    this.setState({ DECIMAL_SEPARATOR: this.props.decimal_separator || "." });
    this.setState({ THOUSANDS_SEPARATOR: this.props.thousands_separator || "," });
    this.setState({ FRACTION_SIZE: this.props.fractionSize || 2 });
    if (this.props.data) {
      this.setState({ value: this.props.data.split(this.props.decimal_separator).join("") });
      this.setState({ init: this.props.data });
    }
    else
      this.setState({ init: "0" + this.props.decimal_separator + this.state.PADDING.substring(0, this.props.fractionSize) })
  }
  shouldComponentUpdate() {
    return true;
  }
  handleKeyDownEvent(event) {
    // console.log(event.key);
    event.preventDefault();
    let value = this.state.value;
    let parsedValue = "";
    if (event['key'].match(/[0-9]/g) && value.length < 16) {
      value += event['key'];
      parsedValue = this.parse(parseInt(value));
      this.setState({ init: parsedValue });
      this.setState({ value });
    }
    else if (event['keyCode'] === 8) {
      value = value.slice(0, -1);
      parsedValue = value ? this.parse(parseInt(value)) : "0" ;
      this.setState({ init: parsedValue });
      this.setState({ value });
    }
  }
  parse(value) {
    let integer = value.toString();
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.state.THOUSANDS_SEPARATOR) || "0";

    return integer;
  }
  render() {
    return (
      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-primary block w-full p-2.5 dark:bg-dark-depth2" value={this.state.init} onKeyDown={this.handleKeyDownEvent} onBlur={() => this.props.onValueUpdate(this.state.init)} />
    );
  }
}
export default CurrencyInput;