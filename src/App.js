import styles from "./styles/App.module.css";
import NavBar from "./components/profile/NavBar";
import Container from "react-bootstrap/Container";
import "./api/axiosDefaults";
import Landing from "./pages/auth/Landing";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import CreateTaskForm from "./pages/tasks/CreateTaskForm";
import UpdateTaskForm from "./pages/tasks/UpdateTaskForm";
import UpdateProfileForm from "./pages/profile/UpdateProfileForm";
import Profile from "./pages/profile/Profile";
import Task from "./pages/tasks/Task";
import FourOFour from "./pages/FourOFour";

function App() {
  const Route = require("react-router-dom").Route;
  const Routes = require("react-router-dom").Routes;

  return (
    <Container className={styles.App}>
      <NavBar />
      <Container className={styles.Body}>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/signin" element={<SignInForm />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/task/create/:id" element={<CreateTaskForm />} />
          <Route exact path="/task/:id" element={<Task />} />
          <Route exact path="/task/:id/update" element={<UpdateTaskForm />} />
          <Route
            exact
            path="/profile/:id/edit"
            element={<UpdateProfileForm />}
          />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<FourOFour />} />
          <Route path="/not_found" element={<FourOFour />} />
        </Routes>
      </Container>
    </Container>
  );
}

export default App;
