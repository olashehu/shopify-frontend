import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/cartContext";
import { CartItem } from "@/app/lib/constant";

const CartContents = ({ items }: { items: CartItem }) => {
  const { updateCartQuantity, removeFromCart } = useCart();
//   incrementItemQuantity, decrementItemQuantity,
  return (
    <tr
      key={items.id}
      className="border-b border-gray-200 text-sm text-gray-800"
    >
      <td className="px-4 py-6 flex items-center gap-4 flex-wrap">
        <Image
          src={items.images[0]}
          alt={items.name}
          width={60}
          height={60}
          className="rounded-md object-cover"
        />
        <span>{items.name}</span>
      </td>
      <td className="px-4 py-4">${items.price}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 border rounded w-fit px-2 py-1">
          <button
            className="px-2 text-lg"
            // onClick={() => decrementItemQuantity(items.id)}
            onClick={() => updateCartQuantity(items.id, items.quantity - 1)}
          >
            –
          </button>
          <span className="w-6 text-center">{items.quantity}</span>
          <button
            className="px-2 text-lg"
            // onClick={() => incrementItemQuantity(items.id)}
            onClick={() => updateCartQuantity(items.id, items.quantity + 1)}
          >
            +
          </button>
        </div>
      </td>
      <td className="px-4 py-4">
        ${parseFloat((items.price * items.quantity).toFixed(2))}
      </td>
      <td className="px-2">
        <button onClick={() => removeFromCart(items.id)}>X</button>
      </td>
    </tr>
  );
};

export default CartContents;
