import { useCrochetFormStore } from '../../../../store/useCrochetFormStore'
import Label from '../../../../CustomComponent/form/Label'
import { UploadMedia } from '../../../../CustomComponent/form/UploadMedia'
import React from 'react'

const DetailStep = () => {

  const formData = useCrochetFormStore((state) => state.formData);
  const updateDetail = useCrochetFormStore((state) => state.updateField);
  const updateMaterial = useCrochetFormStore((state) => state.updateMaterialField )

  return (
            <div className="flex gap-6">
              <div className="col">
                <Label name="Title" isRequired={true} />
                <input
                  className="input-field"
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => updateDetail('title', e.target.value)}
                />

                <Label name="Description" isRequired={true} />
                <textarea 
                  className='input-field'
                  type="text"
                  name='description'
                  placeholder='Write about the crochet piece..'
                  value={formData.description}
                  onChange={(e) => updateDetail('description', e.target.value)}
                  rows={3}
                  />
                <br />
      
                <div className="materials-wrapper">
                  <Label name="Materials" isRequired={true} />
                  <div className="hook-wool-wrapper">
                    <input
                      className="input-field"
                      type="text"
                      name="hook"
                      placeholder="Hook Size (mm)"
                      value={formData.materials.hook}
                      onChange={(e) => updateMaterial('hook', e.target.value)}
                    />
      
                    <input
                      className="input-field"
                      type="text"
                      name="woolType"
                      placeholder="Wool Type"
                      value={formData.materials.woolType}
                      onChange={(e) => updateMaterial('woolType', e.target.value)}
                    />
      
                    <input
                      className="input-field"
                      type="text"
                      name="woolColors"
                      placeholder="Wool Colors"
                      value={formData.materials.woolColors}
                      onChange={(e) => updateMaterial('woolColors', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="media-container">
                  <Label name="Media" isRequired={true} />
                  <div className="media-wrapper">
                    <UploadMedia
                            // Pass the image string from the store if your component supports it
                      value={formData.coverImage}
                      // Adjust this based on how your custom UploadMedia returns the file/URL
                      onChange={(url) => updateDetail('coverImage', url)}
                    />
                  </div>
                </div>
              </div>
            </div>

            

  )
}

export default DetailStep
