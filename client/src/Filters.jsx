import { useEffect, useState } from "react";
import { getProductCategories } from "./utils";

const Filters = (props) => {
  const { setFilters } = props;
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order is ascending

  const handleGetProductCategories = async () => {
    const response = await getProductCategories();
    setCategories(response);
  };

  const handleCategoryChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: event.target.value,
    }));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuery: searchInput,
    }));
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortOrder: order,
    }));
  };

  useEffect(() => {
    if (!categories.length) {
      handleGetProductCategories();
    }
  }, []);

  return (
    <div className="filtersWrapper">
      <div>
        <label htmlFor="categorySelect">Category</label>
      </div>
      <div>
        <select id="categorySelect" onChange={handleCategoryChange}>
          {/* Opțiunea "All products" */}
          <option value="">All products</option>
          
          {/* Maparea categoriilor din API */}
          {categories?.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: "10px" }}>
        <form onSubmit={handleSearchSubmit} className="searchForm">
          <input
            type="text"
            className="searchInput"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="searchButton">
            <i className="fas fa-search"></i> Search
          </button>
        </form>
      </div>

      {/* Butoane pentru sortarea produselor */}
      <div style={{ marginTop: "10px" }}>
        <button
          className="sortButton"
          onClick={() => handleSortChange("asc")}
          style={{
            backgroundColor: sortOrder === "asc" ? "#007bff" : "#ccc",
          }}
        >
          Sort by Price: Low to High
        </button>
        <button
          className="sortButton"
          onClick={() => handleSortChange("desc")}
          style={{
            backgroundColor: sortOrder === "desc" ? "#007bff" : "#ccc",
          }}
        >
          Sort by Price: High to Low
        </button>
      </div>
    </div>
  );
};

export default Filters;
