'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react';
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField, toast} from "@heroui/react";
import { resetPassword } from '@/lib/auth-client';


const ResetPasswordForm = () => {
    // next.js doc use params dewa ace kivabe use korte hbe
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    

    const handleResetPassword = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Convert FormData to plain object
    const userData = Object.fromEntries(formData.entries());
    

    // resetPassword k call kore dibo
    const resData = await resetPassword({
        newPassword: userData.password,
        token

    })
    toast.success('your password change succussfully')
    console.log('after reset submit', resData)
  
  };
    return (
        <div>
            <h1>Now give me new  password</h1>
            {/* hero ui form */}
            <Form className="flex w-96 flex-col gap-4" onSubmit={handleResetPassword}>
      
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
        </div>
    );
};

export default ResetPasswordForm;
