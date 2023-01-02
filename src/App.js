import styles from "./styles/App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import "./api/axiosDefaults";
import Landing from "./components/Landing";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import CreateTaskForm from "./pages/tasks/CreateTaskForm";
import TaskDetail from "./pages/tasks/TaskDetail";
import UpdateTaskForm from "./pages/tasks/UpdateTaskForm";
import UpdateProfileForm from "./pages/profile/UpdateProfileForm";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Body}>
        <Switch>
          <Route exact path="/" render={() => <Landing />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/task/create/:id" render={() => <CreateTaskForm />} />
          <Route exact path="/task/:id" render={() => <TaskDetail />} />
          <Route exact path="/task/:id/update" render={() => <UpdateTaskForm />} />
          <Route exact path="/profile/:id/edit" render={() => <UpdateProfileForm />} />
          <Route exact path="/profile/:id" render={() => <Profile />} />
          <Route render={() => <p>Sorry, the page could not be found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
