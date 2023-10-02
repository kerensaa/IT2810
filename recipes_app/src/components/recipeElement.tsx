
interface RecipeElementProps{
    imagePath: string,
    title: string,
    description: string,
}

export default function RecipeElement(props: RecipeElementProps){
    const {imagePath, title, description} = props;
    
    return (
        <section className="recipe-element">
            <img className="recipe-image" src={imagePath} alt={title} height={300}/>
            <h3 className="recipe-title">{title}</h3>
            <p className="recipe-info"> {description}</p>
        </section>
    )
}

