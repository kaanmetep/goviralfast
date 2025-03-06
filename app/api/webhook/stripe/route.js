import { NextResponse } from "next/server";
import Stripe from "stripe";
import { monthlyPlan } from "@/stripeinfo";
import { createAdminClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  console.log("!!!!! WEBHOOK ENDPOINT HIT !!!!!");

  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature");

  let data;
  let eventType;
  let event;

  // first, verify is stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification has failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        console.log("DENEMEE");
        const session = await stripe.checkout.sessions.retrieve(
          data.object.id,
          {
            expand: ["line_items"],
          }
        );

        const customerId = session?.customer;
        const customer = await stripe.customers.retrieve(customerId);

        const priceId = session?.line_items?.data[0]?.price?.id;
        if (monthlyPlan.priceId !== priceId) break;

        if (!customer.email) throw new Error("This user does not exist!");

        const supabase = createAdminClient();
        const { data: userData, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", customer.email)
          .single();

        if (error) {
          console.error("Error fetching user:", error);
          break;
        } else {
          const currentDate = new Date();
          const expirationDate = new Date(currentDate);
          expirationDate.setMonth(currentDate.getMonth() + 1);

          await supabase
            .from("users")
            .update({
              is_premium: true,
              stripe_customer_id: customerId,
              premium_expiration: expirationDate.toISOString(),
              premium_active: true,
            })
            .eq("id", userData.id);
        }

        break;
      }
      case "customer.subscription.deleted": {
        const subscription = data.object;
        const customerId = subscription.customer;

        // Find user by Stripe customer ID and update subscription status
        const supabase = createAdminClient();
        const { data: userData, error } = await supabase
          .from("users")
          .select("*")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!error && userData) {
          await supabase
            .from("users")
            .update({
              is_premium: false,
              premium_active: false,
            })
            .eq("id", userData.id);
        }
        break;
      }
      case "customer.subscription.updated": {
        const subscription = data.object;
        const customerId = subscription.customer;
        const supabase = createAdminClient();

        const { data: userData, error } = await supabase
          .from("users")
          .select("*")
          .eq("stripe_customer_id", customerId)
          .single();

        if (error) {
          console.error(
            `Error finding user with customer ID ${customerId}:`,
            error
          );
          break;
        }

        if (!userData) {
          console.log(`No user found with customer ID ${customerId}`);
          break;
        }

        // Abonelik iptal edildiğinde (cancel at period end olarak işaretlendiğinde)
        if (subscription.cancel_at_period_end === true) {
          console.log(
            `Subscription ${subscription.id} marked for cancellation at period end`
          );

          await supabase
            .from("users")
            .update({
              premium_active: false,
            })
            .eq("id", userData.id);

          console.log(`User ${userData.id} premium_active set to false`);
        }
        // Abonelik yenilendiğinde (cancel_at_period_end false olduğunda)
        else if (
          subscription.cancel_at_period_end === false &&
          subscription.status === "active"
        ) {
          console.log(`Subscription ${subscription.id} renewed or reactivated`);

          // Eğer önceki durumdan premium_active false ise, şimdi true yap
          if (!userData.premium_active) {
            await supabase
              .from("users")
              .update({
                premium_active: true,
                is_premium: true,
              })
              .eq("id", userData.id);

            console.log(`User ${userData.id} premium_active set to true`);
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`Webhook error: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook error: ${err.message}` },
      { status: 400 }
    );
  }
}
