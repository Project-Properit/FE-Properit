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
            </div>
        );
    }
}
export default PaymentsTabs