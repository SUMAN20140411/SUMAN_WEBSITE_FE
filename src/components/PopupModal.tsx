import React from "react";

interface PopupModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-3xl max-h-[80vh] overflow-y-auto p-8 rounded-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="text-sm leading-relaxed whitespace-pre-line text-gray-700">
          {content}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
