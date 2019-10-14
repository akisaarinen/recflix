import React from 'react'
import { Link } from "react-router-dom"
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

export const Menu: React.FunctionComponent<any> = (props) => {
  return (<>
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand>RecFlix</Navbar.Brand>
      <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-light">Search</Button>
      </Form>
    </Navbar>
    <div id='App__scroller' style={{
      overflowY: 'scroll',
      position: 'absolute',
      top: 56, left: 0, bottom: 0, right: 0,
    }}>
      {props.children}
    </div>
  </>)
}
