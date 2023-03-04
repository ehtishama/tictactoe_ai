import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#modals");

function GameoverModal({ isOpen, onRequestClose, score = 1 }) {
  const style = {
    content: {
      height: "300px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={style}
        shouldCloseOnOverlayClick={false}
      >
        <div className="space-y-2">
          <h2 className="text-center text-2xl font-medium"> Game Over</h2>

          {score === 0 && (
            <div className="pt-4 ">
              <h2 className="text-2xl font-bold text-amber-500 text-center">
                It's a TIE
              </h2>

              <h2 className="text-lg text-center mt-4">
                Nice try! but you didn't win😂.
                <br /> Come again🫴.
              </h2>
            </div>
          )}

          {score === -1 && (
            <div className="pt-4 ">
              <h2 className="text-4xl font-bold text-red-500 text-center">
                YOU LOST.
              </h2>

              <h2 className="text-lg text-center mt-4">
                Such a loser, can't even win against a machine 😏.
                <br /> Wanna try again? 🫴
              </h2>
            </div>
          )}

          {score === 1 && (
            <div className="pt-4 ">
              <h2 className="text-4xl font-bold text-green-600 text-center">
                YOU WON.
              </h2>

              <h2 className="text-lg text-center mt-4">
                I was going easy on you 🤓.
                <br />
              </h2>
            </div>
          )}

          <div className="flex justify-center">
            <button
              className="border mt-6 py-2 px-4 rounded bg-green-600 text-white font-medium"
              onClick={onRequestClose}
            >
              Restart Game
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default GameoverModal;
