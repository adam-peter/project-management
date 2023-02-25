"use client";
import React, { useCallback, useState } from "react";

import { useRouter } from "next/navigation"; //not "next/router"!

import Input from "./Input";
import Button from "./Button";
import Card from "./Card";
import { register, signin } from "@/lib/api";

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome back!",
  subheader: "Enter your credentials to access your account",
  buttonText: "Signin",
};

const initial = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

type AuthFormType = {
  mode: string;
};

const AuthForm: React.FC<AuthFormType> = (props) => {
  const { mode } = props;
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: SubmitEvent) => {
      e.preventDefault();

      try {
        if (mode === "register") {
          await register(formState);
        } else {
          await signin(formState);
        }
        setFormState({ ...initial });
        router.replace("/home");
      } catch (err) {
        setError(`Could not ${mode}`);
      }
    },
    [
      formState.email,
      formState.password,
      formState.firstName,
      formState.lastName,
    ]
  );

  const content = mode === "register" ? registerContent : signinContent;

  return (
    <Card className="">
      <div className="w-full">
        <div className="text-center">
          <h2 className="mb-2 text-3xl">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full py-10">
          {mode === "register" && (
            <div className="mb-8 flex justify-between">
              <div className="pr-2">
                <div className="mb-4 ml-2 text-lg text-black/50">
                  First Name
                </div>
                <Input
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  className="border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="pl-2">
                <div className="mb-4 ml-2 text-lg text-black/50">Last Name</div>
                <Input
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="mb-4 ml-2 text-lg text-black/50">Email</div>
            <Input
              required
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg"
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-8">
            <div className="mb-4 ml-2 text-lg text-black/50">Password</div>
            <Input
              required
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg"
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="font-bold text-blue-600"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default AuthForm;