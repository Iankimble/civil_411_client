import React from "react";
import { Jumbotron } from "react-bootstrap";

const About = () => (
  <div>
    <Jumbotron style={{ textAlign: "center", backgroundColor: "transparent" }}>
      <h1>About</h1>
      <p>
        Built by Ian Kimble 2020
        <br />
        This application was built using react
      </p>
    </Jumbotron>
  </div>
);

export default About;
