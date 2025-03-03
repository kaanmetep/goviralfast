export const monthlyPlan = {
  link:
    process.env.NODE_ENV === "development"
      ? "https://buy.stripe.com/test_3csdQR49S9CJ1JSbII"
      : "",
  priceId:
    process.env.NODE_ENV === "development"
      ? "price_1QyGwHPcB7RPWrpUvkfNiCh2"
      : "",
};
