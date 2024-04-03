import Carousel from "react-bootstrap/Carousel";
import img from "../Layout/image/slides/beauty.jpg";

function ExampleCarouselImage() {
  return (
    <>
      <img
        src={img}
        alt="beautyimg"
        style={{
          width: "100%",
          height: "67vh",
        }}
      />
    </>
  );
}

function HomePage() {
  return (
    <Carousel
      style={{
        height: "70%",
        width: "90%",
        marginLeft: "3.8rem",
        display: "inline-block",
      }}
    >
      <Carousel.Item>
        <ExampleCarouselImage text="First slide" />
        <Carousel.Caption>
          <h3>React-crud-sample</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomePage;
