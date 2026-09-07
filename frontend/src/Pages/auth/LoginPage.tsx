import LoginForm from "./_components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="min-h-[calc(100vh-80px)]">
        <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 lg:grid-cols-2">
          {/* LEFT - IMAGE */}
          <div className="hidden min-h-[calc(100vh-80px)] lg:block">
            <img
              src="/login-banner.webp"
              alt="Login banner"
              className="h-full w-full object-cover"
            />
          </div>

          {/* RIGHT - LOGIN FORM */}
          <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-10">
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
