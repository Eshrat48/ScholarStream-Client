# Payment Testing Guide

## ✅ Stripe Configuration

The payment functionality is configured with Stripe test mode keys stored securely in environment variables.

### Configuration Details:
- **Server Port**: 5001 (or 5000)
- **Client Port**: 5173 (or 5174)
- **API URL**: Check your `.env.local` file

### Environment Files Required:
1. **Client** `.env.local`:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key_here
   ```

2. **Server** `.env`:
   ```env
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   ```

**Note:** Never commit actual API keys to version control. Get your keys from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys).

## 🧪 Testing Payment

### Step 1: Access the Application
```
http://localhost:5174
```

### Step 2: Register or Login
1. Click "Register" or "Login"
2. Create an account or use existing credentials
3. You'll be redirected to the dashboard

### Step 3: Browse Scholarships
1. Go to "All Scholarships" from the home page
2. Find a scholarship you want to apply for
3. Click "Apply" button on the scholarship card
4. Review the application
5. Click "Proceed to Payment" or "Checkout"

### Step 4: Complete Payment
1. You'll be taken to the Checkout page
2. Fill in required fields:
   - **Cardholder Name**: Enter any name
   - **Card Details**: Use Stripe test card

### Step 5: Use Stripe Test Card

**Successful Payment:**
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
```

**Failed Payment:**
```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
```

## 🎯 What to Expect

### Successful Payment Flow:
1. Enter card details
2. Click "Pay" button
3. Processing message appears
4. Redirected to **Payment Success** page
5. Displays:
   - Scholarship name
   - University
   - Total amount paid
   - Transaction ID
   - Date
   - "Go to My Applications" button

### Failed Payment Flow:
1. If using test declined card
2. Error message appears
3. Redirected to **Payment Failed** page
4. Option to retry payment

## 🔍 Server Verification

The payment endpoint at `/api/v1/payments/create-payment-intent` is working and configured with:
- Stripe SDK integration
- Payment intent creation
- Amount conversion (dollars to cents)
- Client secret generation

## ⚙️ Current Running Services

### Terminal 1 (Client):
- Running: `npm run dev`
- URL: `http://localhost:5174`

### Terminal 2 (Server):
- Running: `npm start`
- Port: 5001
- API Base: `http://localhost:5001/api/v1`

## 🚀 Next Steps

1. **Test Payment Flow**:
   - Register → Browse → Apply → Checkout → Pay

2. **Verify Application Creation**:
   - Go to Dashboard → My Applications
   - Should see new application with `paymentStatus: paid`

3. **Test Reviews**:
   - After payment, add review to scholarship
   - Check "My Reviews" in dashboard

4. **Admin Features** (if admin account):
   - Add new scholarship
   - View analytics
   - Manage users

## 📝 Notes

- These are Stripe TEST keys - no real charges will be made
- Test transactions show in Stripe Dashboard under "Payments"
- All data is stored in local MongoDB (scholarStreamDB)
- When ready for production, replace with live Stripe keys

## ❓ Troubleshooting

### Payment button not working?
- Ensure Stripe key is loaded: Open browser console (F12)
- Check for errors related to Stripe
- Verify server is running on port 5001

### API calls failing?
- Check browser console for CORS errors
- Verify VITE_API_URL points to correct port (5001)
- Restart both client and server

### Card declined?
- Make sure you're using test card numbers above
- Check all fields are filled correctly
- Use valid expiry date (must be in future)

### Application not created after payment?
- Check server logs for errors
- Verify payment intent was successful
- Check MongoDB for applications collection
