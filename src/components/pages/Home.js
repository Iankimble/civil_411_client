import React, { Component } from "react";
import {
  Form,
  Button,
  Jumbotron,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { getLocalElections, getNatElections, getUserReps } from "../../API";
// import style from "../style/PrimaryStyling.module.css";
import Loading from "./Loading";
import LandingLink from "./LandingLinks";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
      pollingLocation: [],
      elections: [],
      reps: [],
      showLinks: true,
      loading: false,
      results: false,
      error: "",
    };
  }

  componentDidMount = () => (
    <div>
      {alert(
        "This application is still in development and will be done soon. I apologize for the inconvenience."
      )}
    </div>
  );

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  submit = (event) => {
    event.preventDefault();
    console.log(this.state.address);
    let userData = this.state.address;

    this.setState({
      showLinks: false,
      loading: true,
    });

    getNatElections(userData).then((data) => {
      if (userData.error) this.setState({ error: data.error });
      else {
        this.setState({
          elections: data,
          showLinks: false,
          showResults: true,
          loading: false,
        });
      }
      //National elections
      console.log(this.state.elections);
    });

    getLocalElections(userData).then((data) => {
      if (userData.error) this.setState({ error: data.error });
      else {
        this.setState({
          pollingLocation: data,
          results: true,
          loading: false,
        });
      }
      // Address and Polling location
      console.log(this.state.pollingLocation);
    });

    getUserReps(userData).then((data) => {
      if (userData.error) this.setState({ error: data.error });
      else {
        this.setState({
          reps: data,
          loading: false,
          results: true,
        });
      }
      // Representatives on State and Local Level
      console.log(this.state.reps);
    });
  };

  form = (address) => (
    <Row>
      <Col>
        <Jumbotron>
          <h1>Welcome to Civil 411</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group role="form">
              <Form.Label>
                Enter your address to find your nearest voting station.
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address here..."
                onChange={this.handleChange("address")}
                value={address}
              />
            </Form.Group>
            <Button variant="primary" type="submit" block onClick={this.submit}>
              Send
            </Button>
          </Form>
        </Jumbotron>
      </Col>
    </Row>
  );

  results = () => (
    <div>
      <Jumbotron>
        <h2>Nearest Polling Location</h2>
        <p>
          Shows user where they're nearest voting station is. Will use google
          maps
        </p>
      </Jumbotron>
      <Row>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Elections & Contests</Card.Title>
              <Card.Text>Map of upcoming contests and elections</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>your local and federal officials</Card.Title>
              <Card.Text>
                <ul>
                  <li>name</li>
                  <li>party</li>
                  <li>photourl</li>
                  <li>website</li>
                  <li>phone</li>
                  <li>address</li>
                </ul>
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );

  render() {
    const { address } = this.state.address;
    if (this.state.rsults === true) {
      this.results();
    }

    return (
      <div style={{ textAlign: "center" }}>
        <Container fluid>
          {this.form(address)}
          <hr />
          {this.state.showLinks ? <LandingLink /> : null}
          {this.state.loading ? <Loading /> : null}
          {this.state.showResults ? this.results() : null}
        </Container>
      </div>
    );
  }
}

export default HomePage;
