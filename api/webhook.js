const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const user_id = session.metadata.user_id;
    const customer_id = session.customer;

    await supabase.from('subscribers').upsert({
      user_id,
      stripe_customer_id: customer_id,
      stripe_subscription_status: 'active',
    }, { onConflict: 'user_id' });
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    const customer_id = subscription.customer;

    await supabase.from('subscribers')
      .update({ stripe_subscription_status: 'canceled' })
      .eq('stripe_customer_id', customer_id);
  }

  res.status(200).json({ received: true });
};