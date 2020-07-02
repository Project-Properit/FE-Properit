import React, {Component} from 'react';
import {loadProperty} from "../actions/propertyActions"
import {connect} from "react-redux";
import "./styles.css"
import {Button, TextField} from "@material-ui/core";
import FadeIn from "react-fade-in";
import MyModal from "./pages/Modal";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import {createGroupPayments} from "../actions/groupsPaymentsActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";


class CreateGroupPayments extends Component {
    constructor() {
        super();
        this.state = {
            checked: {},
            tenants: {},
            title: '',
            amount: 0,
            description: '',
            is_public: true
        };
    }

    reset = () => {
        this.setState({
            checked: {},
            tenants: {},
            title: '',
            amount: 0,
            description: '',
            is_public: true
        })
    }
    setCheckbox = (event, tenantId) => {
        let checked = this.state.checked
        checked[tenantId] = event.target.checked
        if (!event.target.checked) {
            this.setNewAmount(0, tenantId)
        }
        this.setState({checked: checked})
        delete this.state.tenants[tenantId]
    };

    amountNotZero = (tenant) => {
        return tenant.amount > 0
    }

    // validateGroupPayment = (title, tenants) => ({
    //     isValid: (title !== null && title.length > 0) && tenants.length > 0 && tenants.every(this.amountNotZero),
    //     errors: {
    //         name: (title === null || title.length === 0),
    //         tenants: tenants.length === 0 ? "הקבוצה ריקה" : false,
    //         amount: tenants.every(this.amountNotZero)? "תשלום אינו תקין": false
    //     }
    // });
    getCheckbox = (tenantId) => {
        let checked = this.state.checked
        if (checked.hasOwnProperty(tenantId)) {
            return this.state.checked[tenantId]
        } else {
            checked[tenantId] = false
            this.setState({checked: checked})
            return false
        }
    }
    submit = () => {
        // const trimmedTitle = this.state.title !== null ? this.state.title.trim() : this.state.title;
        // console.log('trimmedTitle',trimmedTitle)
        // const validation = this.validateGroupPayment(trimmedTitle, this.state.tenants);
        // if (!validation.isValid) {
        //     this.state(validation.errors);
        // }
        // else {
        let payments = []
        let userId = this.props.userId
        let groupPaymentsObject = {...this.state, payments: []}
        delete groupPaymentsObject.checked
        let tenants = this.state.tenants
        Object.keys(tenants).forEach(function (key) {
            payments.push({pay_from: key, pay_to: userId, amount: tenants[key].amount, method: null})
        })
        groupPaymentsObject['payments'] = payments
        delete groupPaymentsObject.tenants
        this.props.createGroupPayments(groupPaymentsObject);
        this.props.closeHandler();
        // this.reset();

        this.props.loadGroups(this.props.propId, userId)
        // }
    }

    componentDidMount() {
        this.props.loadProperty(this.props.propId);
        this.setState({assetId: this.props.propId})
    }

    titleTypeChanged = (e) => {
        const {value} = e.target;
        this.setState({title: value});
    }

    descriptionTypeChanged = (e) => {
        const {value} = e.target;
        this.setState({description: value});
    }

    setPublic = (event) => {
        this.setState({is_public: event.target.checked})
    }

    render() {
        // const {
        //     create: {
        //         requesting,
        //         successful,
        //         messages,
        //         errors
        //     }
        // } = this.props
        return (
            <div>
                <MyModal open setOpen={this.props.closeHandler} closeMe={this.props.closeHandler}
                         style={{width: "30%"}}>
                    <div style={{textAlign: 'center'}}>
                        <FadeIn className="register-fade">
                            <div className="register-box" style={{background: "whitesmoke"}}>
                                <form>
                                    {/*<div className="register-page">*/}
                                    {/*    <form className="register-panel">*/}
                                    <TextField
                                        className="item"
                                        value={this.state.title}
                                        onChange={this.titleTypeChanged}
                                        variant="outlined"
                                        label="Title"
                                        required
                                    />
                                    <TextField
                                        className="item"
                                        value={this.state.description}
                                        onChange={this.descriptionTypeChanged}
                                        variant="outlined"
                                        label="Description"
                                        required
                                    />
                                    <TextField
                                        className="item"
                                        value={this.state.amount}
                                        variant="outlined"
                                        label="Total Amount"
                                        disabled
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.is_public}
                                                onChange={this.setPublic}

                                            />}
                                        label={"Public Group Payment"}
                                    />
                                    <div style={{display: "flex"}}>
                                        {this.props.myProperty.tenant_list.map(tenant => (
                                            tenant.id !== this.props.userId?
                                            <div key={tenant.id}>
                                                <Card style={{minWidth: 275}}>
                                                    <CardContent>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.getCheckbox(tenant.id)}
                                                                    onChange={e => this.setCheckbox(e, tenant.id)}
                                                                    inputProps={{'aria-label': 'primary checkbox'}}
                                                                />}
                                                            label={"Add " + tenant.first_name + ' ' + tenant.last_name}
                                                        />
                                                        <Typography style={{marginBottom: 12}} color="textSecondary">
                                                            <TextField
                                                                className="item"
                                                                value={this.getTenantAmount(tenant.id)}
                                                                onChange={e => this.setNewAmount(e.target.value, tenant.id)}
                                                                variant="outlined"
                                                                label="Amount"
                                                                disabled={!this.getCheckbox(tenant.id)}
                                                            />
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </div>:null
                                        ))
                                        }
                                    </div>
                                    <Button
                                        className="button"
                                        color="primary"
                                        variant="contained"
                                        style={{fontWeight: "bold", fontSize: "24px"}}
                                        onClick={() => this.submit()}
                                    >
                                        צור קבוצה
                                    </Button>
                                </form>
                            </div>
                        </FadeIn>
                    </div>
                </MyModal>;
            </div>
        )
    }

    getTenantAmount(tenantId) {
        if (this.state.tenants.hasOwnProperty(tenantId)) {
            return this.state.tenants[tenantId].amount
        }
        return 0
    }

    setTotalAmount() {
        let tenants = this.state.tenants
        let totalAmount = 0
        Object.keys(tenants).forEach(function (key) {
            totalAmount += parseInt(tenants[key].amount)
        })
        this.setState({amount: totalAmount})
    }

    setNewAmount = (amount, tenantId) => {
        let tenants = this.state.tenants
        // const {value} = e.target
        if (this.state.tenants.hasOwnProperty(tenantId)) {
            tenants[tenantId].amount = parseInt(amount)
        } else {
            tenants[tenantId] = {amount: parseInt(amount)}
        }
        this.setState({tenants})
        this.setTotalAmount()
    }

}

const mapStateToProps = ({myPropertyReducer, myGroupsPayments}) => ({
    myProperty: myPropertyReducer.myProperty,
    create: myGroupsPayments.create,

});

const mapDispatchToProps = dispatch => ({
    loadProperty: (propertyId) => dispatch(loadProperty(propertyId)),
    createGroupPayments: (all) => dispatch(createGroupPayments(all))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateGroupPayments);