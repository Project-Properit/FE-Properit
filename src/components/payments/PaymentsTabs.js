import React, {Component} from 'react';
import FadeIn from "react-fade-in";
import UserTabs from "../UserTabs";
import PaymentsRequests from "./PaymentsRequests";

class PaymentsTabs extends Component {
    render() {
        return (
            <div>
                {
                    (localStorage.getItem('chosenMode') === 'tenant') ?
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