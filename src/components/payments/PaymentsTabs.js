import React, {Component} from 'react';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Payments from "./Payments";
import PaymentsRequests from "./PaymentsRequests";
import FadeIn from "react-fade-in";
import UserTabs from "../UserTabs";

class PaymentsTabs extends Component {
    render() {
        return (
            <div>
                                <FadeIn>
                    <UserTabs/>
                </FadeIn>
                {/*<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">*/}
                {/*    <Tab eventKey="paymentGroup" title="My Groups">*/}
                {/*        <Payments/>*/}
                {/*    </Tab>*/}
                {/*    <Tab eventKey="requests" title="Requests">*/}
                {/*        <PaymentsRequests/>*/}
                {/*    </Tab>*/}
                {/*</Tabs>*/}
            </div>
        );
    }
}

export default PaymentsTabs;