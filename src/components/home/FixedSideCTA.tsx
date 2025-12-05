import { Link } from "react-router-dom";

const FixedSideCTA = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col">
      <Link
        to="/contact"
        className="bg-orange text-white px-3 py-6 text-sm font-semibold hover:bg-orange-light transition-colors"
        style={{ writingMode: "vertical-rl" }}
      >
        ENQUIRE NOW
      </Link>
      <Link
        to="/admissions"
        className="bg-sky-blue text-white px-3 py-6 text-sm font-semibold hover:bg-sky-blue-dark transition-colors"
        style={{ writingMode: "vertical-rl" }}
      >
        BOOK A TOUR
      </Link>
    </div>
  );
};

export default FixedSideCTA;
