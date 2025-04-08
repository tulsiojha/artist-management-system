"use client";
import Button from "@/components/button";
import TextInput from "@/components/input";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Select from "@/components/select";
import { formatDateToString, genders } from "@/utils/commons";
import { registerSchema } from "@/lib/schemas";
import { USER_ROLE } from "@/utils/types";
import { user } from "@/lib/api-client";
import Datepicker from "@/components/date-picker";

type ISchema = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (e: ISchema) => {
    const { repassword, ...data } = e;
    return user.register(
      {
        ...data,
        role: USER_ROLE.SUPER_ADMIN,
        dob: formatDateToString(data.dob),
      },
      () => {
        router.push("/auth/login");
      },
    );
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
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <Datepicker
                label="Dob"
                placeholder="Enter dob"
                error={errors.dob?.message}
                value={formatDateToString(field.value)}
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
          <Select label="Gender" items={genders} {...register("gender")} />
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
      <Button variant="primary" type="submit" loading={isSubmitting}>
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
