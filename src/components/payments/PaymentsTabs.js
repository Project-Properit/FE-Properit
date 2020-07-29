import React from 'react';
import FadeIn from "react-fade-in";
import UserTabs from "../UserTabs";
import PaymentsRequests from "./PaymentsRequests";

const PaymentsTabs = () => {
    return (
        <div>
            {
                (localStorage.getItem('chosenMode') === 'tenant') ?
                    (<FadeIn>
                            <UserTabs/>
                        </FadeIn>
                    ) : (
                        <FadeIn>
                            <div >
                                <div style={{display:"flex",justifyContent:"center"}}>
                                    <div >{"My Payment Groups"}</div>
                                </div>
                                <PaymentsRequests setGroupPaymentsCount={()=>{}}/>
                            </div>
                        </FadeIn>)
            }
        </div>
    );
}
export default PaymentsTabs