"use client";
import Button from "@/components/button";
import TextInput from "@/components/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import handleErrors from "@/utils/handleErrors";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type ISchema = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (e: ISchema) => {
    try {
      await axios.post("/backend/auth/login", {
        ...e,
      });
      router.push("/dashboard");
    } catch (err) {
      toast.error(handleErrors(err), { richColors: true, closeButton: true });
    }
  };

  return (
    <form
      className="flex flex-col gap-5 w-[300px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center font-bold text-xl">Login</div>
      <div className="flex flex-col gap-2">
        <TextInput
          label="Email"
          placeholder="Enter your email address"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextInput
          label="Password"
          placeholder="Enter password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>
      <Button variant="primary" type="submit" loading={isSubmitting}>
        Login
      </Button>
      <div className="text-center">
        Don't have an account?{" "}
        <Link
          href={"/auth/register"}
          className="outline-none text-primary ring-offset-1 focus:ring-2 focus:ring-primary-outline rounded"
        >
          Signup
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
