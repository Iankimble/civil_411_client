import React from "react";
import { Row, Card, Button } from "react-bootstrap";
import style from "../style/PrimaryStyling.module.css";

const LandingLinks = () => (
  <Row
    style={{
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Card style={{ width: "16rem", margin: "5px" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title className={style.cardTitle}>
          <b>Register to Vote</b>
        </Card.Title>
        <Card.Text className={style.cardText}>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button
          href="https://www.pavoterservices.pa.gov/pages/VoterRegistrationApplication.aspx"
          target="_blank"
          className={style.cardButton}
        >
          Register
        </Button>
      </Card.Body>
    </Card>

    <Card style={{ width: "16rem", margin: "5px" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title className={style.carTitle}>
          <b>Check Voter Registration Status</b>
        </Card.Title>
        <Card.Text className={style.cardText}>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button
          href="https://www.pavoterservices.pa.gov/pages/voterregistrationstatus.aspx"
          target="_blank"
          className={style.cardButton}
        >
          Check Status
        </Button>
      </Card.Body>
    </Card>

    <Card style={{ width: "16rem", margin: "5px" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title className={style.cardTitle}>
          <b>Political litercay Resources</b>
        </Card.Title>
        <Card.Text className={style.cardText}>
          blog that teaches users about state and local politics
        </Card.Text>
        <Button className={style.cardButton}>Learn</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: "16rem", margin: "5px" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title className={style.cardTitle}>
          <b>Petitions</b>
        </Card.Title>
        <Card.Text className={style.cardText}>
          blog that teaches users about state and local politics
        </Card.Text>
        <Button
          href="https://www.change.org/start-a-petition?utm_source=sem&utm_medium=google_ad&utm_campaign=G%3ESearch%3ESAP%3EUS%3ENonBrand%3EExact&utm_term=petition|e|AG:82835045968|AD:378316637681&utm_content=2020_09_22&gclid=EAIaIQobChMIib-a7ar96wIVio7ICh3oQwohEAAYASAAEgLEyvD_BwE"
          target="_blank"
          className={style.cardButton}
        >
          Make a difference
        </Button>
      </Card.Body>
    </Card>
  </Row>
);

export default LandingLinks;
