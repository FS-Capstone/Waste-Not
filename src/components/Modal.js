import React from "react";
import { Button, IconButton } from "@mui/material";
import { AccountCircleIcon } from "@mui/icons-material";
import ReactDom from "react-dom";

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
};

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        {children}

        <Button
          variant="contained"
          onClick={onClose}
          style={{ position: "absolute", right: "0px", top: "0px" }}
        >
          Close
        </Button>
      </div>
    </>,
    document.getElementById("portal")
  );
}
