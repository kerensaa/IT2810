describe('Click on recipe', () => {
  beforeEach('successfully loads', () => {
    cy.visit('/');
  });

  xit('can click on a page', () => {
    cy.wait(2000);

    cy.get('.recipe-element').contains('Arbi Shimla Mirch Sabzi Recipe – Colocasia Capsicum Sabzi').click();
    cy.wait(2000);
    cy.url().should('include', 'http://it2810-32.idi.ntnu.no/project2/3');
    cy.wait(2000);
    cy.get('.back-button').click();
    cy.url().should('include', 'http://it2810-32.idi.ntnu.no/project2/');
  });
});

describe('Use pagination on landing page', () => {
  beforeEach('successfully loads', () => {
    cy.visit('/');
  });

  xit('can use pagination and click', () => {
    cy.wait(5000);
    cy.get('[aria-label="Go to next page"]').click();
    cy.wait(2000);
    cy.get('[aria-label="Go to next page"]').click();
    cy.wait(2000);
    cy.get('[aria-label="Go to next page"]').click();
    cy.wait(2000);
    cy.get('[aria-label="Go to previous page"]').click();
    cy.wait(2000);
    cy.get('[aria-label="Go to next page"]').click();
    cy.wait(2000);
    cy.get('.recipe-element').contains('Mangalorean Style Sonay Sukka Recipe - Dry Chickpea Stir Fry').click();
    cy.url().should('include', 'http://it2810-32.idi.ntnu.no/project2/30');
  });
});

describe('Search on landing page', () => {
  beforeEach('successfully loads', () => {
    cy.visit('/');
  });

  it('can search', () => {
    cy.get('#combo-box-demo').click();
    cy.wait(3000);
    cy.get('.MuiPopper-root').contains('Ambur Style Brinjal Curry Recipe').click();
    cy.wait(2000);
    cy.get('.recipe-element .recipe-title').contains('Ambur Style Brinjal Curry Recipe').click();
    cy.wait(2000);
    cy.get('.back-button').click();
    cy.wait(2000);
    cy.get('#combo-box-demo').click();
    cy.wait(2000);
    cy.get('#combo-box-demo').type('konkani{enter}');
    cy.wait(2000);
    cy.get('.recipe-element').contains(
      'Konkani Style Mooga Ghushi Recipe-Sprouted Whole Green Gram In Tangy Coconut Gravy',
    );
    cy.wait(2000);
    cy.get('[aria-label="Clear"]').click();
    cy.wait(2000);
    cy.get('#combo-box-demo').type('ha{enter}');
    cy.wait(2000);
    cy.get('.recipe-element').eq(1).click();
    cy.wait(2000);
    cy.get('.back-button').click();
    cy.wait(2000);
    cy.get('#combo-box-demo').type('esfhnosbf{enter}');

    cy.get('.recipe-grid').should('not.have.descendants');
    cy.get('.recipe-grid').should('have.text', 'No results');
    cy.get('[aria-label="Clear"]').click();
  });
});
describe('Favorite and un-favorite on landing page', () => {
  beforeEach('successfully loads', () => {
    cy.visit('/');
  });
  it('can favorite and and un-favorite', () => {
    cy.wait(4000);
    cy.get('.recipe-element').eq(6).find('.rate-and-favorite .button-placement .h-container').click();
    cy.wait(2000);
    cy.get('.recipe-element').eq(6).find('.rate-and-favorite .button-placement .h-container.favorited').should('exist');
    cy.wait(2000);
    cy.contains('My Favorites').click();
    cy.wait(2000);
    cy.url().should('include', 'http://it2810-32.idi.ntnu.no/project2/MyFavorites');
    cy.wait(2000);
    cy.get('.recipe-element')
      .contains('Konkani Style Mooga Ghushi Recipe-Sprouted Whole Green Gram In Tangy Coconut Gravy')
      .should('exist');
    cy.wait(2000);
    cy.get('.back-button').click();
    cy.wait(2000);
    cy.get('.recipe-element').eq(6).find('.rate-and-favorite .button-placement .h-container.favorited').click();
    cy.wait(2000);
    cy.get('.recipe-element')
      .eq(6)
      .find('.rate-and-favorite .button-placement .h-container.favorited')
      .should('not.exist');
    cy.contains('My Favorites').click();
    cy.wait(2000);
    cy.url().should('include', 'http://it2810-32.idi.ntnu.no/project2/MyFavorites');
    cy.wait(2000);
    cy.get('.recipe-element')
      .contains('Konkani Style Mooga Ghushi Recipe-Sprouted Whole Green Gram In Tangy Coconut Gravy')
      .should('not.exist');
    cy.wait(2000);
    cy.get('.back-button').click();
    cy.url().should('include', 'http://it2810-32.idi.ntnu.no/project2/');
  });
});

