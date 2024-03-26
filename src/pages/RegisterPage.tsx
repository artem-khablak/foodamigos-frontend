import { FC, useEffect } from "react";
import { RegisterForm } from "./../components/RegisterForm";

const RegisterPage: FC= () => {
  useEffect(() => {
    document.title = 'Registration';
  }, []);

  return (
    <RegisterForm />
  );
};

export default RegisterPage;
