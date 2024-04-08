import { Link } from "react-router-dom";

function BtnModal({ isLink, btnFunc, children }) {
  return isLink ? (
    <Link
      to="/"
      className="border-2 py-2 px-4 border-slate-950 hover:border-slate-800 hover:text-slate-800"
    >
      {children}
    </Link>
  ) : (
    <button
      type="button"
      onClick={btnFunc}
      className="border-2 py-2 px-4 border-slate-950 hover:border-slate-800 hover:text-slate-800 "
    >
      {children}
    </button>
  );
}

export default BtnModal;
