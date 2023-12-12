import { useState } from "react";

export const Pagination = ({ page, setPage }) => {
  const [range, setRange] = useState([1, 8]);

  const pages = Array.from(
    { length: range[1] - range[0] + 1 },
    (_, i) => i + range[0]
  );

  const handleNext = () => {
    setRange([range[0] + 9, range[1] + 9]);
  };

  const handlePrev = () => {
    if (range[0] > 1) {
      setRange([range[0] - 9, range[1] - 9]);
    }
  };

  const handlePrevMobile = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
      <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
        <div
          className="flex md:hidden items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
          onClick={handlePrevMobile}
        >
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.1665 4H12.8332"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.1665 4L4.49984 7.33333"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.1665 4.00002L4.49984 0.666687"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
        </div>
        <div
          className="hidden md:flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
          onClick={handlePrev}
        >
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.1665 4H12.8332"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.1665 4L4.49984 7.33333"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.1665 4.00002L4.49984 0.666687"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
        </div>
        <div className="sm:flex hidden">
          {pages.map((p, index) => (
            <p
              key={index}
              className={`text-sm font-medium leading-none cursor-pointer ${
                p === page
                  ? "text-indigo-700 border-t border-indigo-400"
                  : "text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400"
              } pt-3 mr-4 px-2`}
              onClick={() => setPage(p)}
            >
              {p}
            </p>
          ))}
        </div>
        <div
          className="hidden md:flex  items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
          onClick={handleNext}
        >
          <p className="text-sm font-medium leading-none mr-3">Next</p>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.1665 4H12.8332"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 7.33333L12.8333 4"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 0.666687L12.8333 4.00002"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className="flex md:hidden  items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
          onClick={() => setPage(page + 1)}
        >
          <p className="text-sm font-medium leading-none mr-3">Next</p>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.1665 4H12.8332"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 7.33333L12.8333 4"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 0.666687L12.8333 4.00002"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
