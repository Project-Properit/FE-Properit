import React, {Component} from 'react';
import FadeIn from "react-fade-in";
import UserTabs from "../UserTabs";
import PaymentsRequests from "./PaymentsRequests";

class PaymentsTabs extends Component {
    render() {
        console.log(this.props.chosenMode)
        return (
            <div>
                {
                    (localStorage.getItem('mode') === 'tenant') ?
                    (<FadeIn>
                            <UserTabs/>
                        </FadeIn>
                    ) : (
                        <FadeIn>
                            <PaymentsRequests/>
                        </FadeIn>)
                }
                }}

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
export default PaymentsTabs