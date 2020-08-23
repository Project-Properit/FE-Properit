import React from "react";

const getPaymentStatus = (status) => {
    if (status === "Pending") {
        return "Orange"
    }
    if (status === "Completed") {
        return "Green"
    }
}


export const Payment = props => {
    return (
        <div className="propBody">
            <div className="propCard" style={{background:"silver"}}>
                <div className="propCard-text">
                    <h2> {props.payment.pay_from.first_name +' ' + props.payment.pay_from.last_name}</h2>
                    <h5 className="tenants">{props.payment.amount}</h5>
                    <h3 className="tenants" style={{color:getPaymentStatus(props.payment.status)}}>{props.payment.status} </h3>
                    <span className="tenants">{props.payment.method}</span>
                </div>
            </div>
        </div>
    )
};