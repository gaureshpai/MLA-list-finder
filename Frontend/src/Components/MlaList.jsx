import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Loader from "./Loader";

const MlaList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const locations = useSelector((state) => state.location.locations);

  useEffect(() => {
    if (locations.length === 0) {
      setLoading(false);
      setError(true);
      return;
    }

    const locationData = locations[0];
    const { CityName, StateName } = locationData || {};

    if (!CityName || !StateName) {
      setLoading(false);
      setError(true);
      return;
    }

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/mlalist/${StateName}`)
      .then((response) => {
        const allData = response.data;

        const normalizedCityName = CityName.slice(0, 6).toLowerCase().trim();

        const filteredData = allData.filter((mla) => {
          const normalizedPlace = mla.place.slice(0, 6).toLowerCase().trim();
          return normalizedPlace === normalizedCityName;
        });

        setData(filteredData.length === 0 ? allData : filteredData);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.error(err);
      });
  }, [locations]);

  useEffect(() => {
    if (data.length > 5) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [data.length]);

  const isFullWidth = data.length <= 3;
  const filteredData = data.filter((mla) =>
    mla.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mla.place.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded-md bg-gray-100"
          placeholder="Search MLA by Name or Place"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on change
        />
      </div>

      {showAlert && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            transition: "opacity 0.5s ease-in-out",
            opacity: showAlert ? 1 : 0,
          }}
        >
          <div
            className="bg-white border shadow-sm rounded-xl dark:bg-neutral-200 dark:border-neutral-700 text-gray-800 text-center py-4 px-8 rounded-lg shadow-lg opacity-100 transform transition-all duration-300"
            style={{
              width: "300px", // Fixed size for square shape
              height: "300px",
            }}
          >
            <span
              className="text-lg font-medium text-center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              Please ensure you have selected a specific location. You may have retrieved MPs for the entire state, not just the region.
            </span>
            <button
              className="text-xl font-bold text-black absolute top-2 right-2 hover:cursor-pointer"
              onClick={() => setShowAlert(false)} // Close the alert
            >
              ✖
            </button>
          </div>
        </div>
      )}

      <div
        className={`grid gap-4 ${data.length > 3
            ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-5"
            : "grid-cols-1 sm:grid-cols-1 lg:grid-cols-1"
          }`}
      >
        {filteredData.map((mla, index) => (
          <div key={index}>
            <Card
              Name={mla.name}
              place={mla.place}
              age={mla.age}
              state={mla.state}
              party={mla.party}
              fullWidth={isFullWidth} // Passing the fullWidth prop to the Card component
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MlaList;