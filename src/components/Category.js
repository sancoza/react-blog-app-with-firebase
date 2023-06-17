import React from 'react';
import { Link } from 'react-router-dom';

export const Category = ({ catgBlogsCount }) => {
  return (
    <div className="widget">
      <div className="blog-heading text-start py-2 mb-4">Category</div>
      <div className="link-widget">
        <ul>
          {catgBlogsCount?.map((item, index) => (
            <li key={index}>
              <Link
                to={`/category/${item.category}`}
                style={{ textDecoration: 'none', color: '#777', float: 'left' }}
              >
                {item.category}
                <span>({item.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
