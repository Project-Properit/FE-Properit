import React, {Component} from 'react';
import {loadProperty} from "../actions/propertyActions"
import {connect} from "react-redux";
import "./styles.css"
import {Button, TextField} from "@material-ui/core";
import FadeIn from "react-fade-in";
import MyModal from "./pages/Modal";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import {createGroupPayments} from "../actions/groupsPaymentsActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Errors from "../notifications/Errors";
import Messages from "../notifications/Messages";
import Tooltip from '@material-ui/core/Tooltip';
import SimpleValidationModal from "./pages/Modal/SimpleValidationModal";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";


class CreateGroupPayments extends Component {
    constructor() {
        super();
        this.state = {
            checked: {},
            tenants: {},
            title: '',
            amount: '',
            description: '',
            is_public: true,
            create: {
                requesting: false,
                successful: false,
                messages: [],
                errors: {},
            },
            is_periodic: false,
            createConfirmModalOpened: false
        };
    }

    setGroupPeriod = (event) => {
        if (event.target.checked) {
            this.setState({is_periodic: event.target.checked, months: [this.getRelevantMonth(), 12]})
            this.setState({is_public: false})
        } else {
            delete this.state.months
            this.setState({is_periodic: event.target.checked})
        }
    }
    setCheckbox = (event, tenantId) => {
        if (event.target.checked && this.state.is_periodic && Object.keys(this.state.tenants).length >= 1) {
            alert("Periodic group can assign to one tenant")
        } else {
            let checked = this.state.checked
            checked[tenantId] = event.target.checked
            if (event.target.checked) {
                this.setNewAmount(0, tenantId)
            } else {
                this.setNewAmount(0, tenantId)
                delete this.state.tenants[tenantId]
            }
            this.setState({checked: checked})
        }
    };
    validateGroupPayment = (title, description, tenants) => {
        let isOneAmountZero = false
        for (const [key, value] of Object.entries(tenants)) {
            if (value['amount'] <= 0 && value['amount']!=='NaN') {
                isOneAmountZero = true
            }
        }
        return {
            isValid: title !== null && title.length > 0 && description !== null && description.length > 0 && Object.entries(tenants).length > 0 && !isOneAmountZero,
            errors: {
                title: (title === null || title.length === 0),
                description: (description === null || description.length === 0),
                tenants: tenants.length === 0 ? "הקבוצה ריקה" : false,
                amount: isOneAmountZero ? "תשלום אינו תקין" : false
            }
        }
    };
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
        let payments = []
        let userId = this.props.userId
        let groupPaymentsObject = {...this.state, userId: userId, payments: []}
        delete groupPaymentsObject.checked
        let tenants = this.state.tenants
        Object.keys(tenants).forEach(function (key) {
            payments.push({pay_from: key, pay_to: userId, amount: tenants[key].amount, method: null})
        })
        groupPaymentsObject['payments'] = payments
        delete groupPaymentsObject.tenants
        this.props.createGroupPayments(groupPaymentsObject);
        this.props.closeHandler();
    }

    componentDidMount() {
        this.props.loadProperty(this.props.propId);
        this.setState({
            assetId: this.props.propId,
            create: this.props.create,
        })
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
    setMonths = (event, newValue) => {
        this.setState({months: newValue});
    };

    getMonth = (x) => {
        let months = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        }
        return months[x]
    }
    valueLabelComponent = (props) => {
        const {children, open, value} = props;

        return (
            <Tooltip open={open} enterTouchDelay={0} placement="bottom" title={value}>
                {children}
            </Tooltip>
        );
    }
    closeModal = () => {
        this.setState({createConfirmModalOpened: false})
    }
    openModal = () => {
        const trimmedTitle = this.state.title !== null ? this.state.title.trim() : this.state.title;
        const trimmedDescription = this.state.description !== null ? this.state.description.trim() : this.state.description;
        const validation = this.validateGroupPayment(trimmedTitle, trimmedDescription, this.state.tenants);
        if (!validation.isValid) {
            let create = this.state.create
            create.errors = validation.errors
            this.setState({create});
        } else {
            this.setState({createConfirmModalOpened: true})
        }
    }

    render() {
        return (
            <div>
                {this.state.createConfirmModalOpened ? <SimpleValidationModal open onApprove={this.submit}
                                                                              closeMe={this.closeModal}/> : null}
                <MyModal open setOpen={this.props.closeHandler} closeMe={this.props.closeHandler}
                         style={{width: "30%"}}>
                    <div style={{textAlign: 'center'}}>
                        <FadeIn className="register-fade group-payment">
                            <div className="register-box" style={{background: "whitesmoke"}}>
                                <form>
                                    <TextField
                                        className="item"
                                        value={this.state.title}
                                        onChange={this.titleTypeChanged}
                                        variant="outlined"
                                        label="Title"
                                        error={this.state.create.errors.title}
                                        required
                                    />
                                    <TextField
                                        className="item"
                                        value={this.state.description}
                                        onChange={this.descriptionTypeChanged}
                                        variant="outlined"
                                        label="Description"
                                        error={this.state.create.errors.description}
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
                                            <Checkbox disabled={this.state.is_periodic}
                                                      checked={this.state.is_public}
                                                      onChange={this.setPublic}
                                            />}
                                        label={"Public Group Payment"}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.is_periodic}
                                                onChange={this.setGroupPeriod}
                                            />}
                                        label={"Set Period Group Payments"}
                                    />
                                    {this.state.is_periodic ?
                                        <div>
                                            <Typography id="range-slider" gutterBottom>
                                                Choose months to charge
                                            </Typography>
                                            <Slider style={{paddingTop: "20px", width: 320}}
                                                    min={this.getRelevantMonth()}
                                                    step={1}
                                                    max={12}
                                                    scale={(x) => this.getMonth(x)}
                                                    value={this.state.months}
                                                    onChange={this.setMonths}
                                                    valueLabelDisplay="on"
                                                    aria-labelledby="range-slider"
                                                    ValueLabelComponent={this.valueLabelComponent}
                                            />
                                        </div> : null}
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        {this.props.myProperty.tenant_list.map(tenant => (
                                            tenant.id !== this.props.userId ?
                                                <div key={tenant.id} style={{marginBottom: 10}}>
                                                    <Card style={{minWidth: 300}}>
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
                                                            <div style={{marginBottom: 12}} color="textSecondary">
                                                                <TextField
                                                                    className="item"
                                                                    value={this.getTenantAmount(tenant.id)}
                                                                    onChange={e => this.setNewAmount(e.target.value, tenant.id)}
                                                                    variant="outlined"
                                                                    error={this.getTenantAmount(tenant.id) <= 0}
                                                                    label="Amount"
                                                                    disabled={!this.getCheckbox(tenant.id)}
                                                                />
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div> : null
                                        ))
                                        }
                                    </div>
                                    <Button
                                        className="button"
                                        color="primary"
                                        variant="contained"
                                        style={{fontWeight: "bold", fontSize: "24px"}}
                                        onClick={this.openModal}
                                    >
                                        Create Group
                                    </Button>
                                </form>
                            </div>
                        </FadeIn>
                        {!this.state.create.requesting && !!this.state.create.errors.length && (
                            <Errors message="Failure to signup due to:" errors={this.state.create.errors}/>
                        )}
                        {!this.state.create.requesting && !!this.state.create.messages.length && (this.state.create.messages.length > 0) && (
                            <Messages messages={this.state.create.messages}/>
                        )}
                    </div>
                </MyModal>;
            </div>
        )
    }
    getRelevantMonth(){
        const date = new Date();
        return date.getMonth()+1 ;
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
        if (amount === '')amount=0
        let tenants = this.state.tenants
        if (this.state.tenants.hasOwnProperty(tenantId)) {
            tenants[tenantId].amount = parseInt(amount)
        } else {
            tenants[tenantId] = {amount: parseInt(amount)}
        }
        this.setState({tenants: tenants})
        this.setTotalAmount()
    }
}

const mapStateToProps = ({myPropertyReducer, myGroupsPayments}) => ({
    myProperty: myPropertyReducer.myProperty,
    create: myGroupsPayments.create
});

const mapDispatchToProps = dispatch => ({
    loadProperty: (propertyId) => dispatch(loadProperty(propertyId)),
    createGroupPayments: (all) => dispatch(createGroupPayments(all))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateGroupPayments);