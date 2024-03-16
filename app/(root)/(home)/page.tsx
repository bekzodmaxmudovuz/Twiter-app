"use client"
import Form from "@/components/shared/form";
import Header from "@/components/shared/header";
import { authOptions } from "@/lib/auth-options";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page () {
  const {data: session, status}:any = useSession();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      try {
        setIsLoading(true)
        const {data}  = await axios.get("/api/posts?limit=10" )
      } catch (error) {
        console.log(error);
        setIsLoading(false)        
      }
    }
  }, [])
  return (
    <>
      <Header label="Home"/>
      {isLoading || status === "loading" ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" /> 
        </div>
      ): (
        <>
                <Form 
        placeholder="What's on your mind?"
        user={JSON.parse(JSON.stringify(session.currentUser))}
      />
        </>
      )}


    </>
  )
}