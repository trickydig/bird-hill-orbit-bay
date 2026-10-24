import React from "react";
import { createRoot } from "react-dom/client";
import { Portfolio } from "../../src/components/portfolio";
import "./styles.css";
createRoot(document.getElementById("root")!).render(<Portfolio />);
