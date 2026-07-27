import Header from "../../../components/ui/custom/Header"
import PatternCards from "./PatternCards"

export const PatternList = () => {
    return (
        <div className="">
            <Header sub="my pattern gallery" heading="Patterns Collection" />
            <PatternCards />
        </div>
    )
}