import { jsx, Fragment } from "react/jsx-runtime";
import { u as useHelmet } from "../entry-server.js";
import { useEffect } from "react";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "@loadable/component";
import "react-router-dom";
import "framer-motion";
const Contact = (props) => {
  const helmet = useHelmet();
  useEffect(() => {
    helmet.setTitle("Contact");
  }, [helmet]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("h1", { children: "Contact Page" }) });
};
export {
  Contact as default
};
