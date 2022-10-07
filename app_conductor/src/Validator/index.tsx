
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import rules from './rules';

class Validator extends Component {
    rules = rules;

    static _instace;
    static validate() {
        if (Validator._instace) {
            Validator._instace.validate();
        }
    }

    route;
    constructor(props) {
        super(props);
        this.route = SNavigation.lastRoute?.route;
    }
    reset(pge) {
        SNavigation.reset(pge);

    }
    async validate() {
        var { route } = SNavigation.lastRoute;
        if (!route) return null;
        if(this.route != route ) return null;
        var params = {};
        for (const key in this.rules) {
            var rule = this.rules[key];
            if (await rule.when()) {
                if (rule.black_list) {
                    if (rule.black_list.includes(route.name)) {
                        this.reset(rule.resetTo)
                        return;
                    }
                }
                if (rule.withe_list) {
                    if (!rule.withe_list.includes(route.name) && rule.resetTo != route.name) {
                        this.reset(rule.resetTo)
                        return;
                    }
                }
            }
        }
    }
    render() {
        Validator._instace = this;
        this.validate();
        return null;
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Validator);