import React, { Component } from "react";

import { Form, Button } from "react-bootstrap";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
    };
  }
  handleChange = () => {};

  handleSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
    // - returns list of upcoming elections- Note: returns upcoming elections nationally- not specific to user.
    fetch(
      `https://www.googleapis.com/civicinfo/v2/elections?key=
        ${process.env.REACT_APP_GOOGLE_API_KEY}`
    ).then((res) => console.log(res.json()));

    // returns state office contests, representative information, and polling location(s) based on user address
    fetch(
      `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${process.env.REACT_APP_TEST_ADDRESS}&electionId=2000&key=
      ${process.env.REACT_APP_GOOGLE_API_KEY}`
    ).then((res) => console.log(res.json()));

    // returns information on local and federal represnetatives and offices
    fetch(
      `https://www.googleapis.com/civicinfo/v2/representatives?address=${process.env.REACT_APP_TEST_ADDRESS}&key=
      ${process.env.REACT_APP_GOOGLE_API_KEY}`
    ).then((res) => console.log(res.json()));
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group role="form">
            <Form.Label>Enter your address</Form.Label>
            <Form.Control type="text" placeholder="Address" name="address" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <hr />
        <b>Register to Vote</b>
        <br />
        <Button
          href="https://www.pavoterservices.pa.gov/pages/VoterRegistrationApplication.aspx"
          target="_blank"
        >
          Register
        </Button>
        <hr />
        <b>Check Voter Registration Status</b>
        <br />
        <Button
          href="https://www.pavoterservices.pa.gov/pages/voterregistrationstatus.aspx"
          target="_blank"
        >
          Check Status
        </Button>
        <hr />
        <b>Political litercay Resources</b>
        <br />
        blog that teaches users about state and local politics
        <hr />
        <b>Petitions</b>
        <br />
        blog that gives users information about petitions
      </div>
    );
  }
}

export default HomePage;
