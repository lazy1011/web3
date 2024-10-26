import About from "../components/about";
import Hero from "../components/hero";
import Chhart from "../components/donutChart";
import Vision from "../components/vision";
import Ai from "../components/Ai";
import Roadmap from "../components/Roadmap";
import HowToBuy from "../components/HowToBuy";
import Contact from "../components/Contact";
import Contact2 from "../components/Contact2";
import FAQ from "../components/faq";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Chhart />
      <Vision />
      <Ai />
      <Roadmap />
      <FAQ />
      <Contact />
      <ToastContainer />
    </>
  );
}
