import Link from "next/link";
const Page = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <div className=" w-[80%] sm:w-[70%] md:w-[55%] lg:w-[40%]">
        <Link
          href="/"
          className="hover:text-gray-500 transition-colors delay-[50ms]"
        >
          &larr; Back
        </Link>
      </div>
      <div className="flex flex-col  mt-4 w-[80%] sm:w-[70%] md:w-[55%] lg:w-[40%]">
        <h1 className="text-xl md:text-2xl font-semibold">
          Privacy Policy for GoViralFast
        </h1>
        <p className="mt-1 ">Last updated: 2025-03-01 </p>
        <p className=" mt-6">
          Thank you for using GoViralFast ("we," "us," or "our"). This Privacy
          Policy outlines how we collect, use, and protect your personal and
          non-personal information when you use our website located at
          https://goviralfast.co (the "Website").
        </p>
        <p className="mt-6">
          By accessing or using the Website, you agree to the terms of this
          Privacy Policy. If you do not agree with the practices described in
          this policy, please do not use the Website.
        </p>
        <h2 className="mt-6 font-semibold">1. Information We Collect</h2>
        <ul className="mt-10 flex flex-col gap-10">
          <li>
            <h3 className="font-medium">1.1 Personal Data</h3>
            <p className="mb-3">
              We collect the following personal information from you:
            </p>
            <div className="mt-2">
              <p>
                - Name: We collect your name to personalize your experience and
                communicate with you effectively.
              </p>{" "}
              <p>
                - Email: We collect your email address to send you important
                information regarding your account, updates, and communication.
              </p>{" "}
              <p>
                - Payment Information: We collect payment details to process
                your orders securely.
              </p>
              <p>
                - Social Media Authentication Access Keys: We collect these to
                enable instant-sharing functionality.
              </p>
            </div>
          </li>
          <li>
            <h3 className="font-medium">1.2 Non-Personal Data</h3>
            <p className="mt-2">
              We use web cookies to collect non-personal information such as
              your IP address, browser type, device information, and browsing
              patterns. This information helps us to enhance your browsing
              experience, analyze trends, and improve our services.
            </p>
          </li>
          <li>
            <h2 className="font-medium">2. Purpose of Data Collection</h2>
            <p className="mt-2">
              We collect and use your personal data for order processing and
              social media posting. This includes processing your orders,
              enabling instant-sharing functionality, sending confirmations,
              providing customer support, and keeping you updated about the
              status of your account and posts.
            </p>
          </li>
          <li>
            <h2 className="font-medium">3. Data Sharing</h2>
            <p className="mt-2">
              We do not share your personal data with any other parties except
              as required for order processing and social media posting
              functionality. This may include sharing necessary data with the
              social media platforms you choose to post to, including YouTube
              through the YouTube API Services.
            </p>
          </li>
          <li>
            <h2 className="font-medium">4. Children's Privacy</h2>
            <p className="mt-2">
              GoViralFast is not intended for use by children, and we do not
              knowingly collect any data from children.
            </p>
          </li>
          <li>
            <h2 className="font-medium">5. Updates to the Privacy Policy</h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. Users will be
              notified of any changes via email.
            </p>
          </li>
          <li>
            <h2 className="font-medium">6. Contact Information</h2>
            <p className="mt-2">
              If you have any questions, concerns, or requests related to this
              Privacy Policy, you can contact us at: Email: kaan@kmpcodes.com
            </p>
          </li>
          <li>
            <h2 className="font-medium">7. Data Protection Mechanisms</h2>
            <p className="mt-2">
              We take the protection of your sensitive data seriously and have
              implemented the following security measure:
            </p>
            <p className="mt-1">
              a) Encryption: Your Google OAuth access keys are encrypted using
              industry-standard encryption protocols both in transit and at
              rest.
            </p>
            <p className="mt-1">
              While we implement this security measure to protect your sensitive
              information, please be aware that no method of transmission over
              the Internet or method of electronic storage is 100% secure. We
              strive to use commercially acceptable means to protect your
              personal information, but we cannot guarantee its absolute
              security.
            </p>
          </li>
        </ul>
        <p className="my-10">
          By using GoViralFast, you consent to the terms of this Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Page;
