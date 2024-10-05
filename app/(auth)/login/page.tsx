import FormLogin from "@/components/form-login";

<<<<<<< HEAD
const LoginPage = ({
  searchParams,
}: {
  searchParams: { verified: string; error: string };
}) => {
  const isVerified = searchParams.verified === "true";
  const OAuthAccountNotLinked = searchParams.error === "OAuthAccountNotLinked";

  return (
    <FormLogin
      isVerified={isVerified}
      OAuthAccountNotLinked={OAuthAccountNotLinked}
    />
  );
};
=======
const LoginPage = () => {
  return <FormLogin />;
};

>>>>>>> 792c761f0fc856ac30dbf917f8dd48c37553f6e0
export default LoginPage;
