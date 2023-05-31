import React, { Component } from 'react';
import CurrencyInput from '@/app/modules/helpers/CurrencyInput';

// const darkMode = theme == 'light' ? {
//     'boxShadow' : '#c7cdc969 3px 0px 25px 0px'
// } : {}

class Currency extends Component {

    constructor() {
        super();
        this.state = { currency: "0" };
        this.currencyUpdate = this.currencyUpdate.bind(this);
    }
    componentWillMount() {
    }
    currencyUpdate(currency) {
        this.setState({ currency });
    }
    render() {
        return (
            <div className="mb-5">
                <label htmlFor={this.props.name} className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">{this.props.tittle}</label>
                <CurrencyInput name={this.props.name} id={this.props.name} data={this.state.currency} onValueUpdate={this.currencyUpdate} thousands_separator="." fractionSize="2" />
            </div>
        );
    }
}
export default Currency;