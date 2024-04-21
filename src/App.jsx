import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import Createpost from "./Components/Createpost";
import ListPost from "./Components/ListPost";
import { useState } from "react";
import PostListProvider from "./Components/Store/Post-list-store";

function App() {
  const [selectedTab, setselectedTab] = useState("Home");

  return (
    <>
      <PostListProvider>
        <div className="app-container">
          <Sidebar selectedTab={selectedTab} setselectedTab={setselectedTab} />
          <div className="content">
            <Header />
            {selectedTab === "Home" ? <ListPost /> : <Createpost />}
            <Footer />
          </div>
        </div>
      </PostListProvider>
    </>
  );
}

export default App;
