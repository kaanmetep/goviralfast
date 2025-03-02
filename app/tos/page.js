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
          Terms and Conditions for GoViralFast
        </h1>
        <p className="mt-1 ">Last updated: 2025-03-01 </p>
        <p className=" mt-6">
          These Terms of Service ("Terms") govern your use of the GoViralFast
          website at https://goviralfast.co ("Website") and the services
          provided by GoViralFast. By using our Website and services, you agree
          to these Terms.
        </p>
        <ul className="mt-10 flex flex-col gap-10">
          <li>
            <h2 className="font-medium">1. Description of GoViralFast</h2>
            <p className="mt-2">
              GoViralFast is a website that helps you create custom videos that
              track the latest trends, just like the trending videos you see
              every day on TikTok and Instagram.
            </p>
          </li>
          <li>
            <h2 className="font-medium">2. User Data and Privacy</h2>
            <p className="mt-2">
              We collect and store user data, including name, email, payment
              information, and social media authentication access keys, as
              necessary to provide our services. For details on how we handle
              your data, please refer to our Privacy Policy at
              https://goviralfast.co/privacy-policy.
            </p>
          </li>
          <li>
            <h2 className="font-medium">3. Non-Personal Data Collection</h2>
            <p className="mt-2">
              We use web cookies to collect non-personal data for the purpose of
              improving our services and user experience.
            </p>
          </li>
          <li>
            <h2 className="font-medium">4. Refund Policy</h2>
            <p className="mt-2">
              We offer a full refund within 24 hours after the purchase. To
              request a refund, please contact me at kaanpmete@gmail.com
            </p>
          </li>
          <li>
            <h2 className="font-medium">5. Children's Privacy</h2>
            <p className="mt-2">
              GoViralFast is not intended for use by children, and we do not
              knowingly collect any data from children.
            </p>
          </li>
          <li>
            <h2 className="font-medium">6. Updates to the Terms</h2>
            <p className="mt-2">
              We may update these Terms from time to time. Users will be
              notified of any changes via email.
            </p>
          </li>
          <li>
            <h2 className="font-medium">7. Contact Information</h2>
            <p className="mt-2">
              For any questions or concerns regarding these Terms of Service,
              please contact us at kaan@kmpcodes.com
            </p>
          </li>
        </ul>
        <p className="my-10">Thank you for using GoViralFast!</p>
      </div>
    </div>
  );
};

export default Page;
