import { Info } from "../CustomComponent/about/Info"
import { PatternsForm } from "../CustomComponent/form/PatternsForm"

export const UploadPattern = () => {
    return (
        <>
        {/* <Info name="Create New Pattern" bio="" styles={{ margin: 0, color: "palevioletred", fontSize: '1rem', textAlign : 'center' }} /> */}
        <div className="flex-container">
            <PatternsForm />

        </div>
        </>
    )
}