"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateField } from "@/app/lib/validateField";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { DecodedToken, baseURL } from "../lib/constant";
import { useCart } from "../context/cartContext";

interface LoginInputProps {
  email: string;
  password: string;
}
interface ErrorProps {
  email?: string;
  password?: string;
}

const Login = () => {
  const router = useRouter();
  const { setUser } = useCart();
  const [inputValue, setInputValue] = useState<LoginInputProps>({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [error, setError] = useState<ErrorProps>({});
  const [loading, setLoading] = useState<boolean>(false);

  function onHandleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function onHandleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      // const res = await axios.post(
      //   "http://localhost:4000/auth/login",
      //   inputValue
      // );
      const res = await axios.post(`${baseURL}/auth/login`, inputValue);
      console.log(res.data, '<====>')
      if (!res.data) return;

      setInputValue({ email: "", password: "" });
      setTouched({ email: false, password: false });
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
      setLoading(false);
      setTimeout(() => {
        toast.success("Login successful!");
      }, 5000);
      console.log('after set time out')
      router.back()
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message =
          error.response.data?.error || "An unexpected error occurred";
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.log(error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const newErrors: ErrorProps = {};
      for (const field in touched) {
        const key = field as keyof LoginInputProps;
        if (touched[key]) {
          const errorMsg = validateField(key, inputValue[key]);
          if (errorMsg) {
            newErrors[key] = errorMsg;
          }
        }
      }
      setError(newErrors);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <form onSubmit={onHandleSubmit} className="mt-10">
      <div className="shadow w-full max-w-sm mx-auto p-3 bg-white flex flex-col gap-3">
        <div className="space-y-2">
          <label htmlFor="email">email</label>
          <Input
            type="email"
            id="email"
            name="email"
            aria-describedby={
              touched.email && error.email ? "error-email" : undefined
            }
            value={inputValue.email}
            onChange={onHandleChange}
          />
          {touched.email && error.email && (
            <span id="error-email" style={{ color: "red" }}>
              {error.email}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="password">password</label>
          <Input
            type="password"
            id="password"
            name="password"
            aria-describedby={
              touched.password && error.password ? "error-password" : undefined
            }
            value={inputValue.password}
            onChange={onHandleChange}
          />
          {touched.password && error.password && (
            <span id="error-password" style={{ color: "red" }}>
              {error.password}
            </span>
          )}
        </div>
        <div className="text-end">
          <Link href="/signup" className="font-bold text-gray-400">
            click here to signup
          </Link>
        </div>
        <Button disabled={loading}>Login</Button>
      </div>
    </form>
  );
};

export default Login;
