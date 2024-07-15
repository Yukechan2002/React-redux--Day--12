import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeFromCart } from "./cartSlice";

const Card = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const overallTotal = useSelector((state) => state.cart.overallTotal);

  const handleQuantitySub = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const handleQuantityAdd = (id, quantity, stock) => {
    if (quantity < stock) {
      dispatch(updateQuantity({ id, quantity: quantity + 1 }));
    }
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-6 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex align-items-center">
                <div className="row">
                  <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <img
                      src={product.images}
                      alt={product.title}
                      className="img-fluid"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div>
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text">
                        <b>Brand:</b> {product.brand}
                      </p>
                      <p className="card-text">
                        <b>Price:</b> ${product.price}
                      </p>
                      <p className="card-text">
                        <b>Discount:</b> {product.discountPercentage}%
                      </p>
                      <p className="card-text">
                        <b>Stock:</b> {product.stock}
                      </p>
                      <p className="card-text">
                        <b>Rating:</b> {product.rating}
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() =>
                          handleQuantitySub(product.id, product.quantity || 1)
                        }
                      >
                        -
                      </button>
                      <span>{product.quantity || 1}</span>
                      <button
                        className="btn btn-secondary ms-2"
                        onClick={() =>
                          handleQuantityAdd(
                            product.id,
                            product.quantity || 1,
                            product.stock
                          )
                        }
                      >
                        +
                      </button>
                      <button
                        className="btn btn-danger ms-4"
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <div>
                  <h6>
                    Subtotal: $
                    {(
                      (product.price -
                        (product.price * product.discountPercentage) / 100) *
                      (product.quantity || 1)
                    ).toFixed(2)}
                  </h6>
                </div>
                <div>
                  <h6>Overall Price: ${overallTotal}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