describe('Rate recipe on landing page', () => {
  beforeEach('successfully loads', () => {
    cy.visit('/');
  });
  it('can rate', () => {
    cy.wait(4000);
    cy.get('.recipe-element').eq(5).find('.MuiRating-root').contains('4 Stars').click();
    cy.wait(2000);
    cy.get('.recipe-element')
      .eq(5)
      .find('.MuiRating-root')
      .contains('4 Stars')
      .find('.MuiRating-iconFilled')
      .should('exist');
    cy.wait(2000);
    cy.contains('My Ratings').click();
    cy.wait(2000);
    cy.url().should('include', 'http://it2810-32.idi.ntnu.no/project2/MyRatings');
    cy.wait(2000);
    cy.get('.recipe-element').contains('Cabbage And Carrot Thoran Recipe').should('exist');
    cy.wait(2000);
    cy.get('.back-button').click();
    cy.wait(2000);
    cy.url().should('include', 'http://it2810-32.idi.ntnu.no/project2/');
    cy.get('.recipe-element').eq(5).find('.MuiRating-root').contains('2 Stars').click();
    cy.get('.recipe-element')
      .eq(5)
      .find('.MuiRating-root')
      .contains('4 Stars')
      .find('.MuiRating-iconFilled')
      .should('not.exist');
  });
});

describe('Sort and filter the recipes', () => {
  beforeEach('successfully loads', () => {
    cy.visit('/');
  });
  it('can sort and filter', () => {
    cy.wait(2000);
    cy.get('.sort_select').click();
    cy.wait(1000);
    cy.get('[data-value="prep_time"]').click();
    cy.wait(1000);
    cy.get('.sort_select').click();
    cy.get('.MuiMenuItem-gutters').contains('Prep Time').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-value="prep_time"]').click();
    cy.wait(1000);
    cy.get('.MuiInputBase-root .MuiSelect-select').contains('No filter').click();
    cy.wait(1000);
    cy.get('[data-value="Lunch"]').click();
    cy.get('.MuiInputBase-root .MuiSelect-select').contains('Lunch').click();
    cy.get('.MuiList-root .MuiMenuItem-root').contains('Lunch').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-value="Main Course"]').click();
    cy.get('.MuiInputBase-root .MuiSelect-select').contains('Main Course').click();
    cy.get('.MuiList-root .MuiMenuItem-root').contains('Main Course').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-value="Main Course"]').click();
    cy.get('.sort_select').click();
    cy.get('[data-value="name"]').click();
    cy.get('.sort_select').click();
    cy.get('.MuiMenuItem-gutters').contains('Name').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-value="name"]').click();
    cy.get('.MuiInputBase-root .MuiSelect-select').contains('Main Course').click();
    cy.get('[data-value="Dinner"]').click();
    cy.get('.MuiInputBase-root .MuiSelect-select').contains('Dinner').click();
    cy.get('.MuiList-root .MuiMenuItem-root').contains('Dinner').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-value="Side Dish"]').click();
    cy.get('.MuiInputBase-root .MuiSelect-select').contains('Side Dish').click();
    cy.get('.MuiList-root .MuiMenuItem-root').contains('Side Dish').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-value="Snack"]').click();
    cy.get('.MuiInputBase-root .MuiSelect-select').contains('Snack').click();
    cy.get('.MuiList-root .MuiMenuItem-root').contains('Snack').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-value="North Indian Breakfast"]').click();
    cy.get('.MuiInputBase-root .MuiSelect-select').contains('North Indian Breakfast').click();
    cy.get('.MuiList-root .MuiMenuItem-root')
      .contains('North Indian Breakfast')
      .should('have.attr', 'aria-selected', 'true');
    cy.get('[data-value="North Indian Breakfast"]').click();
    cy.wait(1000);
    cy.get('.sort_select').click();
    cy.wait(1000);
    cy.get('[data-value="default"]').click();
    cy.get('.sort_select').click();
    cy.get('.MuiMenuItem-gutters').contains('No Sorting').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-value="default"]').click();
    cy.wait(1000);
    cy.get('.MuiInputBase-root .MuiSelect-select').contains('North Indian Breakfast').click();
    cy.wait(1000);
    cy.get('[data-value="Dessert"]').click();
    cy.wait(1000);
    cy.get('.MuiInputBase-root .MuiSelect-select').contains('Dessert').click();
    cy.wait(1000);
    cy.get('.MuiList-root .MuiMenuItem-root').contains('Dessert').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-value="South Indian Breakfast"]').click();
    cy.get('.MuiInputBase-root .MuiSelect-select').contains('South Indian Breakfast').click();
    cy.get('.MuiList-root .MuiMenuItem-root')
      .contains('South Indian Breakfast')
      .should('have.attr', 'aria-selected', 'true');
    cy.get('[data-value="default"]').click();
    cy.get('.MuiInputBase-root .MuiSelect-select').contains('No filter').click();
    cy.get('.MuiList-root .MuiMenuItem-root').contains('No filter').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-value="default"]').click();
  });
});

