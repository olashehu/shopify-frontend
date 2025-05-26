"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { validateField } from "@/app/lib/validateField";
import {
  FieldProps,
  ErrorsProps,
  initialSignupValues,
  initialTouchedState,
  DecodedToken,
  baseURL
} from "@/app/lib/constant";
import { useCart } from "@/app/context/cartContext";

const Signup = ({ tab }: { tab: string }) => {
  const { setUser } = useCart();
  const [inputValue, setInputValue] = useState<FieldProps>(initialSignupValues);
  const [touched, setTouched] = useState(initialTouchedState);
  const [errors, setErrors] = useState<ErrorsProps>({});

  function onHandleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function onHandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = {
      userName: validateField("userName", inputValue.userName),
      email: validateField("email", inputValue.email),
      phoneNumber: validateField("phoneNumber", inputValue.phoneNumber),
      password: validateField("password", inputValue.password),
    };
    const hasErrors = Object.values(validationErrors).some((error) => error);
    if (hasErrors) {
      setErrors(validationErrors);
      setTouched({
        userName: true,
        email: true,
        phoneNumber: true,
        password: true,
      });
      return;
    }
    try {
      const formToSubmit = {
        ...inputValue,
        role: tab,
      };
      // const res = await axios.post(
      //   "http://localhost:4000/auth/signup",
      //   formToSubmit
      // );
      const res = await axios.post(
        `${baseURL}/auth/signup`,
        formToSubmit
      );

      if (res.statusText !== "Created") return;

      toast.success("Signup successful!");
      setInputValue(initialSignupValues);
      const decode: DecodedToken = jwtDecode(res.data.access_token);
      setUser({
        sub: decode?.sub,
        email: decode.email,
        username: decode.username,
        phone: decode.phone,
        role: decode.role,
        token: res.data.access_token,
      });
      // redirect user back to previous page;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message =
          error.response.data?.error || "An unexpected error occurred";
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const newErrors: ErrorsProps = {};
      for (const field in touched) {
        if (touched[field as keyof FieldProps]) {
          const key = field as keyof FieldProps;
          const error = validateField(key, inputValue[key]);
          if (error) {
            newErrors[key] = error;
          }
        }
      }
      setErrors(newErrors);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, touched]);

  return (
    <form
      onSubmit={onHandleSubmit}
      className="mt-2 w-[300px] flex flex-col gap-4 mx-auto"
    >
      <div className="space-y-1">
        <label htmlFor="userName">username</label>
        <Input
          id="userName"
          name="userName"
          onChange={onHandleChange}
          value={inputValue.userName}
          aria-describedby={errors.userName ? "error-userName" : undefined}
          required
        />
        {errors.userName && (
          <span id="error-userName" style={{ color: "red" }}>
            {errors.userName}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <label htmlFor="email">email</label>
        <Input
          type="email"
          id="email"
          name="email"
          onChange={onHandleChange}
          value={inputValue.email}
          aria-describedby={errors.email ? "error-email" : undefined}
          required
        />
        {errors.email && (
          <span id="error-email" style={{ color: "red" }}>
            {errors.email}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <label htmlFor="phoneNumber">phone number</label>
        <Input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          onChange={onHandleChange}
          value={inputValue.phoneNumber}
          aria-describedby={
            errors.phoneNumber ? "error-phoneNumber" : undefined
          }
          required
        />
        {errors.phoneNumber && (
          <span id="error-phoneNumber" style={{ color: "red" }}>
            {errors.phoneNumber}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <label htmlFor="password">password</label>
        <Input
          type="password"
          id="password"
          name="password"
          onChange={onHandleChange}
          value={inputValue.password}
          aria-describedby={errors.password ? "error-password" : undefined}
          required
        />
        {errors.password && (
          <span id="error-password" style={{ color: "red" }}>
            {errors.password}
          </span>
        )}
      </div>
      <Button>Sign up</Button>
    </form>
  );
};

export default Signup;
