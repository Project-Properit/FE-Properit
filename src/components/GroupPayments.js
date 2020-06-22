import React from "react";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";


function isPending(payment) {
    return payment.status === "Pending"
}

function isCompleted(payment) {
    return payment.status === "Completed"
}

const getPaymentsStatus = (payments) => {
    if (payments.every(isPending)) {
        return "indianred"
    }
    if (payments.every(isCompleted)) {
        return "Green"
    }
    return "Orange"
}

const onGroupsPayments = (propId, groupPaymentsId) => {
    return '/properties/' + propId + '/payments/' + groupPaymentsId
}

export const GroupPayments = props => {
    return (
        <div className="propBody">
            <div className="propCard" style={{background: getPaymentsStatus(props.groupPayments.payments)}}>
                <div className="propCard-text">
                    <h2> {props.groupPayments.title}</h2>
                    <h4>{props.groupPayments.amount}$</h4>
                    <h5>{props.groupPayments.description}</h5>
                </div>
                <div className="propCard-stats">
                    <div className="stat">
                        <Card.Link as={Link} to={{pathname: onGroupsPayments(props.propId, props.groupPaymentsId), state:props.groupPayments.payments}} className="value">Info</Card.Link>
                    </div>
                </div>
            </div>
            {/*<Button style={{marginLeft:'1rem'}} onClick={()=>props.onRemove(prop.prop_id)} variant="outline-danger">Remove</Button>*/}
        </div>
    )
}

