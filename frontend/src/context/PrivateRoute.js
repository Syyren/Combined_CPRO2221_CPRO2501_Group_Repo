import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, roles, redirectPath = "/login", ...rest }) => {
  const { currentUser } = useAuth();

  // Check if user is logged in and has the required role
  if (!currentUser || !roles.includes(currentUser.role)) {
    //redirect to login page or supplied path on auth failure
    return <Navigate to={redirectPath} />; 
  }

  //render component if user passes auth
  return <Element {...rest}/>;
};

export default PrivateRoute;

// HOW TO USE:
// IN FILE WHERE ROUTING IS HANDLED (App.js)
// <BrowserRouter>
//  <Routes>
   
//    OLD
//    <Route path="/support" element={<UserSupport />} />

//    NEW
//    <Route
//      path="/support"                  //orginal Path
//      element={                        //Opening Route element
//          <PrivateRoute                //Setting Private Route Component
//          element={UserSupport}        //Page/Component you want to restrict goes in element={} without its < />
//          roles={["user", "agent"]} /> //Roles allowed access as List
//          redirectPath ="/about"       //Path to be redirected to (OPTIONAL) default is "/login"
//      }                                //Closing Route element
//    />
       
//  </Routes>
// </BrowserRouter>

