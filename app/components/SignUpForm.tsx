"use client";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import validator from "validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from "./PasswordStrength";
import { registerUser } from "@/lib/actions/authActions";
import { toast } from "react-toastify";

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be atleast 2 characters")
      .max(45, "First name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    lastName: z
      .string()
      .min(2, "Last name must be atleast 2 characters")
      .max(45, "Last name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number!"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
    accepted: z.literal(true, {
      errorMap: () => ({
        message: "Please accept all terms",
      }),
    }),
    isAdmin: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  const [passStrength, setPassStrength] = useState(0);
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch().password]);
  const toggleVisblePass = () => setIsVisiblePass((prev) => !prev);

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { accepted, confirmPassword, ...user } = data;
    try {
      const result = await registerUser(user);
      toast.success("The User Registered Successfully.");
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(saveUser)} className="max-w-sm mx-auto">
      <div className="text-white bg-gradient-to-b from-white to-slate-200 dark:from-slate-700 dark:to-slate-900 p-2 text-center">
        Sign up
      </div>
      <Input
        errorMessage={errors.firstName?.message}
        isInvalid={!!errors.firstName}
        {...register("firstName")}
        placeholder="First Name"
        className="col-span-2 mb-3"
        // startContent={<UserIcon className="w-4" />}
      />
      <Input
        errorMessage={errors.lastName?.message}
        isInvalid={!!errors.lastName}
        {...register("lastName")}
        placeholder="Last Name"
        className="col-span-2 mb-3"
        // startContent={<UserIcon className="w-4" />}
      />
      <Input
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        {...register("email")}
        className="col-span-2 mb-3"
        placeholder="Email"
        // startContent={<EnvelopeIcon className="w-4" />}
      />{" "}
      <Input
        errorMessage={errors.phone?.message}
        isInvalid={!!errors.phone}
        {...register("phone")}
        className="col-span-2 mb-3"
        placeholder="Phone"
        // startContent={<PhoneIcon className="w-4" />}
      />{" "}
      <Input
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        {...register("password")}
        className="col-span-2 mb-3"
        placeholder="Password"
        type={isVisiblePass ? "text" : "password"}
        // startContent={<KeyIcon className="w-4" />}
        endContent={
          isVisiblePass ? (
            <EyeSlashIcon
              className="w-4 cursor-pointer mt-3"
              onClick={toggleVisblePass}
            />
          ) : (
            <EyeIcon
              className="w-4 cursor-pointer"
              onClick={toggleVisblePass}
            />
          )
        }
      />
      <div className="mb-3">
        <PasswordStrength passStrength={passStrength} />
      </div>
      <Input
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        {...register("confirmPassword")}
        className="col-span-2"
        placeholder="Confirm Password"
        type={isVisiblePass ? "text" : "password"}
        // startContent={<KeyIcon className="w-4" />}
      />
      <Controller
        control={control}
        name="accepted"
        render={({ field }) => (
          <Checkbox
            onChange={field.onChange}
            onBlur={field.onBlur}
            className="col-span-2 mb-3"
          >
            I Accept The <Link href="/terms">Terms</Link>
          </Checkbox>
        )}
      />
      {!!errors.accepted && (
        <p className="text-red-500">{errors.accepted.message}</p>
      )}
      <div className="flex justify-center col-span-2 mb-3">
        <Button className="w-48" color="primary" type="submit">
          Submit
        </Button>
      </div>
      <div className="md:col-span-2 flex justify-center items-center">
        <h5 className="text-center p-2">Already Signed up?</h5>
        <Link href={"/auth/signin"}>Sign In</Link>
      </div>
    </form>
  );
};

export default SignUpForm;
