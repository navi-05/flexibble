

import ProfilePage from "@/components/ProfilePage"
import { getUserProjects } from "@/libs/actions"
import { UserProfile } from "@/types"

const UserProfile = async ({ params: { id }}: { params: { id: string }}) => {
  
  const result = await getUserProjects(id, 100) as { 
    user: UserProfile
  }

  if(!result?.user) {
    return <p className="no-result-text">Failed to fetch user info</p>
  }

  return (
    <ProfilePage user={result?.user} />
  )
}

export default UserProfile