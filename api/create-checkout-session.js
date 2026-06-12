const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    const { user_id, email } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      }],
      customer_email: email,
      metadata: { user_id },
      success_url: 'https://q-card-woad.vercel.app/app.html?success=true',
      cancel_url: 'https://q-card-woad.vercel.app/subscribe.html?canceled=true',
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
};