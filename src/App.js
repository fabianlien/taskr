import styles from "./styles/App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import "./api/axiosDefaults";
import ProfilePage from "./pages/profile/ProfilePage";
import Landing from "./components/Landing";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Body}>
        <Switch>
          <Route exact path="/" render={() => <Landing />} />
          <Route exact path="/profile" render={() => <ProfilePage />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route render={() => <p>Sorry, the page could not be found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
