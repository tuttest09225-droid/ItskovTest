import { FiChevronUp } from "react-icons/fi";

export default function HideServiceDetailsButton({ onClick, visible }) {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-24 z-[999]
        bg-neutral text-white
        p-3 rounded-full
        shadow-lg
        hover:bg-accent
        transition
        flex items-center gap-2
      "
    >
      <FiChevronUp size={22}/>
      <span className="hidden md:block">
        Hide details
      </span>
    </button>
  );
}