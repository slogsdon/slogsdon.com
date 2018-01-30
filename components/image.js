const Image = (props) => (
  <div className="outer-container">
    <div className="inner-container">
      <div
        style={{
          width: "100%",
          paddingBottom: props.height ? props.height : "100px",
        }}
      />
      <img className="image" src={props.src} />
    </div>
    <style jsx>{`
      .outer-container {
        z-index: 0;
        position: relative;
      }

      .inner-container {
        position: relative;
        overflow: hidden;
        z-index: 1;
      }

      .image {
        position: absolute;
        top: 0px;
        left: 0px;
        transition-duration: 0.5s;
        transition-timing-function: initial;
        transition-property: opacity;
        opacity: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    `}</style>
  </div>
);

export default Image;
