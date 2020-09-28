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
import moment from "moment";

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
          elections: data.elections,
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
          mainData: data.contests,
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

  electMap = () => {
    return (
      <div>
        {this.state.elections
          .slice(1)
          .map((elect) => (
            <Card key={elect.id}>
              <Card.Header as="h5">{elect.name}</Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  {moment(elect.electionDay).format("MMMM Do YYYY")}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
          .reverse()}
      </div>
    );
  };

  contestMap = () => {
    return (
      <div>
        {this.state.mainData.map((contest) => (
          <div>
            <Card key={contest.id}>
              <Card.Header as="h5">{contest.office}</Card.Header>
              <Card.Title>
                {contest.district.name} {contest.district.scoper}
              </Card.Title>
              <Card.Body>
                <Card.Text></Card.Text>
                <Button>Learn More</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    );
  };

  repMap = () => {
    return (
      <div>
        <CardColumns>
          {this.state.reps.map((rep) => (
            <Fade bottom>
              <div key={rep.id}>
                <Card key={rep.id}>
                  <Card.Img
                    variant="top"
                    src={rep.photoUrl || flag}
                    style={{ height: "150px", width: "auto", padding: "10px" }}
                  />
                  <Card.Body>
                    <Card.Title>{rep.name}</Card.Title>
                    <Card.Text>
                      <> {rep.party}</>
                      <br />
                      <>Office number {[rep.phones]}</>
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
              </div>
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
          <Jumbotron style={{ backgroundColor: "transparent" }}>
            {this.electMap()}
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Upcoming Contests</h1>
          <Jumbotron style={{ backgroundColor: "transparent" }}>
            {this.contestMap()}
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Your Representatives</h1>
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
