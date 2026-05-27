import { Info } from "../component/about/Info"
import { CardComponent } from "../component/card/CardComponent"

export const PatternDetail = () => {
    return (
        <>
        <Info name="My Pattern List" bio="" styles={{ margin: 0, color: "palevioletred", fontSize: '1rem' }} />
        <div
    style={{
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

        gap: "24px",
        padding: "20px 50px",
       
    }}
>


    <CardComponent
        title="Keychains Crochet"
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