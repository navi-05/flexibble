

import Modal from "@/components/Modal"
import ProjectForm from "@/components/ProjectForm"
import { getProjectDetails } from "@/libs/actions"
import { getCurrentUser } from "@/libs/session"
import { ProjectInterface } from "@/types"
import { redirect } from "next/navigation"

const EditProject = async ({params: {id}}: { params: { id: string }}) => {

  const session = await getCurrentUser()

  if(!session?.user) redirect('/')

  const result = await getProjectDetails(id) as {
    project?: ProjectInterface
  }

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm
        type='edit'
        session={session}
        project={result?.project}
      />
    </Modal>
  )
}

export default EditProject