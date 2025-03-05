import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";

const SearchFilter = ({ onSearch, onCategoryChange, onSortChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = debounce((term) => {
    onSearch(term);
  }, 300);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className="filter-section">
      <div className="columns is-multiline is-mobile">
        <div className="column is-12-mobile is-6-tablet is-4-desktop">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <span className="icon is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="column is-12-mobile is-6-tablet is-4-desktop">
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <select onChange={(e) => onCategoryChange(e.target.value)}>
                  <option value="">All Categories</option>
                  <option value="CPU">CPUs</option>
                  <option value="GPU">Graphics Cards</option>
                  <option value="RAM">Memory</option>
                  <option value="Storage">Storage</option>
                  <option value="Motherboard">Motherboards</option>
                  <option value="PSU">Power Supplies</option>
                  <option value="Case">Cases</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-12-mobile is-6-tablet is-4-desktop">
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <select onChange={(e) => onSortChange(e.target.value)}>
                  <option value="">Sort By</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .filter-section {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
          }

          .input, .select select {
            border-radius: 4px;
            border: 1px solid #dbdbdb;
            transition: all 0.3s ease;
          }

          .input:focus, .select select:focus {
            border-color: #3273dc;
            box-shadow: 0 0 0 2px rgba(50,115,220,0.25);
          }

          .select:not(.is-multiple):not(.is-loading)::after {
            border-color: #3273dc;
          }

          @media screen and (max-width: 768px) {
            .column {
              margin-bottom: 0.75rem;
            }
          }
        `}
      </style>
    </div>
  );
};

SearchFilter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SearchFilter;
