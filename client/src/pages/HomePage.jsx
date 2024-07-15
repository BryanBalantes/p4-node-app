import Layout from "../components/Layout/Layout";
import Carousel from "../components/Hero/Carousel";
import SampleProducts from "../components/SampleProducts/SampleProducts";
import images from "../data/images";
import productImage from "../data/productImage";
const HomePage = () => {
  return (
    <Layout title={"Best offers"}>
      <Carousel images={images} />
      <SampleProducts productImage={productImage} />
    </Layout>
  );
};

export default HomePage;
