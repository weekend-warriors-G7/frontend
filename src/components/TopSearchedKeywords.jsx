import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { FaStar } from "react-icons/fa";

const TopSearchedKeywords = () => {
  const [topKeywords, setTopKeywords] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Top 10 Most Searched Keywords</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="grid grid-cols-1 gap-4 relative">
        {topKeywords.map((item, index) => (
          <li
            key={index}
            className="relative flex items-center gap-2 p-3 bg-white rounded-lg shadow-md w-64"
          >
            {index < 3 && (
              <FaStar className="text-yellow-500" title="Top Keyword" />
            )}
            <span>{item.keyword}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSearchedKeywords;
