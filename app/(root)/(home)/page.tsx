
import Form from "@/components/shared/form"
import Header from "@/components/shared/header"
import { authOptions } from "@/lib/auth-options"
import { getServerSession } from "next-auth"

export default async function Page() {
    const session: any = await getServerSession(authOptions)
    return <>

        <Header label="Home" isBack/>
        <Form placeholder="What's on Your mind ?"  user={JSON.parse(JSON.stringify(session.currentUser))}/>
    </>
}