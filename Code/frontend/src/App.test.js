import { render, screen, waitFor, within } from '@testing-library/react';
import App from './App';
import { userEvent } from '@testing-library/user-event';

// FIXME Uncomment the lines below when the app library state problems are sorted out
// import { setupServer } from 'msw/node'
// import { rest } from 'msw';

// const handlers=[
//   rest.post("/register", (req, res, ctx) => res(ctx.status(200), ctx.json({"message": "Account created successfully"}))),
//   rest.post("/login", (req, res, ctx) => {
//     console.log("Got req")
//     return res(ctx.status(200), ctx.json({ "message": "Logged in successfully" }))
//   }
//     )
// ]
// const server = setupServer(...handlers);
//
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
//
test('renders login page on load', () => {
  render(<App />);
  let loginSection = screen.getByTestId("login-section");
  expect(loginSection).toBeInTheDocument();
  const userName = within(loginSection).getByTestId("login-email");
  const pass = within(loginSection).getByTestId("login-pass");
  expect(userName).toBeInTheDocument();
  expect(pass).toBeInTheDocument();
  expect(within(loginSection).getByTestId("rememberme")).toBeInTheDocument();
  const login = within(loginSection).getByTestId("login");
  expect(login).toBeInTheDocument();
});

test('Renders registration page on load', () => {
  render(<App/>);
  expect(screen.getByTestId("register-section")).toBeInTheDocument();
  const registerSection = screen.getByTestId("register-section");
  expect(registerSection).toBeInTheDocument();
  const userName = within(registerSection).getByTestId("username");
  const email = within(registerSection).getByTestId("email");
  const pass = within(registerSection).getByTestId("pass");
  const confirmPass = within(registerSection).getByTestId("confirm-pass");
  const register = within(registerSection).getByTestId("register");  expect(userName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(pass).toBeInTheDocument();
  expect(confirmPass).toBeInTheDocument();
  expect(register).toBeInTheDocument();
});


// This is not working at the moment because of some issues with the component library being used and how it handles state
test.skip('Logins in succesfully showing the homepage', async () => {
  render(<App  isTest={true}/>);
  let loginSection = screen.getByTestId("login-section");
  expect(loginSection).toBeInTheDocument();
  const userName = within(loginSection).getByTestId("login-email");
  const pass = within(loginSection).getByTestId("login-pass");
  expect(userName).toBeInTheDocument();
  expect(pass).toBeInTheDocument();
  expect(within(loginSection).getByTestId("rememberme")).toBeInTheDocument();
  const login = within(loginSection).getByTestId("login");
  expect(login).toBeInTheDocument();
  const userNameInp = userName.querySelector("div.MuiInputBase-root input");
  const passInp = pass.querySelector("div.MuiInputBase-root input");
  await userEvent.type(userNameInp, "ABCD@gmail.com");
  await userEvent.type(passInp, "PASSword@1");
  await userEvent.click(login);
  // screen.debug()
  await waitFor(expect(screen.getByTestId("home"),{timeout:10000}).toBeInTheDocument());
});
