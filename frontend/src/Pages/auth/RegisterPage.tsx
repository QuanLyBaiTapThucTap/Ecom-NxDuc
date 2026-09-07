import RegisterForm from "./_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="min-h-[calc(100vh-80px)]">
        <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 lg:grid-cols-2">
          {/* LEFT - IMAGE */}
          <div className="hidden min-h-[calc(100vh-80px)] lg:block">
            <img
              src="/login-banner.webp"
              alt="Create account"
              className="h-full w-full object-cover"
            />
          </div>

          {/* RIGHT - REGISTER FORM */}
          <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-10">
            <RegisterForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