describe('Check if sorting works', () => {
  beforeEach('successfully loads', () => {
    cy.visit('/');
  });
  it('check if sorted', () => {
    cy.wait(2000);
    cy.get('.sort_select').click();
    cy.get('[data-value="name"]').click();
    cy.wait(1000);
    cy.get('.recipe-grid').then(($elements) => {
      const texts = $elements.map((index, element) => Cypress.$(element).text()).get();
      const sortedTexts = [...texts].sort();
      expect(texts).to.deep.equal(sortedTexts);
    });
  });
});
describe('Rate, facorite and comment on individual page', () => {
  beforeEach('successfully loads', () => {
    cy.visit('/');
  });
  it('Rate, favorite and comment on individual page', () => {
    cy.wait(6000);
    cy.get('.recipe-element').eq(4).click();
    cy.wait(2000);
    cy.get('.recipe-card .App').click();
    cy.get('.recipe-card .recipe-card-content').find('.h-container.favorited').should('exist');
    cy.wait(1000);
    cy.get('.recipe-card .App').click();
    cy.get('.recipe-card .recipe-card-content').find('.h-container.favorited').should('not.exist');
    cy.wait(2000);
    cy.get('.rating-card .rating-box-style').find('.MuiRating-root').contains('1 Star').click();
    cy.get('.rating-card .rating-box-style')
      .find('.MuiRating-root')
      .contains('1 Star')
      .find('.MuiRating-iconFilled')
      .should('exist');
    cy.get('.rating-card .rating-box-style')
      .find('.MuiRating-root')
      .contains('2 Stars')
      .find('.MuiRating-iconFilled')
      .should('not.exist');
    cy.get('.rating-text-holder textarea').type('jnowenfc wenck soinicodlssjnco');
    cy.get('.rating-card .post-button').click();
    cy.get('.MuiAccordionSummary-content').click();
    cy.get('.comment-paper-div .comment-delete-div .comment-delete ').click({ force: true, multiple: true });
    cy.get('.rating-text-holder textarea').type('Did not like, too much mango :(');
    cy.get('.rating-card .post-button').click();
    cy.get('.rating-text-holder textarea').type('MANGO HATEEEE');
    cy.get('.rating-card .post-button').click();
    cy.wait(2000);
    cy.get('.comment-paper-div .comment-delete-div .comment-delete').eq(1).click({ force: true, multiple: true });
    cy.get('.comment-paper .comment-text-div').contains('MANGO HATEEEE').should('not.exist');
    cy.get('.comment-paper .comment-text-div').contains('jnowenfc wenck soinicodlssjnco').should('not.exist');
    cy.get('.comment-paper .comment-text-div').contains('Did not like, too much mango :(').should('exist');
    cy.wait(2000);
    cy.contains('My Ratings').click();
    cy.wait(2000);
    cy.url().should('include', 'http://it2810-32.idi.ntnu.no/project2/MyRatings');
    cy.wait(2000);
    cy.get('.recipe-element').contains('Mavinakayi Menasinakai Curry Recipe - Raw Mango Coconut Curry').should('exist');
    cy.wait(2000);
    cy.contains('My Favorites').click();
    cy.wait(2000);
    cy.url().should('include', 'http://it2810-32.idi.ntnu.no/project2/MyFavorites');
    cy.wait(2000);
    cy.get('.recipe-element')
      .contains('Mavinakayi Menasinakai Curry Recipe  - Raw Mango Coconut Curry')
      .should('not.exist');
    cy.wait(2000);
    cy.get('.back-button').click();
    cy.url().should('include', 'http://it2810-32.idi.ntnu.no/project2/');
  });
});
