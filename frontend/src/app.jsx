// import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";

import { Header } from "./components/header";
import { PrivateRoute } from "./auth/privateRoute";
import HomePage from "./pages"; "./pages/index.jsx";
import LogInPage from "./pages/login";
import SignUpPage from "./pages/signup";
import SubjectPage from "./pages/subjects";
import ContactPage from "./pages/contact";
import AboutPage from "./pages/about";
import UserInfoPage from "./pages/userinfo";
import NotFoundPage from "./pages/404";
import ExamPage from "./pages/exam";
import VerifyEmailPage from "./pages/verifyEmail";
import VerifyEmailMessagePage from "./pages/verifyEmailMessage";

// const LogInPage = lazy(() => import("./pages/login"));
// const SignUpPage = lazy(() => import("./pages/signup"));
// <Suspense fallback={<div>Loading...</div>}>
// <header>
//   <h1>React Auth with Express and Mongodb</h1>
// </header>

const App = () => {
  return (
    <BrowserRouter>
      <section className="m-0 p-0">
        <article className="h-20 bg-icon">
          <Header /></article>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/subjects" element={<SubjectPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route element={<PrivateRoute />} >
            <Route path="/exam" element={<ExamPage />} />
            <Route path="/userinfo" element={<UserInfoPage />} />
          </Route>
          <Route path="/email-verify" element={<VerifyEmailMessagePage />} />
          <Route path="/verify-email/:verificationString" element={<VerifyEmailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <footer>
          <p>Footer Area</p>
        </footer>
      </section>
    </BrowserRouter>
  );
}
// <Route path="/userinfo" element={<PrivateRoute element={<UserInfoPage />} />} />
// <PrivateRoute path="/userinfo" element={<UserInfoPage />} />
// </Suspense>

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
// export default App;
