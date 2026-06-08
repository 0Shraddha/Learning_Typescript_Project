import { Link } from "react-router-dom"
import { Info } from "../CustomComponent/about/Info"
import { CardComponent } from "../CustomComponent/card/CardComponent"

export const PatternList = () => {
    return (
        <>
        <Info name="My Pattern List" bio="" styles={{ margin: 0, color: "palevioletred", fontSize: '1rem', textAlign: 'center' }} />
        <div
    style={{
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

        gap: "24px",
        padding: "20px 50px",
       
    }}
>


<Link to="/pattern-detail" style={{ textDecoration: 'none' }}>
    <CardComponent
        title="Strawberry Keychain"
        count={24}
    />
</Link>

<CardComponent
        title="Tapestry Crochet"
        count={18}
    />

    <CardComponent
        title="Knitting Collections"
        count={32}
    />


    <CardComponent
        title="Strawberry Keychain"
        count={24}
    />
    
    <CardComponent
        title="Tapestry Crochet"
        count={18}
    />

    <CardComponent
        title="Knitting Collections"
        count={32}
    />

</div>
        </>

    )
}