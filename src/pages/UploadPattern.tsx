import { PatternUploadPage } from "../features/pattern-upload/PatternUploadPage"
import { Info } from "../CustomComponent/about/Info"
import { PatternsForm } from "../CustomComponent/form/PatternsForm"

export const UploadPattern = () => {
    return (
        <>
        {/* <Info name="Create New Pattern" bio="" styles={{ margin: 0, color: "palevioletred", fontSize: '1rem', textAlign : 'center' }} /> */}
        <div className="flex flex-col gap-5">
            <PatternUploadPage />
            {/* <PatternsForm /> */}

        </div>
        </>
    )
}