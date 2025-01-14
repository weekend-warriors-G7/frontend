import TopSearchedKeywords from "../components/TopSearchedKeywords";

const AnalyticsDashboard = () => {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Analytics Dashboard
      </h1>
      <TopSearchedKeywords />
    </div>
  );
};

export default AnalyticsDashboard;
