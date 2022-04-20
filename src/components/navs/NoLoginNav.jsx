import { Navbar, Container } from "react-bootstrap";
import logo from "../../IPN.png";

const NoLoginNav = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            SISTEMA DE ADMINISTRACIÓN DE RECURSOS MATERIALES
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default NoLoginNav;
