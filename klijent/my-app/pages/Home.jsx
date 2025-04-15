import logo from "../images/logo.png";

const Home = () => {
  return (
    <main>
      <div className="container mt-4 mb-4">
        {/* Dodajemo d-flex, flex-column, justify-content-center i align-items-center za centriranje */}
        <div
          className="border border-warning p-3 rounded d-flex flex-column justify-content-center align-items-center"
          style={{ borderWidth: '1px' }}
        >
          <div className="row align-items-center">
            <div className="col-lg-4 text-center">
              <div
                className="border p-1 rounded"
                style={{ borderWidth: '1px', display: 'inline-block'}}
              >
                <img
                  src={logo}
                  alt="Tatamata"
                  className="img-fluid rounded"
                  style={{ maxWidth: "100%", height: "auto", borderRadius: "0.25rem"}}
                />
              </div>
            </div>

            {/* Ovaj div je sada centriran u odnosu na roditelj */}
            <div className="col-lg-8 text-center">
              <h2 className="mb-2">Matematika je laka!</h2>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ut alias officia fugit sed! Aliquam minus sint recusandae est porro excepturi, illo facere reprehenderit veniam officia, inventore modi. Eveniet, magnam.
                Ullam, porro nulla dolorum nam aperiam ipsam fugit numquam iusto! Repellendus, eos quae cupiditate aspernatur, atque dolor, veniam dolorum illum sit esse pariatur. Nostrum, consequuntur eaque dolorem molestiae exercitationem sed?
                Ea in laborum laudantium! Harum, culpa blanditiis, fugiat neque maiores perspiciatis veniam unde recusandae eaque deserunt, saepe molestias quibusdam? Quasi, unde minus? Ullam est, minima totam porro fuga corporis sed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
