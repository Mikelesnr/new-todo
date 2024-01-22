"use client";
import { forgotPassword } from "@/lib/actions/authActions";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Appbar from "@/app/components/Appbar";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
});

type InputType = z.infer<typeof FormSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const submitRequest: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await forgotPassword(data.email);
      if (result) toast.success("Reset password link was sent to your email.");
      reset();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div>
      <Appbar />
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(submitRequest)}>
        <div className="mb-3 text-white bg-gradient-to-b from-white to-slate-200 dark:from-slate-700 dark:to-slate-900 p-2 text-center">
          Enter Your Email
        </div>
        <Input
          placeholder="Email"
          className="col-2 mb-3"
          {...register("email")}
          // startContent={<EnvelopeIcon className="w-4" />}
          errorMessage={errors.email?.message}
        />
        <div className="mb-3 flex items-center justify-center gap-2">
          <Button
            isLoading={isSubmitting}
            type="submit"
            disabled={isSubmitting}
            color="primary"
          >
            {isSubmitting ? "Please Wait..." : "Submit"}
          </Button>
        </div>
      </form>
      <div className="mb-3 flex items-center justify-center gap-2">
        <Image
          src={"/forgotPass.png"}
          alt="Forgot Password"
          width={500}
          height={500}
          className="col-span-2 place-self-center"
        />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
