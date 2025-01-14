import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

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
        setTopKeywords(top10Keywords.map((item) => item.keyword));
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
      <div
        className="bg-white p-4 rounded-md shadow-lg"
        style={{ maxWidth: "400px", marginLeft: "0" }}
      >
        <ul className="list-disc list-inside">
          {topKeywords.map((keyword, index) => (
            <li key={index} className="py-1">
              {keyword}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopSearchedKeywords;
