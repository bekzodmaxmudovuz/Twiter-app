"use client"
import { IPost, IUser } from "@/types";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
interface Props {
    post: IPost;
    user: IUser;
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
  }
const PostItem = ({post} : {post: IPost}) => {
    return (
        <>
            
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
        <div className="flex flex-row items-center gap-3">
          <Avatar>
            <AvatarImage src={post.user.profileImage}/>
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>
        </>
    )
}

export default PostItem