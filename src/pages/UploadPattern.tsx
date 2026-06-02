import { Info } from "../component/about/Info"
import { PatternsForm } from "../component/form/PatternsForm"
import { DisplayPattern } from "../component/patterns/DisplayPattern"

export const UploadPattern = () => {
    return (
        <>
        <Info name="Create New Pattern" bio="" styles={{ margin: 0, color: "palevioletred", fontSize: '1rem', textAlign : 'center' }} />
        <div className="flex-container">
            <PatternsForm />

            <DisplayPattern />
        </div>
        </>
    )
}