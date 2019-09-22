import React from 'react'
import { Card } from 'react-bootstrap'

export const Home: React.FunctionComponent<any> = (props) => {
  return (<>
    <Card>
      <Card.Header>
        <Card.Title>
          Recommendations for you
        </Card.Title>
      </Card.Header>
      <Card.Body>
        Batman,
        Lion King.
      </Card.Body>
    </Card>
  </>)
}
