import { useState } from "react";
import Products from "./Products";
import Filters from "./Filters";

function Homepage() {
  const [filters, setFilters] = useState({
    category: "",
    searchQuery: "", // Adăugăm filtrul pentru căutare
  });

  return (
    <div className="homepageWrapper">
      {/* Bara de filtre include și bara de căutare */}
      <Filters filters={filters} setFilters={setFilters} />
      <div>
        {/* Transmitem filtrele actualizate către componentele de produse */}
        <Products filters={filters} />
      </div>
    </div>
  );
}

export default Homepage;
