import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { FaStar } from "react-icons/fa";

const TopSearchedKeywords = () => {
  const [topKeywords, setTopKeywords] = useState([]);
  const [error, setError] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchTopKeywords = async () => {
      try {
        const response = await axiosInstance.get(
          "/statistics/most-wanted-number"
        );
        const top10Keywords = response.data.slice(0, 10);
        setTopKeywords(top10Keywords);
      } catch (e) {
        console.error(`Error fetching top 10 keywords: ${e}`);
        setError("Failed to fetch top 10 keywords.");
      }
    };
    fetchTopKeywords();
  }, []);

  const leftColumn = topKeywords.slice(0, 5);
  const rightColumn = topKeywords.slice(5, 10);

  return (
    <div className="p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4">Top 10 Most Searched Keywords</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex space-x-4  font-bold">
        <ul className="flex flex-col space-y-4">
          {leftColumn.map((item, index) => (
            <li
              key={index}
              className="relative flex items-center gap-2 p-3 bg-white rounded-lg shadow-md w-64"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {index < 3 && (
                <FaStar className="text-yellow-500" title="Top Keyword" />
              )}
              <span>{item.keyword}</span>
              {hoveredIndex === index && (
                <div
                  className="absolute top-[39px] left-1/2 transform -translate-x-1/2 bg-accentColour text-white text-sm rounded px-3 py-1 shadow-lg z-10"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {item.number} searches
                </div>
              )}
            </li>
          ))}
        </ul>

        <ul className="flex flex-col space-y-4">
          {rightColumn.map((item, index) => (
            <li
              key={index + 5}
              className="relative flex items-center gap-2 p-3 bg-white rounded-lg shadow-md w-64"
              onMouseEnter={() => setHoveredIndex(index + 5)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span>{item.keyword}</span>
              {hoveredIndex === index + 5 && (
                <div
                  className="absolute top-[39px] left-1/2 transform -translate-x-1/2 bg-accentColour text-white text-sm rounded px-3 py-1 shadow-lg z-10"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {item.number} searches
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopSearchedKeywords;