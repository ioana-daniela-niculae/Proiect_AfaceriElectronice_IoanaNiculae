import { useEffect, useState } from "react";
import { getProducts } from "./utils";

function Products(props) {
  const { filters, setFilters } = props;
  const [products, setProducts] = useState([]);

  const handleGetProducts = async () => {
    const data = await getProducts(filters);
    setProducts(data.products);
  };

  useEffect(() => {
    handleGetProducts();
  }, [filters]);

  // Aplicăm filtrul de căutare
  const filteredProducts = products.filter((product) => {
    if (filters.searchQuery) {
      return product.title
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());
    }
    return true;
  });

  // Sortăm produsele în funcție de preț (ascendent sau descendent)
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (filters.sortOrder === "asc") {
      return a.price - b.price; // Ascendent
    } else if (filters.sortOrder === "desc") {
      return b.price - a.price; // Descendent
    }
    return 0; // Fără sortare dacă nu este setată
  });

  return (
    <div className="products-container">
      {sortedProducts.length ? (
        sortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h2 className="product-title">{product.title}</h2>
            <div className="rating">
              <span style={{ paddingLeft: "4px", paddingRight: "4px" }}>
                {product.rating}
              </span>
              <span>({product.reviews.length})</span>
            </div>
            <div className="price-cart">
              <p className="price">${product.price.toFixed(2)}</p>
              <div>
                <button className="add-to-cart">
                  <i className="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
}

export default Products;
