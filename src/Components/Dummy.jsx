import React from 'react';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w1280/';

export default function Dummy({ title, poster_path, vote_average }) {
  return (
    <div className="script-container">
      <img src={IMG_BASE_URL + poster_path} alt="영화포스터" />
      <div className="script-info">
        <h4>{title}</h4>
        <span>{vote_average}</span>
      </div>
    </div>
  );
}
