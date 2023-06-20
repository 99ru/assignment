import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";

const useFetchReportData = () => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://startdeliver-mock-api.glitch.me/report");
        setReportData(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
      setIsLoading(false);
    };

    fetchReportData();
  }, []);

  return { reportData, isLoading };
};

const Home = () => {
  const { reportData, isLoading } = useFetchReportData();
  const chartRef = useRef(null);

  const totalARR = useMemo(() => reportData.reduce((total, report) => total + report.arr, 0), [reportData]);
  const formattedTotalARR = useMemo(() => (totalARR / 1000000).toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }), [totalARR]);

  const totalSeats = useMemo(() => reportData.reduce((total, report) => total + report.seats, 0), [reportData]);

  const maxARR = useMemo(() => Math.max(...reportData.map((item) => item.arr)), [reportData]);

  if (isLoading) {
    return (
    <div className="flex items-center justify-center h-screen">
      <div role="status">
        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-2">
      <strong>
        <h2 className="text-3xl mt-2 mb-10">Home</h2>
      </strong>
      <div>
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl mb-2 text-lightGrey">ARR:</h2>
            <strong>
              <p className="text-5xl">$ {formattedTotalARR} M</p>
            </strong>
          </div>
          <div className="mx-auto">
            <h2 className="text-2xl mb-2 text-lightGrey">SEATS</h2>
            <strong>
              <p className="text-5xl">{totalSeats}</p>
            </strong>
          </div>
        </div>
        <h2 className="mt-20 text-lightGrey">NEW ARR PER MONTH</h2>
        <div ref={chartRef} className="w-full">
          <svg className="w-full" height="300">
            {reportData.map((item, index) => (
              <g key={item.month}>
                <rect
                  x={`${index * (100 / reportData.length)}%`}
                  y={200 - (item.arr / maxARR) * 150}
                  width={`${100 / reportData.length - 2}%`}
                  height={(item.arr / maxARR) * 150}
                  fill="#2969ff"
                />
                <text
                  x={`${index * (100 / reportData.length) + (100 / reportData.length - 2) / 2}%`}
                  y={220}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="text-xs"
                >
                  {new Date(item.month).toLocaleString("en-US", { month: "short", year: "numeric" })}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="border-b"></div>
      </div>
    </div>
  );
};

export default Home;
