
interface RecipeElementProps{
    imagePath: string,
    title: string,
    description: string,
}

export default function RecipeElement(props: RecipeElementProps){
    const {imagePath, title, description} = props;
    
    return (
        <section>
            <h3>{title}</h3>
            <img src={imagePath} alt={title} height={300}/>
            <p>{description}</p>
        </section>
    )
}

