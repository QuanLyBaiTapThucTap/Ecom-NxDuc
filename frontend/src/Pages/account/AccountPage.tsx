import AccountSidebar from "./_components/AccountSidebar";
import ProfileForm from "./_components/ProfileForm";

const AccountPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8">
        {/* ACCOUNT CONTENT */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
          <AccountSidebar />

          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
