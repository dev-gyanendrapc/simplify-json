import React from "react";
import Header from "./layout/Header";
import Body from "./layout/Body";
import Footer from "./layout/Footer";

const App = () => {
  return (
    <div className="m-0 p-0 h-screen">
      {/* header */}
      <div className="bg-slate-400 p-2">
        <Header />
      </div>
      {/* body */}
      <div className="p-3 h-5/6">
        <Body />
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default App;
