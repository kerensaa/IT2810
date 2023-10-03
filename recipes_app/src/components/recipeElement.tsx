import { Rate } from 'antd';

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
            <div className="recipe-title"> 
            <h3 >{title}</h3>
            <Rate defaultValue={0}></Rate>
            </div>
            <p className="recipe-info"> {description}</p>
        </section>
    )
}

