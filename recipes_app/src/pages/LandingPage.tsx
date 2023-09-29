import { mockUsers } from '../mockData/mockData'
import '../styling/LandingPage.css'

function LandingPage() {

  const titles: string[] = mockUsers.map((recipe)=> recipe.title);

  return (
    <>
      <h1>Recipes</h1>
      <section> {titles} </section>
    </>
  )
}

export default LandingPage
