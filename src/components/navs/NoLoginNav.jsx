import { Navbar, Container } from "react-bootstrap";
import logo from "../../IPN.png";
import LogOutButton from "../LogOutButton";

const NoLoginNav = () => {
  return (
    <>
      <Navbar variant="dark" style={{ backgroundColor: "#66023C" }}>
        <Container className="text-center mx-3">
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
        <LogOutButton />
      </Navbar>
    </>
  );
};

export default NoLoginNav;
