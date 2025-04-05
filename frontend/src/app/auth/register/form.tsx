"use client";
import Button from "@/components/button";
import TextInput from "@/components/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { GENDER } from "@/utils/types";

const registerSchema = z.object({
  first_name: z.string().min(2, "must be atleast 2 characters"),
  last_name: z.string().min(2, "must be atleast 2 characters"),
  email: z.string().email("invalid email"),
  password: z.string().min(6, "at least 6 characters are required"),
  repassword: z.string().min(6, "at least 6 characters are required"),
  phone: z.string().min(2, "must be atleast 2 characters"),
  dob: z.string().min(2, "must be atleast 2 characters"),
  gender: z.nativeEnum(GENDER, {
    errorMap: (issue) => {
      switch (issue.code) {
        case "invalid_type":
          return { message: "gender is required" };
        case "invalid_enum_value":
          return { message: "invalid gender" };
        default:
          return { message: issue.message ?? "" };
      }
    },
  }),
  address: z.string().min(2, "must be atleast 2 characters"),
});

type ISchema = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  console.log(errors);
  const onSubmit = async (e: ISchema) => {
    const { repassword, ...data } = e;
    await axios.post("/backend/auth/register", {
      ...data,
      role: "super_admin",
    });
    router.push("/auth/login");
  };

  return (
    <form
      className="flex flex-col gap-5 w-[350px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center font-bold text-xl">Register</div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-start gap-2">
          <TextInput
            label="First name"
            placeholder="Enter your first name"
            error={errors.first_name?.message}
            {...register("first_name")}
          />
          <TextInput
            label="Last name"
            placeholder="Enter your last name"
            error={errors.last_name?.message}
            {...register("last_name")}
          />
        </div>
        <div className="flex flex-row items-start gap-2">
          <TextInput
            label="Date of Birth"
            placeholder="Enter your dob"
            error={errors.dob?.message}
            {...register("dob")}
          />
          <TextInput
            label="Gender"
            placeholder="Enter your gender"
            error={errors.gender?.message}
            {...register("gender")}
          />
        </div>
        <TextInput
          label="Phone"
          placeholder="Enter your phone"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <TextInput
          label="Address"
          placeholder="Enter your address"
          error={errors.address?.message}
          {...register("address")}
        />
        <TextInput
          label="Email"
          placeholder="Enter your email address"
          type="email"
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
        <TextInput
          label="Confirm password"
          placeholder="Enter confirm password"
          type="password"
          error={errors.repassword?.message}
          {...register("repassword")}
        />
      </div>
      <Button variant="primary" type="submit">
        Register
      </Button>
      <div className="text-center">
        Already have an account?{" "}
        <Link
          href={"/auth/login"}
          className="outline-none text-primary ring-offset-1 focus:ring-2 focus:ring-primary-outline rounded"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
