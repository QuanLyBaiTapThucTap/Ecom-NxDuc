import ContactInfo from "./_components/ContactInfo";
import ContactForm from "./_components/ContactForm";
import ContactMap from "./_components/ContactMap";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6">
        {/* CONTACT CONTENT */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[340px_minmax(0,1fr)]">
          {/* LEFT */}
          <div className="space-y-5">
            <ContactInfo />
            <ContactMap />
          </div>

          {/* RIGHT */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
