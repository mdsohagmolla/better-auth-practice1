"use client";
import { requestPasswordReset } from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField, Toast, toast} from "@heroui/react";

import React from 'react';

const ForgotPaswordPage = () => {

    const handleForgotPassword = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Convert FormData to plain object
    const userData = Object.fromEntries(formData.entries())
    // console.log('user data before submit', userData)

    // Todo : password reset korar jonno call kora
    const resData = await requestPasswordReset({
        email:userData.email,
        redirectTo: '/auth/reset-password'
    })
    toast.success('An email is sent to your email address please check.')

    console.log('after sending reset email', resData)

  
  };
    return (
        <div>
            <h1>Forgot password</h1>
            {/* ui form */}
            <Form className="flex w-96 flex-col gap-4" onSubmit={handleForgotPassword}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
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

export default ForgotPaswordPage;