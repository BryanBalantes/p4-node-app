/* eslint-disable react/prop-types */
import "../../styles/SampleProducts.css";

const SampleProducts = ({ productImage }) => {
  return (
    <div className="product-images">
      {productImage.map((image, index) => (
        <div key={index} className="product-image">
          <img src={image.image}></img>
        </div>
      ))}
    </div>
  );
};

export default SampleProducts;
