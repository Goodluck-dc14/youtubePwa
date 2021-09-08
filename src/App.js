// import React from "react";
// import HomeScreen from "./FirebaseWork/HomeScreen";

// const App = () => {
//   return (
//     <div>
//       <HomeScreen />
//     </div>
//   );
// };

// export default App;

import React from "react";
import "antd/dist/antd.css";
import Home from "./Youtube/Home";
import MyPost from "./Youtube/MyPost";
import Detail from "./Youtube/Detail";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Youtube/Header";
import YouSign from "./Youtube/YouSign";
// import TopPart from "./TheComp/TopPart";
// import ViewScreen from "./TheComp/ViewScreen";
// import SecureRoute from "./TheComp/SecureRoute";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        {/* <TopPart /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/MyPost" component={MyPost} />
          <Route exact path="/YouSign" component={YouSign} />
          {/* <SecureRoute exact path="/view" component={ViewScreen} /> */}
          <Route exact path="/Detail/:id" component={Detail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
