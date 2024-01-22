import { checkoutOrder } from "@/lib/actions/order.actions";
import { Button } from "../ui/button"
import { IEvent } from "@/lib/database/models/event.model"
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from "react";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type CheckoutProps = {
  event: IEvent
  userId: string
}

export default function Checkout({ event, userId }: CheckoutProps) {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }
  
    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  async function onCheckout() {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    }

    await checkoutOrder(order);
  }
  
  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-full">
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  )
}
