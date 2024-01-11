import SignUpAdminForm from "@/app/Components/SignUpAdminForm";
import { Image, Link } from "@nextui-org/react";
import { FormProvider } from "@/app/providers/FormProvider";

const SignupPage = () => {
  return (
    <FormProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-3">
        <div className="md:col-span-2 flex justify-center items-center">
          <p className="text-center p-2">Already Signed up?</p>
          <Link href={"/auth/signin"}>Sign In</Link>
        </div>
        <SignUpAdminForm />
        {/* <Image src="/login.png" alt="Login Form" width={500} height={500} /> */}
      </div>
    </FormProvider>
  );
};

export default SignupPage;
