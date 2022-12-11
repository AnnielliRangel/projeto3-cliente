import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    //conferir se a senhas estão iguais
    if (form.password !== form.confirmPassword) {
      alert("Senhas incompatíveis");
      return;
    }
  }

  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <Form className="w-50" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira um nome para identificação"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Endereço de e-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira o seu melhor endereço de e-mail"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira uma senha válida"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmar senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirme a senha válida criada anteriormente"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="my-3" variant="dark" type="submit">
          Criar Cadastro
        </Button>
      </Form>
    </Container>
  );
}

export default SignUpPage;
