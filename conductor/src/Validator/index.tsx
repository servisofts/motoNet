
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
        if (SNavigation.lastRoute?.route?.name == pge) return;
        console.log("reset by Validator", SNavigation.lastRoute?.route?.name, pge)
        SNavigation.reset(pge);

    }
    async validate() {
        var { route } = SNavigation.lastRoute;
        if (!route) return null;
        if (this.route != route) return null;
        var params = {};
        for (const key in this.rules) {
            var rule = this.rules[key];
            if (await rule.when()) {
                if (rule.black_list) {
                    var valid = false;
                    rule.black_list.map(rul => {
                        if (rul.indexOf("/**") > -1) {
                            var rulf = rul.replace(/\/\*\*/g, "");
                            // console.log(route.name.indexOf(rulf));
                            if (route.name.indexOf(rulf) > -1) {
                                valid = true;
                            }
                        }
                        if (rul == route.name) {
                            valid = true;
                        }
                    })
                    if (valid) {
                        this.reset(rule.resetTo)
                        return;
                    }
                }
                if (rule.withe_list) {
                    var valid = false;
                    rule.withe_list.map(rul => {
                        if (rul.indexOf("/**") > -1) {
                            var rulf = rul.replace(/\/\*\*/g, "");
                            if (route.name.indexOf(rulf) > -1) {
                                valid = true;
                            }
                        }
                        if (rul == route.name) {
                            valid = true;
                        }
                    })
                    if (!valid && rule.resetTo != route.name) {
                        this.reset(rule.resetTo)
                        return;
                    }
                }
            }
        }
    }
    render() {
        Validator._instace = this;
        try {
            this.validate();
        } catch (e) {
            console.error(e);
        }
        return null
        return <SView height={20} backgroundColor='#f0f'>
            <SText>{SNavigation?.lastRoute?.route?.name}</SText>
        </SView>

        // return null;
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Validator);