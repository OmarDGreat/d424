import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="hero is-fullheight-with-navbar"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Image with Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'url("https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)",
          animation: "scale 30s infinite alternate",
        }}
      />

      <div className="hero-body" style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8 has-text-centered">
              <h1
                className="title is-1 has-text-white mb-6"
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "800",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  animation: "slideDown 0.8s ease-out",
                }}
              >
                Build Your Dream PC
              </h1>
              <h2
                className="subtitle is-3 has-text-white mb-6"
                style={{
                  maxWidth: "800px",
                  margin: "0 auto",
                  lineHeight: "1.4",
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                  animation: "slideUp 0.8s ease-out",
                }}
              >
                Premium Components. Expert Support. Unbeatable Prices.
              </h2>
              <div
                className="buttons is-centered mt-6"
                style={{ animation: "fadeIn 1s ease-out" }}
              >
                <Link
                  to="/products"
                  className="button is-primary is-large has-text-weight-bold px-6"
                  style={{
                    borderRadius: "50px",
                    backgroundColor: "#3273dc",
                    transition: "all 0.3s ease",
                    transform: "translateY(0)",
                    padding: "1.5rem 3rem",
                    fontSize: "1.25rem",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(50, 115, 220, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span>Shop Now</span>
                  <span className="icon ml-2">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes scale {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.1);
            }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
