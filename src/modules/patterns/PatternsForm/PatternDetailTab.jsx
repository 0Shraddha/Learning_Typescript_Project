import { Textarea } from '../../../components/ui/textarea';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import React from 'react'
import { useForm } from 'react-hook-form'

const PatternDetailTab = () => {

  const {register, handleSubmit,reset, formState: {errors}} = useForm({
    defaultValues: {
      title : '',
      description: '',
      materials: {
        hook_size: '',
        wool_type: '',
        wool_colors: ''
      },
    }
  });



  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Label htmlFor="title">Title</Label>
      <Input
        {...register("title", {required: "*Title is required"})}
        placeholder='Enter title...'
      />
      <p className='text-red-600 text-sm'>{errors?.title?.message}</p>

      <Label htmlFor="description">Description</Label>
      <Textarea
        {...register("description")}
        name='description'
        placeholder='Enter description...'
         />

<Label>Materials</Label>
<div className="flex">
      <div className="col">
        <Label>Hook Size</Label>
        <Input
        {...register("materials.hook_size", {required: "*Hook size is required"})}
        placeholder='eg: 1.5 (in mm)'
        />
      <p className='text-red-600 text-sm'>{errors?.materials?.hook_size?.message}</p>

      </div>
      <div className="col">
        <Label>Wool Type</Label>
        <Input
        {...register("materials.wool_type", {required: "*Wool Type is required"})}
        placeholder='eg: cotton'
        />
      <p className='text-red-600 text-sm'>{errors?.materials?.wool_type?.message}</p>

      </div>
      <div className="col">
        <Label>Wool Colors</Label>
        <Input
        {...register("materials.wool_colors", {required: "*Wool color is required"})}
        placeholder='eg: white, red, ...'
        />
      <p className='text-red-600 text-sm'>{errors?.materials?.wool_colors?.message}</p>

      </div>
</div>

      <Input type='reset'/>
      <Input type='submit'/>
      
    
</form>
      
    </div>
  )
}

export default PatternDetailTab
