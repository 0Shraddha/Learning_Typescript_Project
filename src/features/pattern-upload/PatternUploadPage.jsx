import { useState } from "react";
import FooterNav from "./components/FooterNav"
import ProgressTabs from "./components/ProgressTabs"
import { useCrochetFormStore } from "../../store/useCrochetFormStore";

export const PatternUploadPage = () => {
    const [activeTab, setActiveTab ] = useState(0);

    const formData = useCrochetFormStore((state) => state.formData);
    console.log(formData)
    return (
        <>
        This is the main Pattern Upload page where we add all the components:
         ← top-level: owns the tab state + form state

FOrmData === 
<br/>
Title - {formData?.title}<br/>
Description -{formData?.description} <br/>
Materials - Hook ({formData?.materials?.hook}), Wool Type ({formData?.materials?.woolType}), Wool Colors({formData?.materials?.woolColors})
Image - <img src={formData?.coverImage} height="100" width="100" />

        <ProgressTabs activeTab = {activeTab} setActiveTab={setActiveTab} />
        <FooterNav activeTab={activeTab} setActiveTab={setActiveTab} />

        </>
    )
}