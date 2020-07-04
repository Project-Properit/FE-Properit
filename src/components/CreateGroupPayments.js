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
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import Switch from "@material-ui/core/Switch";


class CreateGroupPayments extends Component {
    constructor() {
        super();
        this.state = {
            checked: {},
            tenants: {},
            title: '',
            amount: 0,
            description: '',
            is_public: true,
            create: {
                requesting: false,
                successful: false,
                messages: [],
                errors: {},
            },
            isPeriod: false
        };
    }

    setGroupPeriod = (event) => {
        if (event.target.checked) {
            this.setState({isPeriod: event.target.checked, months: [3, 8]})
        }else{
            delete this.state.months
            this.setState({isPeriod: event.target.checked})
        }
    }
    setCheckbox = (event, tenantId) => {
        let checked = this.state.checked
        checked[tenantId] = event.target.checked
        if (event.target.checked) {
            this.setNewAmount(0, tenantId)
        } else {
            this.setNewAmount(0, tenantId)
            delete this.state.tenants[tenantId]
        }
        this.setState({checked: checked})
        console.log(this.state.tenants)
    };
    validateGroupPayment = (title, description, tenants) => {
        let isOneAmountZero = false
        console.log(tenants)
        for (const [key, value] of Object.entries(tenants)) {
            console.log(value['amount'])
            if (value['amount'] <= 0) {
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
        const trimmedTitle = this.state.title !== null ? this.state.title.trim() : this.state.title;
        const trimmedDescription = this.state.description !== null ? this.state.description.trim() : this.state.description;
        const validation = this.validateGroupPayment(trimmedTitle, trimmedDescription, this.state.tenants);
        if (!validation.isValid) {
            let create = this.state.create
            create.errors = validation.errors
            this.setState({create});
        } else {
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
            // console.log(groupPaymentsObject)
            this.props.createGroupPayments(groupPaymentsObject);
            this.props.closeHandler();
        }
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

    render() {
        return (
            <div>
                <MyModal open setOpen={this.props.closeHandler} closeMe={this.props.closeHandler}
                         style={{width: "30%"}}>
                    <div style={{textAlign: 'center'}}>
                        <FadeIn className="register-fade">
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
                                            <Checkbox
                                                checked={this.state.is_public}
                                                onChange={this.setPublic}
                                            />}
                                        label={"Public Group Payment"}
                                    />
                                    {/*<FormControlLabel*/}
                                    {/*control={*/}
                                    {/*    <Switch*/}
                                    {/*    checked={this.state.isPeriod}*/}
                                    {/*    onChange={this.setGroupPeriod}*/}
                                    {/*/>}*/}
                                    {/*label={"Set Period Group Payments"}*/}
                                    {/*/>*/}
                                    {/*{this.state.isPeriod?*/}
                                    {/*<div>*/}
                                    {/*    <Typography id="range-slider" gutterBottom>*/}
                                    {/*        Choose months to charge*/}
                                    {/*    </Typography>*/}
                                    {/*    <Slider style={{paddingTop:"20px",width: 320}}*/}
                                    {/*            min={1}*/}
                                    {/*            step={1}*/}
                                    {/*            max={12}*/}
                                    {/*            scale={(x) => this.getMonth(x)}*/}
                                    {/*            value={this.state.months}*/}
                                    {/*            onChange={this.setMonths}*/}
                                    {/*            valueLabelDisplay="on"*/}
                                    {/*            aria-labelledby="range-slider"*/}
                                    {/*            ValueLabelComponent={this.valueLabelComponent}*/}
                                    {/*    />*/}
                                    {/*</div>:null}*/}
                                    <div style={{display: "flex"}}>
                                        {this.props.myProperty.tenant_list.map(tenant => (
                                            tenant.id !== this.props.userId ?
                                                <div key={tenant.id}>
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
                                        onClick={() => this.submit()}
                                    >
                                        צור קבוצה
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