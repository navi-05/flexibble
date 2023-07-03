'use client'

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { ProjectInterface, SessionInterface } from "@/types";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createProject, fetchToken, updateProject } from "@/libs/actions";

interface ProjectFormProps {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  type,
  session,
  project
}) => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    image: project?.image || '',
    title: project?.title || '',
    description: project?.description || '',
    liveSiteUrl: project?.liveSiteUrl || '',
    githubUrl: project?.githubUrl || '',
    category: project?.category || ''
  })

  const router = useRouter()
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    // Getting the file from the event
    const file = e.target.files?.[0]
    if(!file) return;
    if(!file.type.includes('image')) {
      return alert('Please upload an image file')
    }

    // Reading the file URL 
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      handleStateChange('image', result)
    }
  }

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)

    const { token } = await fetchToken()

    try {

      if(type === 'create') {
        await createProject(form, session?.user?.id, token)
      }

      if(type === 'edit') {
        await updateProject(form, project?.id!, token)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === 'create'}
          className="form_image-input"
          onChange={handleChange}
        />
        {form.image && (
          <Image 
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project-Poster"
            fill
          />
        )}
      </div>

      <FormField 
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange('title', value)}
      />

      <FormField 
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects"
        setState={(value) => handleStateChange('description', value)}
      />

      <FormField 
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://yourwebsite.com"
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />

      <FormField 
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder="https://github.com/yourname"
        setState={(value) => handleStateChange('githubUrl', value)}
      />

      {/* <FormField 
        type='url'
        title="LinkedIn URL"
        state={form.linkedInUrl}
        placeholder="https://linkedin.com/yourname"
        setState={(value) => handleStateChange('linkedInUrl', value)}
      /> */}

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className="flexStart w-full">
        <Button
          title={isSubmitting ? `${type === 'create' ? 'Creating' : 'Editing' }` : `${type === 'create' ? 'Create' : 'Edit'}` }
          type="submit"
          leftIcon={isSubmitting ? '' : '/plus.svg'}
          isSubmitting={isSubmitting}
        />
      </div>

    </form>
  )
}

export default ProjectForm