import React from 'react';
import { Link } from 'react-router-dom';

export const Tags = ({ tags }) => {
  return (
    <div>
      <div className="tags">
        {tags?.map((tag, index) => (
          <p className="tag" key={index}>
            <Link
              to={`/tag/${tag}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {tag}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};
