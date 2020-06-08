// import React, {Component} from 'react'
// import {Field, reduxForm} from 'redux-form'
// import {connect} from 'react-redux'
// //-----
// // import {Link} from 'react-router-dom'
// import { Button, IconButton, InputAdornment, Link, TextField, Typography } from "@material-ui/core";
// import { Visibility, VisibilityOff } from "@material-ui/icons";
// import FadeIn from "react-fade-in";
// import { useHistory } from "react-router-dom";
// import "./login.css";
//
// //------
//
// import Messages from '../notifications/Messages'
// import Errors from '../notifications/Errors'
//
// import loginRequest from '../actions/loginActions'
//
//
// class Login extends Component {
//     submit = (values) => {
//         this.props.loginRequest(values)
//     }
// //----
//     render() {
//         const history = useHistory();
//
//         const [showPassword, setShowPassword] = useState(false);
//
//         const toggleShowPassword = () => {
//             setShowPassword(!showPassword);
//         };
//
//         const { formData, setFormValue, isFormValid } = useFormState({
//             person: { validate: v => !!v },
//             password: { validate: validatePassword }
//
//         });
//         const getOnTextChange = set => {
//             return e => {
//                 if (!e.target.value || e.target.value.trim().length === 0) {
//                     set(null);
//                 } else {
//                     set(e.target.value);
//                 }
//             };
//         };
// //----
//         const {
//             handleSubmit, // remember, Redux Form injects this into our props
//             login: {
//                 requesting,
//                 successful,
//                 messages,
//                 errors,
//             },
//         } = this.props
//
//         return (
//             <FadeIn>
//                 <div className="login-page">
//                     <form className="login-panel">
//                         <TextField
//                             required
//                             className="item"
//                             error={props.errors}
//                             label="email"
//                             variant="outlined"
//                             onChange={e => setFormValue("person", e.target.value || null)}
//                         />
//                         <TextField
//                             id="outlined-end-adornment"
//                             className="item"
//                             value={formData.password || ""}
//                             variant="outlined"
//                             onChange={getOnTextChange(v => setFormValue("password", v))}
//                             type={showPassword ? "text" : "password"}
//                             label="סיסמא"
//                             required
//                             error={errors.password}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             aria-label="toggle password visibility"
//                                             onClick={toggleShowPassword}
//                                             onMouseDown={toggleShowPassword}
//                                             edge="end"
//                                         >
//                                             {showPassword ? <Visibility /> : <VisibilityOff />}
//                                         </IconButton>
//                                     </InputAdornment>)
//                             }}
//                         />
//                     </form>
//                     <Button
//                         color="primary"
//                         variant="contained"
//                         onClick={handleSubmit(this.submit)}
//                         style={{ fontWeight: "bold", fontSize: "24px" }}
//                         disabled={!isFormValid}
//                     >
//                         הכנס למערכת
//                     </Button>
//                     <div className="auth-messages">
//                         {/* As in the signup, we're just using the message and error helpers */}
//                         {!requesting && !!errors.length && (
//                             <Errors message="Failure to login due to:" errors={errors}/>
//                         )}
//                         {!requesting && !!messages.length && (
//                             <Messages messages={messages}/>
//                         )}
//                         {requesting && <div>Logging in...</div>}
//                         {!requesting && !successful && (
//                             <Typography className="item">
//                                 Need to Signup?
//                                 <Link onClick={() => {
//                                     history.push("/signup");
//                                 }}
//                                 >
//                                     {"Click Here »"}
//                                 </Link>
//                             </Typography>
//                         )}
//                     </div>
//
//                 </div>
//
//             </FadeIn>
//           //   <div className="login">
//           //       <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
//           //           <h1>LOGIN</h1>
//           //           <label htmlFor="email">Email</label>
//           //           {/*
//           //   Our Redux Form Field components that bind email and password
//           //   to our Redux state's form -> login piece of state.
//           // */}
//           //           <Field
//           //               name="email"
//           //               type="text"
//           //               id="email"
//           //               className="email"
//           //               component="input"
//           //           />
//           //           <label htmlFor="password">Password</label>
//           //           <Field
//           //               name="password"
//           //               type="password"
//           //               id="password"
//           //               className="password"
//           //               component="input"
//           //           />
//           //           <button action="submit">LOGIN</button>
//           //       </form>
//           //       <div className="auth-messages">
//           //           {/* As in the signup, we're just using the message and error helpers */}
//           //           {!requesting && !!errors.length && (
//           //               <Errors message="Failure to login due to:" errors={errors}/>
//           //           )}
//           //           {!requesting && !!messages.length && (
//           //               <Messages messages={messages}/>
//           //           )}
//           //           {requesting && <div>Logging in...</div>}
//           //           {!requesting && !successful && (
//           //               <Link to="/signup">Need to Signup? Click Here »</Link>
//           //           )}
//           //       </div>
//           //   </div>
//
//
//         )
//     }
// }
//
// // Grab only the piece of state we need
// const mapStateToProps = state => ({
//     login: state.loginReducer,
// })
//
// // make Redux state piece of `login` and our action `loginRequest`
// // available in this.props within our component
// const connected = connect(mapStateToProps, {loginRequest})(Login)
//
// // in our Redux's state, this form will be available in 'form.login'
// const formed = reduxForm({
//     form: 'login',
// })(connected)
//
// export default formed
//
//
// //
// //
// // import React, {Component} from 'react'
// // import {Field, reduxForm} from 'redux-form'
// // import {connect} from 'react-redux'
// // //-----
// // import {Link} from 'react-router-dom'
// // import { Button, IconButton, InputAdornment, TextField, Typography } from "@material-ui/core";
// // import { Visibility, VisibilityOff } from "@material-ui/icons";
// // import FadeIn from "react-fade-in";
// // //------
// // import Messages from '../notifications/Messages'
// // import Errors from '../notifications/Errors'
// //
// // import loginRequest from '../actions/loginActions'
// //
// //
// // class Login extends Component {
// //     submit = (values) => {
// //         this.props.loginRequest(values)
// //     }
// // //----
// //     render() {
// //         const [showPassword, setShowPassword] = useState(false);
// //
// //         const toggleShowPassword = () => {
// //             setShowPassword(!showPassword);
// //         };
// // //----
// //         const {
// //             handleSubmit, // remember, Redux Form injects this into our props
// //             login: {
// //                 requesting,
// //                 successful,
// //                 messages,
// //                 errors,
// //             },
// //         } = this.props
// //
// //         return (
// //             <FadeIn>
// //                 {/*<div className="login-page">*/}
// //                 {/*    <form className="login-panel">*/}
// //                 {/*        <TextField*/}
// //                 {/*            required*/}
// //                 {/*            className="item"*/}
// //                 {/*            error={errors.person}*/}
// //                 {/*            label="email"*/}
// //                 {/*            variant="outlined"*/}
// //                 {/*            onChange={e => setFormValue("person", e.target.value || null)}*/}
// //                 {/*        />*/}
// //                 <div className="login">
// //                     <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
// //                         <h1>LOGIN</h1>
// //                         <label htmlFor="email">Email</label>
// //                         {/*
// //             Our Redux Form Field components that bind email and password
// //             to our Redux state's form -> login piece of state.
// //           */}
// //                         <Field
// //                             name="email"
// //                             type="text"
// //                             id="email"
// //                             className="email"
// //                             component="input"
// //                         />
// //                         <label htmlFor="password">Password</label>
// //                         <Field
// //                             name="password"
// //                             type="password"
// //                             id="password"
// //                             className="password"
// //                             component="input"
// //                         />
// //                         <button action="submit">LOGIN</button>
// //                     </form>
// //                     <div className="auth-messages">
// //                         {/* As in the signup, we're just using the message and error helpers */}
// //                         {!requesting && !!errors.length && (
// //                             <Errors message="Failure to login due to:" errors={errors}/>
// //                         )}
// //                         {!requesting && !!messages.length && (
// //                             <Messages messages={messages}/>
// //                         )}
// //                         {requesting && <div>Logging in...</div>}
// //                         {!requesting && !successful && (
// //                             <Link to="/signup">Need to Signup? Click Here »</Link>
// //                         )}
// //                     </div>
// //                 </div>
// //
// //
// //             </FadeIn>
// //         )
// //     }
// // }
// //
// // // Grab only the piece of state we need
// // const mapStateToProps = state => ({
// //     login: state.loginReducer,
// // })
// //
// // // make Redux state piece of `login` and our action `loginRequest`
// // // available in this.props within our component
// // const connected = connect(mapStateToProps, {loginRequest})(Login)
// //
// // // in our Redux's state, this form will be available in 'form.login'
// // const formed = reduxForm({
// //     form: 'login',
// // })(connected)
// //
// // export default formed