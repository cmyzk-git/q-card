const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const supabase = createClient(
    'https://jysidnrpuaixcorryjbo.supabase.co',
    process.env.SUPABASE_SERVICE_KEY
  );

  const sig = req.headers['stripe-signature'];
  const chunks = [];
  
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const buf = Buffer.concat(chunks);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const user_id = session.metadata.user_id;
    const customer_id = session.customer;

    const { error } = await supabase.from('subscribers').upsert({
      user_id,
      stripe_customer_id: customer_id,
      stripe_subscription_status: 'active',
    }, { onConflict: 'user_id' });

    if (error) console.error('Supabase error:', error);
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