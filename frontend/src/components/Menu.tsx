import React from 'react'
import { Navbar } from 'react-bootstrap'

export const Menu: React.FunctionComponent<any> = (props) => {
  return (<>
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand>RecFlix</Navbar.Brand>
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
