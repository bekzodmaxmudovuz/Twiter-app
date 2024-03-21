"use client"
import { IPost, IUser } from "@/types";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import {formatDistanceToNowStrict} from "date-fns"
import { AiFillDelete, AiOutlineMessage } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "../ui/use-toast";
import axios from "axios";
interface Props {
    post: IPost;
    user: IUser;
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
  }
const PostItem = ({post, user , setPosts } : Props) => {
    const [isLoading, setIsloading] = useState(false)
    const onDelete =  async () => {
      try {
        setIsloading(true)
        await axios.delete(`/api/posts`, {
          data: {
            postId: post._id,
          }
        })
        setPosts((prev) => prev.filter((p) => p._id !== post._id))
        setIsloading(false)
      } catch (error) {
        setIsloading(false)
        return toast ({
          title: "Error",
          description: "Something went wrong. Please try again later."
        });
      }
    }

    const onLike = async () => {
      try {
          setIsloading(true);
          if(post.hasLiked) {
             await axios.delete(`/api/likes`, {
              data: {
                postId: post._id,
                userId: user._id,
              }
            })
          } else {
             await axios.put(`/api/likes`, {
              postId: post._id,
              userId: user._id,
            })
            
          }

          setIsloading(false)
      } catch (error) {
        setIsloading(false)
        return({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive"
        })
      }
    }
    return (
        <>
            
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
        <div className="flex flex-row items-center gap-3">
          <Avatar>
            <AvatarImage src={post.user.profileImage}/>
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>

          <div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-white font-semibold cursor-pointer hover:underline">
                {post.user.name}
              </p>

              <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                {post.user.username ? `${sliceText(post.user.username, 16)}` : sliceText(post.user.email, 16)}
              </span>

              <span className="text-neutral-500 text-sm">
                    {formatDistanceToNowStrict(new Date(post.createdAt))} ago
              </span>
            </div>

            <div className="text-white mt-1">{post.body}</div>

            <div className="flex flex-row items-center mt-3 gap-10">
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                <AiOutlineMessage size={20}/>
                <p>{post.comments || 0}</p>
              </div>
              <div className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
                onClick={onLike}
                >
                  <FaHeart size={20} color={post.hasLiked ? "red" : ""}/>
                  <p>{post.likes}</p>
              </div>
              
              {post.user._id === user._id && (
              <div
                className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`} 
                onClick={onDelete}
              >
                <MdDelete size={20} />
              </div>
            )}
            </div>
            
          </div>
        </div>
      </div>
        </>
    )
}

export default PostItem