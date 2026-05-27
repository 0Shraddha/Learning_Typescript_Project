import { Info } from "../component/about/Info"
import { PatternsForm } from "../component/form/PatternsForm"

export const UploadPattern = () => {
    return (
        <>
        <Info name="Create New Pattern" bio="" styles={{ margin: 0, color: "palevioletred", fontSize: '1rem' }} />
        <PatternsForm />
        </>
    )
}