import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import Header from "./components/header/Header";

function App() {
   return (
      <>
         <BrowserRouter>
            <Header />
            <AppRouter />
         </BrowserRouter>
      </>
   );
}

export default App;
