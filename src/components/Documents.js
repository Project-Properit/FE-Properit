import React, {useState, Component} from 'react';
import {connect} from "react-redux";
import {loadDocuments} from "../actions/documentActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Loading from "./Loading";
import PDFViewer from 'pdf-viewer-reactjs'
import { Document, Page } from 'react-pdf';
import FilesUpload from "./pages/documents/filesUpload";

class Documents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numPages: null,
            pageNumber: 1,
            browserFiles: [],
        }
    }

    addBrowserFiles = (newFiles) => {
        this.setState((prevState) => {
            const files = [...prevState.browserFiles, newFiles];
            return {browserFiles: files};
        })
    }
    // const [browserFiles, setBrowserFiles] = useState([]);

    componentDidMount() {


        console.log(React.version);
        const {userId} = this.props.match.params;
        this.props.loadDocuments(userId);
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }
    render() {
        // console.log(this.props);
        const {userId} = this.props.match.params;
        const { pageNumber, numPages } = this.state;


        return (

            <Container className="App">
                    <header style={{marginBottom: '4rem', textAlign: 'center'}} className="App-header">
                        <h2> Documents - {userId}</h2>
                    </header>

                    <Loading loading={this.props.isLoading}/>

                    <Row>
                        {this.props.myDocuments.map(doc => (
                            <div key={doc.doc_id}>
                                {/*{doc.doc_location}*/}
                                {/*<FilesUpload*/}
                                {/*    // file={doc.doc_location}*/}
                                {/*    onLoadSuccess={this.onDocumentLoadSuccess}*/}
                                {/*    files={this.state.browserFiles} setFiles={this.addBrowserFiles} maxFiles={3}*/}
                                {/*>*/}
                                {/*    <Page pageNumber={pageNumber} />*/}
                                {/*</FilesUpload>*/}
                                {/*<p>Page {pageNumber} of {numPages}</p>*/}
                                {/*<PDFViewer style={{size:'100px'}}*/}
                                {/*    document={{*/}
                                {/*        url: doc.doc_location,*/}
                                {/*    }}*/}
                                {/*/>*/}
                            </div>

                        ))}
                    </Row>
                    <div>
                        {this.props.error}
                </div>

            </Container>
        )
    }
}

const mapStateToProps = ({myDocuments}) => ({
    isLoading: myDocuments.isLoading,
    myDocuments: myDocuments.myDocuments,
    error: myDocuments.error,
});

const mapDispatchToProps = dispatch => ({
    loadDocuments: (userId) => dispatch(loadDocuments(userId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Documents);