import React from "react";
import { auth } from "@/auth";
import { Rocket, CheckCircle, Shield, Settings, Calendar } from "lucide-react";
import Button from "@/components/Button";

const ProfilePage = async () => {
  const session = await auth();
  const customerPortalLink =
    process.env.NODE_ENV === "development"
      ? "https://billing.stripe.com/p/login/test_14k6qp3MF3kJef6aEE"
      : "https://billing.stripe.com/p/login/bIY01d3ttbxb1Ak5kk";
  const userProfile = {
    name: session.user.userData.full_name,
    planType: session.user.userData.is_premium ? "Monthly Plan" : "Free Plan",
    email: session.user.userData.email,
    profileImage: session.user.userData?.avatar_url,
    subscriptionDaysLeft: session.user.userData?.premium_expiration,
    isPremiumActive: session.user.userData?.premium_active,
  };

  const monthlyFeatures = [
    { info: "+20 Viral Videos Creation", active: true },
    { info: "One-Click Editing", active: true },
    { info: "Instant Download", active: true },
    { info: "Continuous Video Updates", active: true },
    { info: "Multi-Platform Sharing", active: false },
    { info: "Multiple Social Accounts", active: false },
    { info: "Advanced Hashtag Strategies", active: false },
  ];

  const calculateDaysLeft = (expirationDate) => {
    if (!expirationDate) return 0;

    const expiration = new Date(expirationDate);
    const today = new Date();

    const diffTime = expiration - today;

    const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

    return diffDays;
  };

  const calculateRemainingPercentage = (expirationDate) => {
    if (!expirationDate) return 0;

    const daysLeft = calculateDaysLeft(expirationDate);

    const percentage = Math.min(100, (daysLeft / 30) * 100);

    return percentage;
  };

  return (
    <div className="pt-2 mx-auto bg-white shadow-lg px-3 sm:px-6 w-full rounded-md min-h-screen ">
      {/* Profile Header Section */}
      <div className="flex flex-col sm:flex-row items-center sm:justify-between py-4 sm:py-6 border-b">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
          <div className="relative">
            <img
              src={userProfile?.profileImage || "/smileface.jpg"}
              alt="Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left mt-3 sm:mt-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                {userProfile.name}
              </h1>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  userProfile.planType === "Monthly Plan"
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {userProfile.planType}
              </span>
            </div>
            <p className="text-gray-500 mt-1">{userProfile.email}</p>
            {userProfile.planType === "Monthly Plan" && (
              <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                <div className="h-2 w-24 sm:w-32 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-600 rounded-full"
                    style={{
                      width: `${calculateRemainingPercentage(
                        userProfile.subscriptionDaysLeft
                      )}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {calculateDaysLeft(userProfile.subscriptionDaysLeft)} days
                  left
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {userProfile.planType === "Free Plan" ? (
        <>
          <p className="mt-6 text-center text-gray-700">
            You're currently on free plan.
          </p>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 sm:p-6 rounded-xl shadow-lg border border-yellow-200 mt-6 overflow-hidden relative">
            <div className="relative z-10 flex flex-col items-center justify-between mb-6 space-y-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <Rocket
                  className="size-10 sm:size-12 fill-yellow-200"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Upgrade to Monthly Plan
                </h2>
              </div>
              <div className="mb-4 sm:mb-8">
                <div className="flex items-end justify-center">
                  <span className="text-4xl sm:text-5xl font-bold">$4</span>
                  <span className="text-gray-500 ml-2 mb-1">/month</span>
                </div>

                <p className="text-sm text-gray-500 mt-1 text-center">
                  <span className="line-through">$10/month</span>
                  <span className="ml-2 text-green-500 font-medium">
                    60% off
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
              {monthlyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    feature.active
                      ? "bg-white/60 border border-yellow-100"
                      : "opacity-60"
                  }`}
                >
                  <CheckCircle
                    className={
                      feature.active
                        ? "text-green-500 size-5"
                        : "text-gray-400 size-5"
                    }
                  />
                  <span
                    className={`${
                      feature.active ? "text-gray-900" : "text-gray-700"
                    } font-medium text-sm sm:text-base`}
                  >
                    {feature.info}
                    {!feature.active && (
                      <span className="text-xs text-yellow-600 ml-1">*</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg text-sm sm:text-base w-full sm:w-auto">
                Unlock Premium Features
              </Button>
            </div>

            <div className="text-center mt-4 text-xs text-yellow-600">
              * Features coming soon
            </div>

            <div className="mt-6 py-4 border-t border-yellow-200">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-700">
                <Shield className="size-8 sm:size-5 text-green-600" />
                <p className="text-xs sm:text-sm font-medium text-center sm:text-left">
                  All payment transactions are securely processed by{" "}
                  <span className="underline">Stripe</span>. Your personal and
                  financial information is protected with industry-standard SSL
                  encryption.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Premium User Interface
        <>
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Premium Membership
              </h2>

              <a
                className="bg-yellow-200 hover:bg-yellow-300 text-gray-900 font-semibold py-2 px-6 rounded-full transition-all duration-300 flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
                href={
                  customerPortalLink + "?prefilled_email=" + userProfile.email
                }
                target="_blank"
              >
                <Settings className="size-4" />
                Manage Subscription
              </a>
            </div>

            {/* Subscription Status Card */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl shadow-md border border-yellow-200 p-4 sm:p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Plan Info */}
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-sm text-gray-500 mb-1">
                    Current Plan
                  </span>
                  <span className="text-lg font-semibold text-gray-900 mb-2">
                    Monthly Premium
                  </span>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <CheckCircle className="size-4" />
                    <span>Active</span>
                  </div>
                </div>

                {/* Billing Info */}
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-sm text-gray-500 mb-1">
                    Next Billing Date
                  </span>
                  <div className="flex items-center gap-2 mb-2">
                    {userProfile.isPremiumActive ? (
                      <>
                        <Calendar className="size-4 text-gray-500" />
                        <span className="text-lg font-semibold text-gray-900">
                          {new Date(
                            userProfile.subscriptionDaysLeft
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </>
                    ) : (
                      <div className="text-center sm:text-left">
                        <p className="text-sm text-amber-600 font-medium">
                          Your premium subscription will not be renewed next
                          month.
                        </p>
                        <a
                          className="text-sm mt-2 block underline hover:no-underline transition-all delay-[50ms] w-fit"
                          href={
                            customerPortalLink +
                            "?prefilled_email=" +
                            userProfile.email
                          }
                          target="_blank"
                        >
                          Manage your subscription
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Remaining Time */}
                <div className="flex flex-col items-center sm:items-start col-span-1 sm:col-span-2 md:col-span-1">
                  <span className="text-sm text-gray-500 mb-1">
                    Subscription Status
                  </span>
                  <div className="mb-1">
                    <span className="text-lg font-semibold text-gray-900">
                      {calculateDaysLeft(userProfile.subscriptionDaysLeft)} days
                      remaining
                    </span>
                  </div>
                  <div className="h-2 w-full max-w-xs sm:max-w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{
                        width: `${calculateRemainingPercentage(
                          userProfile.subscriptionDaysLeft
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Features */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center sm:text-left">
                Your Premium Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {monthlyFeatures
                  .filter((f) => f.active)
                  .map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-yellow-50 transition-colors"
                    >
                      <CheckCircle className="text-green-500 size-5 flex-shrink-0" />
                      <span className="text-gray-900 font-medium text-sm sm:text-base">
                        {feature.info}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                  <Shield className="size-8 sm:size-6 text-green-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Secure Subscription Management
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      All subscription management is powered by Stripe Customer
                      Portal. Your financial information is never stored on our
                      servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
