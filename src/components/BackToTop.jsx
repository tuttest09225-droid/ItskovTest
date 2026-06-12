// BackToTopButton.jsx
import useBackToTop from "../hooks/useBackToTop";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const { visible, scrollToTop } = useBackToTop();

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 z-50 bg-neutral text-secondary p-3 rounded-full shadow-lg hover:bg-accent/80 transition"
      aria-label="Back to top"
    >
      <FaArrowUp size={20} />
    </button>
  );
}