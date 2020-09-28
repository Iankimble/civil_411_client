import React, { Component } from "react";
import {
  Form,
  Button,
  Jumbotron,
  Container,
  Row,
  Col,
  Card,
  CardColumns,
} from "react-bootstrap";
import { getLocalElections, getNatElections, getUserReps } from "../../API";
import flag from "../style/united-states.png";
import Loading from "./Loading";
import LandingLink from "./LandingLinks";
import { Fade } from "react-reveal";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      mainData: [],
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
      if (!userData) {
        this.setState({ error: data.error });
      } else {
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
          mainData: data,
          pollingLocation: data.pollingLocations[0].address,
          results: true,
          loading: false,
        });
      }
      // Address and Polling location
      console.log(this.state.pollingLocation);
      console.log(this.state.mainData);
    });

    getUserReps(userData).then((data) => {
      if (userData.error) {
        this.setState({ error: data.error });
        console.log("sorry somthing went wrong. Try again.");
      } else {
        this.setState({
          reps: data.officials,
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
                <b>
                  <i>Enter your address to find your nearest voting station.</i>
                </b>
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

  repMap = () => {
    return (
      <div>
        <CardColumns>
          {this.state.reps.map((rep, index) => (
            <Fade bottom>
              <Card key={rep.id}>
                <Card.Img
                  variant="top"
                  src={rep.photoUrl || flag}
                  style={{ height: "250px", width: "auto", padding: "10px" }}
                />
                <Card.Body>
                  <Card.Title>{rep.name}</Card.Title>
                  <Card.Text>
                    <h3> {rep.party}</h3>
                    <h5>Office number {[rep.phones]}</h5>
                  </Card.Text>
                  <Button
                    variant="primary"
                    href={[rep.urls].toString()}
                    target="_blank"
                  >
                    Representatives Website
                  </Button>
                </Card.Body>
              </Card>
            </Fade>
          ))}
        </CardColumns>
      </div>
    );
  };

  results = () => (
    <div>
      <Fade bottom>
        <Jumbotron style={{ backgroundColor: "transparent" }}>
          <h1>Nearest Polling Location</h1>
          {this.state.pollingLocation.locationName}
          <br />
          {this.state.pollingLocation.line1}, {this.state.pollingLocation.city}
          {this.state.pollingLocation.state}, {this.state.pollingLocation.zip}
        </Jumbotron>
      </Fade>
      <Row>
        <Col>
          <h1>Upcoming Elections</h1>
          <Jumbotron style={{ backgroundColor: "transparent" }}></Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Your Representatives</h1>
          <br />
          <br />
          {this.repMap()}
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
