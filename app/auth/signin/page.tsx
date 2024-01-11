import SignInForm from "@/app/Components/SignInForm";
import Link from "next/link";
import { FormProvider } from "@/app/providers/FormProvider";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  return (
    <FormProvider>
      <div className="flex items-center justify-center flex-col ">
        <SignInForm callbackUrl={searchParams.callbackUrl} />
        <Link href={"/auth/forgotPassword"}>Forgot Your Password?</Link>
      </div>
    </FormProvider>
  );
};

export default SigninPage;
