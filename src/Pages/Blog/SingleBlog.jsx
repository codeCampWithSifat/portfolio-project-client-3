const SingleBlog = ({ blog }) => {
  const { name, title, image, text } = blog;
  return (
    <div className="card card-compact  bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <h2 className="card-title">{name}</h2>
        <p>{text}</p>
        {/* <div className="card-actions justify-start">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
};

export default SingleBlog;
