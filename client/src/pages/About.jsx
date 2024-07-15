import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img src="/images/Logo.png" alt="About" style={{ height: "20rem", width: "20rem" }} />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">About us</h1>
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vitae
            aliquid nulla id, tempora iste, esse soluta quis aliquam,
            necessitatibus excepturi repellendus dolorem sequi ullam.
            Dignissimos cumque iste soluta rerum?
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
