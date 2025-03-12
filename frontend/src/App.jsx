import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; //  Context for global auth state
import ViewJob from "./components/JobComponents/ViewJob";
import JobListing from "./components/JobComponents/JobListing";
import HRSignUp from "./components/Auth/HRSignUp";
import JobSeekerRegistration from "./components/JobSeeker/JobSeekerRegistration";
import Home from "./components/HomeComponents/Home";
import Login from "./components/Auth/Login";
import HRDashboard from "./components/HRComponents/HRDashboard";
import AuthNavbar from "./components/HomeComponents/AuthNavBar";
import ProtectedRoute from "./context/ProtectedRoute";
import PostJobForm from "./components/JobComponents/PostJobForm";
import SeekerDashBoard from "./components/JobSeeker/SeekerDashBoard";
import About from "./components/Pages/About";
import ViewJobAlongWIthApplicants from "./components/JobComponents/ViewJobAlongWIthApplicants";
import SeekerListing from "./components/JobSeeker/SeekerListing";
import ViewSeekerDetails from "./components/JobSeeker/ViewSeekerDetails";
import Info from "./components/Pages/Info";
import ViewCompany from "./components/CompanyComponents/ViewCompany";
import CompanyListing from "./components/companyComponents/CompanyListing";
import ContactPage from "./components/Pages/ContactPage";

import ForgotPass from "./components/Auth/ForgotPass";


import HRListings from "./components/HRComponents/HRListings";
import ViewHRProfile from "./components/HRComponents/ViewHRProfile";





function App() {
  return (
    <UserProvider>
      <Router>
        <AuthNavbar /> {/* Navbar updates dynamically */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alljobs" element={<JobListing />} />
          <Route path="/hr-register" element={<HRSignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/register" element={<JobSeekerRegistration />} />
          <Route path="/about" element={<About/>} />
          <Route path="/candidates" element={<SeekerListing />} />
          <Route path="/info" element={<Info />} />
          <Route path="/companies" element={<CompanyListing />} />
          <Route path="/contactus" element={<ContactPage/>}/>
          <Route path="/recruiters" element={<HRListings/>}/>

          {/* protected routes are wrapped  */}
          <Route element={<ProtectedRoute />}>
            <Route path="/jobs/:id" element={<ViewJob />} />
            <Route path="/hr-dashboard" element={<HRDashboard />} />
            <Route path="/seeker-dashboard" element={<SeekerDashBoard />} />
            <Route path="/post-job" element={<PostJobForm />} />
            <Route path="/hr/job-details/:job_id" element={<ViewJobAlongWIthApplicants />} />
            <Route path="/seeker-profile/:seeker_id" element={<ViewSeekerDetails />} />
            <Route path="/hr/:hr_id" element={<ViewHRProfile />} />
            <Route path="/companies/:companyId" element={<ViewCompany />} />
          </Route>
        </Routes>
      </Router>
      <About />
    </UserProvider>
  );
}

export default App;
