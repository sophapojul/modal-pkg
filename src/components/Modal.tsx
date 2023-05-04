import React from "react";
import { CSSProperties, PropsWithChildren, useRef } from "react";

import useCloseOnOverlay from "../hooks/useCloseOnOverlay";
import useCloseOnEscapeKey from "../hooks/useCloseOnEscapeKey";

const styles: { [key: string]: CSSProperties } = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modalContent: {
    position: "relative",
    maxWidth: "400px",
    width: "90%",
    backgroundColor: "#fff",
    padding: "15px 30px",
    borderRadius: "8px",
  },
  modalButton: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    width: "30px",
    height: "30px",
    color: "#fff",
    backgroundColor: "#000",
    borderRadius: "50%",
    fontWeight: "700",
    fontSize: "1.2em",
  },
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * React component for a modal dialog
 * @param isOpen - boolean
 * @param onClose - () => void
 * @param children - ReactNode
 * @returns React component
 */
export function Modal({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) {
  const overlayRef = useRef<HTMLDivElement>(null);
  useCloseOnEscapeKey(onClose);
  useCloseOnOverlay(onClose, overlayRef);
  if (isOpen) {
    return (
      <div style={styles.modal} role="dialog">
        <div style={styles.modalOverlay} ref={overlayRef} />
        <div
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="successDialog"
          aria-describedby="dialog_desc"
          style={styles.modalContent}
        >
          <button type="button" style={styles.modalButton} onClick={onClose}>
            x
          </button>
          <div id="dialog_desc">{children}</div>
        </div>
      </div>
    );
  }
}
