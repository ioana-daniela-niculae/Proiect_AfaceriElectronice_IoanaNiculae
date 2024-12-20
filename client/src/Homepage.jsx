import { useState } from "react";
import Products from "./Products";
import Filters from "./Filters";

function Homepage() {
  const [filters, setFilters] = useState({
    category: "",
  });

  return (
    <div className="homepageWrapper">
      <Filters setFilters={setFilters} />
      <div>
        <Products filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
}

export default Homepage;
