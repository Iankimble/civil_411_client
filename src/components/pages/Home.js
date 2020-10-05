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
import Geocode from "react-geocode";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import style from "../style/PrimaryStyling.module.css";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      mainData: [],
      address: "",
      pollingLocation: [],
      addressTwo: "",
      elections: [],
      reps: [],
      showLinks: true,
      loading: false,
      results: false,
      showMap: false,
      error: "",
      pollLat: "",
      pollLon: "",
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  submit = (event) => {
    event.preventDefault();
    let userData = this.state.address;

    this.setState({
      showLinks: false,
      loading: true,
      showMap: true,
    });

    //National elections
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
    });

    // Address and Polling location also returns local contests
    getLocalElections(userData).then((data) => {
      if (userData.error) this.setState({ error: data.error });
      else {
        this.setState({
          mainData: data.contests,
          pollingLocation: data.pollingLocations[0].address,
          results: true,
          loading: false,
          addressTwo: data.pollingLocations[0].address.line1,
        });
        console.log(this.state.mainData);
        /*Function the converts the address of the polling location into a geographical coordinate*/
        Geocode.setRegion("es");
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
        Geocode.fromAddress(this.state.addressTwo).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            this.setState({
              pollLat: lat,
              pollLon: lng,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });

    // Representatives on State and Local Level
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
    });
  };

  form = (address) => (
    <Row>
      <Col>
        <Jumbotron style={{ backgroundColor: "transparent" }}>
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
            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: "#0A2644",
                color: "white",
                border: "none",
              }}
              block
              onClick={this.submit}
            >
              Send
            </Button>
          </Form>
        </Jumbotron>
      </Col>
    </Row>
  );

  electMap = () => {
    if (!this.state.elections) {
      return (
        <Card>
          <Card.Body style={{ backgroundColor: "#F5F5F5" }}>
            <h3>
              <i>No Upcoming Contest</i>
            </h3>
          </Card.Body>{" "}
        </Card>
      );
    }
    return (
      <div>
        {this.state.elections
          .slice(1)
          .map((elect) => (
            <Card key={elect.id}>
              <Card.Header
                as="h5"
                style={{ backgroundColor: "#0A2644", color: "white" }}
              >
                {elect.name}
              </Card.Header>
              <Card.Body style={{ backgroundColor: "#F5F5F5" }}>
                <Card.Title></Card.Title>
                <Card.Text>
                  <h1>
                    <ul>{moment(elect.electionDay).format("MMMM Do YYYY")}</ul>
                  </h1>
                </Card.Text>
              </Card.Body>
            </Card>
          ))
          .reverse()}
      </div>
    );
  };

  contestMap = () => {
    if (!this.state.mainData) {
      return (
        <Card>
          <Card.Body style={{ backgroundColor: "#F5F5F5" }}>
            <h3>
              <i>No Upcoming Contest</i>
            </h3>
          </Card.Body>{" "}
        </Card>
      );
    } else
      return (
        <div>
          {this.state.mainData.map((contest) => (
            <div>
              <Card key={contest.id}>
                <Card.Header
                  as="h5"
                  style={{ backgroundColor: "#0A2644", color: "white" }}
                >
                  {contest.office}
                </Card.Header>
                <Card.Title>
                  {contest.district.name} {contest.district.scoper}
                </Card.Title>
                <Card.Body>
                  <Col>
                    <Card>
                      <Card.Body>
                        {contest.candidates.map((candidate, i) => (
                          <div key={i}>
                            <Card.Title>{candidate.name}</Card.Title>
                            <Card.Text>
                              {candidate.party}
                              <br />
                              <Button
                                variant="primary"
                                href={candidate.candidateUrl}
                                target="_blank"
                                style={{
                                  backgroundColor: "#0A2644",
                                  color: "white",
                                  border: "none",
                                }}
                              >
                                Candidate's Website
                              </Button>
                            </Card.Text>
                            <hr />
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
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
          {this.state.reps.map((rep, id) => (
            <Fade bottom>
              <div key={id}>
                <Card key={rep.id}>
                  <Card.Header
                    style={{ backgroundColor: "#0A2644", color: "white" }}
                  >
                    <Card.Title>{rep.name}</Card.Title>
                  </Card.Header>
                  <Card.Img
                    variant="top"
                    src={rep.photoUrl || flag}
                    className={style.candidateImg}
                  />

                  <Card.Body key={rep.id}>
                    <Card.Text>
                      <> {rep.party}</>
                      <br />
                      <>Office number {[rep.phones]}</>
                    </Card.Text>
                    <Button
                      variant="primary"
                      href={[rep.urls].toString()}
                      target="_blank"
                      style={{
                        backgroundColor: "#0A2644",
                        color: "white",
                        border: "none",
                      }}
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
      <hr />
      <Row>
        <Col>
          <h1>Upcoming Elections</h1>
          <Jumbotron style={{ backgroundColor: "transparent" }}>
            {this.electMap()}
          </Jumbotron>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h1>Upcoming Contests</h1>
          <Jumbotron style={{ backgroundColor: "transparent" }}>
            {this.contestMap()}
          </Jumbotron>
        </Col>
      </Row>
      <hr />
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

    const containerStyle = {
      width: "auto",
      height: "400px",
    };

    const center = {
      lat: this.state.pollLat,
      lng: this.state.pollLon,
    };

    return (
      <div style={{ textAlign: "center" }}>
        <Container fluid>
          {this.form(address)}
          <hr />
          {this.state.showLinks ? <LandingLink /> : null}
          {this.state.loading ? <Loading /> : null}
          {this.state.showMap ? (
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                position={(this.state.pollLat, this.state.pollLon)}
                style={{ backgroundColor: "transparent" }}
              >
                <Marker
                  position={{
                    lat: this.state.pollLat,
                    lng: this.state.pollLon,
                  }}
                  title="Voting location"
                  label={this.state.addressTwo}
                ></Marker>
              </GoogleMap>
            </LoadScript>
          ) : null}
          {this.state.showResults ? this.results() : null}
        </Container>
      </div>
    );
  }
}

export default HomePage;
