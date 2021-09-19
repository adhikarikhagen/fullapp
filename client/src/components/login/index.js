import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { login } from "../../api";

function Login({ onLoginSuccessful }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState('')

  const onEmailChange = (event) => setUsername(event.target.value);

  const onSubmit = async (event) => {
    event.preventDefault();
    setHasError(false);
    const loginResult = await login({ username });
    if (!loginResult) setHasError(true);
    else {
      debugger;
      const { name, id } = loginResult;
      setName(name)
      setId(id)
    }
  };

  return (
    <Container>
      <Card className="mt-5">
        <Card.Body>
          <Form className="w-100" onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Minecraft Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter minecraft username"
                onChange={onEmailChange}
                value={username}
              />
              {id && name && <Form.Text className="text-muted"> {`UUID for ${name} is ${id}`}</Form.Text>}

            </Form.Group>
            {hasError && (
              <Alert variant={"danger"}>
                The email address and password you entered don't match any
                account. Please try again.
              </Alert>
            )}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>

      </Card>
    </Container>
  );
}

export default Login;
