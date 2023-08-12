import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SNavigation, SPage, SPopup, SText, SView } from 'servisofts-component';
// import SectionApis from './components/SectionApis';
import SectionFooter from './components/SectionFooter';
import SectionForm from './components/SectionForm';
import SectionHeader from './components/SectionHeader';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <SPage>
                <SView col={"xs-12"} center>
                    <SView col={"xs-11 sm-10 md-8 lg-6 xl-4 xxl-3"} center>
                        <SHr height={50} />
                        <SectionHeader {...this.props} />
                        <SHr height={25} />
                        <SectionForm ref={ref => this._sectionForm = ref} {...this.props} />
                        <SHr height={25} />
                        {/* <SectionApis {...this.props} /> */}
                        <SHr height={35} />
                        <SectionFooter {...this.props} onPress={() => {
                            this._sectionForm.submit();
                        }} />
                        <SHr height={20} />
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(login);