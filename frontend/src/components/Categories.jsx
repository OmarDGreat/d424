import React from 'react';

const Categories = () => {
  const categories = ['Electronics', 'Clothing', 'Accessories', 'Home & Living'];

  return (
    <div className="container">
      <h2 className="title has-text-centered">Shop by Categories</h2>
      <div className="columns is-multiline mt-5">
        {categories.map((category) => (
          <div className="column is-one-quarter" key={category}>
            <div className="box has-text-centered">
              <p className="title is-5">{category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
