const Stripe = require('stripe');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  const price = process.env.STRIPE_PRICE_ID;
  
  if (!key) return res.status(500).json({ error: 'No Stripe key' });
  if (!price) return res.status(500).json({ error: 'No Price ID' });

  try {
    const stripe = new Stripe(key, { apiVersion: '2023-10-16' });
    const { user_id, email } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      customer_email: email,
      metadata: { user_id },
      success_url: 'https://q-card-woad.vercel.app/app.html?success=true',
      cancel_url: 'https://q-card-woad.vercel.app/subscribe.html?canceled=true',
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
};