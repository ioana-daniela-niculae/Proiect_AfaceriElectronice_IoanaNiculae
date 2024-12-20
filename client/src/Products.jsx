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

  return (
    <div className="products-container">
      {products?.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.thumbnail} alt={product.title} />
          <h2 className="product-title">{product.title}</h2>
          <div className="rating">
            {/* {renderStars(Math.round(product.rating))} */}
            <span style={{ paddingLeft: "4px", paddingRight: "4px" }}>
              {product.rating}
            </span>
            <span>({product.reviews.length})</span>
          </div>
          <div className="price-cart">
            <p className="price">${product.price.toFixed(2)}</p>
            <div>
              <button
                className="add-to-cart">
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;