import { Link } from "react-router-dom";
import RecipeElement from "../components/recipeElement";
import { mockUsers } from "../mockData/mockData";
import "../styling/LandingPage.css";
import "../styling/recipeElement.css";
import React from 'react';
import { Input } from 'antd';
import Pagination from '@mui/material/Pagination';




function LandingPage() {

  const { Search } = Input;

  return (
    <>
      <h1></h1>
      <Search placeholder="Search" style={{ paddingTop: 40, maxWidth: 600 }} />
      <section className="recipe-grid">
        {mockUsers.map((recipe) => (
          <div className="recipe-element" key={recipe.id}>
            <Link to={`/${recipe.id}`}>
              <RecipeElement
                imagePath={recipe.icon_path}
                title={recipe.title}
                description={recipe.description}
              />
            </Link>
          </div>
        ))}
      </section>
      <div className="pagination-container">
      <Pagination count={20} color="secondary" shape="rounded"/>
      </div>
    </>
    
  );
}

export default LandingPage;
