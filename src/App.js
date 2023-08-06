import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Intro from "./components/Intro/Intro";
import Category from "./components/Category/Category";
import { ServerErrorProvider } from './assets/extra/ServerErrorProvider/ServerErrorProvider';
import ServerErrorContainer from "./assets/extra/ServerErrorContainer/ServerErrorContainer";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <ServerErrorProvider>
        <Header />
      <div className="Content">
          <ServerErrorContainer />
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/category" element={<Category />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </ServerErrorProvider>
    </div>
  );
}

export default App;
