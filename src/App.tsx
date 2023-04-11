import React from 'react';
import { z, ZodType } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css"

type FormData = {
  firstName : string,
  lastName : string,
  age: number,
  email: string,
  password: string,
  confirmPassword: string;
};

function App() {

  const schema: ZodType<FormData> = z
      .object({
        firstName: z.string().min(3).max(20),
        lastName: z.string().min(3).max(20),
        age: z.number().min(18).max(70),
        email : z.string().email(),
        password : z.string().min(7).max(30),
        confirmPassword : z.string().min(7).max(30),
       })
       .refine((data) => data.password === data.confirmPassword,{
        message : "Passwords do not match",
         path : ["confirmPassword"],

       });

       const {
        handleSubmit,
        register,
        formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),

       });
       const submitData = (data:FormData) =>{
        console.log("Well done!", data);

       };
 
  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
        <label>First name</label>
        <input type="text" {...register("firstName")}/>
        {errors.firstName && <span> {errors.firstName.message}</span>}
        <label>Last name</label>
        <input type="text" {...register("lastName")}/>
        {errors.lastName && <span> {errors.lastName.message}</span>}
        <label>Age</label>
        <input type="number" {...register("age", {valueAsNumber: true})}/>
        {errors.age && <span> {errors.age.message}</span>}
        <label>email</label>
        <input type="text" {...register("email")}/>
        {errors.email && <span> {errors.email.message}</span>}
        <label>password</label>
        <input type="password" {...register("password")}/>
        {errors.password && <span> {errors.password.message}</span>}
        <label>Confirm password</label>
        
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <span> {errors.confirmPassword.message}</span>
        )}
        <input type="submit" />
      </form>
      
    </div>
  );
}

export default App;
