import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <Row>
        <h1>Essa página não existe!</h1>
      </Row>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <Link to={"/tabela"}>
            <Button variant="secondary" type="submit">
              Voltar
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default ErrorPage;
