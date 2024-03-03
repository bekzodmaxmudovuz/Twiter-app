import React, { useCallback } from "react";
import Modal from "../ui/Modal";
import useLoginModal from "@/hooks/useLoginModal";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Button from "../ui/button";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validation";
import useRegisterModal from "@/hooks/useRegisterModal";

export default function LoginModal() {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    
  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
      })

      function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values);
        
      }
      const {isSubmitting} = form.formState

    const bodycontent =         <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
<FormField
control={form.control}
name="email"
render={({ field }) => (
<FormItem>
<FormControl>
  <Input placeholder="Email" {...field} />
</FormControl>
<FormMessage />
</FormItem>
)}
/>

<FormField
control={form.control}
name="password"
render={({field}) => (
  <FormItem>
      <FormControl>
          <Input placeholder="Password" type="password" {...field}/>
      </FormControl>
  </FormItem>
)}
/>
<Button label={"Register"} type="submit" secondary fullWidth large disabled={isSubmitting}/>

</form>
</Form>
const footer = (
    <div className="text-neutral-400 text-center mb-4">
    <p>
      First time using X?
      <span
        className="text-white cursor-pointer hover:underline"
        onClick={onToggle}
      >
        {" "}
        Create an account
      </span>
    </p>
  </div>
)
    return (
        <Modal
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            body={bodycontent}
            footer={footer}
        />
    )
}