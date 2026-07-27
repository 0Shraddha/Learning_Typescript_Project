import { Textarea } from '../../../components/ui/textarea';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import React from 'react'
import { useForm } from 'react-hook-form'

const PatternDetailTab = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      materials: {
        hookSize: '',
        woolType: '',
        woolColors: ''
      },
    }
  });

  return (
    <div className="">
      <form onSubmit={handleSubmit((data) => console.log(data))} className="space-y-7">
<div className="flex justify-between gap-4 space-y-1.5">
          <div className="flex-1">
          <Label htmlFor="title" className="text-[#141413] font-medium my-2">Title</Label>
          <Input
            id="title"
            {...register("title", { required: "*Title is required" })}
            placeholder="Enter title..."
            className="border-[#E5E1D8] bg-white text-[#141413] placeholder:text-[#8A8577] focus-visible:ring-[#d97d26] focus-visible:ring-offset-0 focus-visible:border-[#d97d26]"
          />
          {errors?.title && (
            <p className="text-sm text-[#C1440E]">{errors.title.message}</p>
          )}
        </div>
        <div className="flex-wrap">
          <Label htmlFor="coverImage" className="text-[#141413] font-medium mb-2">Cover Image</Label>
          <Input
            id="coverImage"
            {...register("coverImage")}
            type="file"
            className="cursor-pointer border-[#E5E1D8] bg-white text-[#141413] file:mr-4 file:rounded-md file:border-0 file:bg-[#d97d26] file:px-3 file:text-sm file:font-medium file:text-white hover:file:bg-[#C1440E]"
          />
        </div>
</div>

        <div className="space-y-1.5">
          <Label htmlFor="description" className="text-[#141413] font-medium">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Enter description..."
            rows={4}
            className="border-[#E5E1D8] bg-white text-[#141413] placeholder:text-[#8A8577] focus-visible:ring-[#d97d26] focus-visible:ring-offset-0 focus-visible:border-[#d97d26]"
          />
        </div>

        <div className="space-y-4 rounded-xl border border-[#E5E1D8] bg-white/60 p-5">
          <Label className="text-sm font-semibold uppercase tracking-wide text-[#8A8577]">Materials</Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="hookSize" className="text-[#141413] font-medium">Hook Size</Label>
              <Input
                id="hookSize"
                {...register("materials.hookSize", { required: "*Hook size is required" })}
                placeholder="eg: 1.5 (in mm)"
                className="border-[#E5E1D8] bg-white text-[#141413] placeholder:text-[#8A8577] focus-visible:ring-[#d97d26] focus-visible:ring-offset-0 focus-visible:border-[#d97d26]"
              />
              {errors?.materials?.hookSize && (
                <p className="text-sm text-[#C1440E]">{errors.materials.hookSize.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="woolType" className="text-[#141413] font-medium">Wool Type</Label>
              <Input
                id="woolType"
                {...register("materials.woolType", { required: "*Wool Type is required" })}
                placeholder="eg: cotton"
                className="border-[#E5E1D8] bg-white text-[#141413] placeholder:text-[#8A8577] focus-visible:ring-[#d97d26] focus-visible:ring-offset-0 focus-visible:border-[#d97d26]"
              />
              {errors?.materials?.woolType && (
                <p className="text-sm text-[#C1440E]">{errors.materials.woolType.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="woolColors" className="text-[#141413] font-medium">Wool Colors</Label>
              <Input
                id="woolColors"
                {...register("materials.woolColors", { required: "*Wool color is required" })}
                placeholder="eg: white, red, ..."
                className="border-[#E5E1D8] bg-white text-[#141413] placeholder:text-[#8A8577] focus-visible:ring-[#d97d26] focus-visible:ring-offset-0 focus-visible:border-[#d97d26]"
              />
              {errors?.materials?.woolColors && (
                <p className="text-sm text-[#C1440E]">{errors.materials.woolColors.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#E5E1D8] pt-5">
          <button
            type="reset"
            className="rounded-md border border-[#E5E1D8] bg-white px-4 py-2 text-sm font-medium text-[#141413] transition-colors hover:bg-[#F4F1EA]"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-md bg-[#d97d26] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#C1440E]"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  )
}

export default PatternDetailTab