"use client";
import CartContents from "@/app/ui/cart/CartContent";
import { useCart } from "@/app/context/cartContext";

const CartPage = () => {
    const { cartItems } = useCart();

    if (cartItems.length === 0) {
      return (
        <div className="mt-10 pl-4 md:pl-8 lg:pl-20">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-left text-sm font-medium text-gray-600">
              <tr>
                <th className="px-4 py-3">PRODUCT</th>
                <th className="px-4 py-3">PRICE</th>
                <th className="px-4 py-3">QUANTITY</th>
                <th className="px-4 py-3">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <div className="text-center font-bold text-4xl pt-4 w-full">
                Your cart items is empty.
              </div>
            </tbody>
          </table>
        </div>
      );
    }
  return (
    <div className="mt-10 pl-4 md:pl-8 lg:pl-20">
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left text-sm font-medium text-gray-600">
            <tr>
              <th className="px-4 py-3">PRODUCT</th>
              <th className="px-4 py-3">PRICE</th>
              <th className="px-4 py-3">QUANTITY</th>
              <th className="px-4 py-3">TOTAL</th>
              <th className="px-4 py-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <CartContents items={item} key={item.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CartPage;

{
  /* <Table>
        <TableCaption>A list of your product.</TableCaption>
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead className="w-[100px]">prod name</TableHead>
            <TableHead>price</TableHead>
            <TableHead>quantity</TableHead>
            <TableHead className="text-right">total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => (
            <CartContents cartItems={item} key={item.id} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table> */
}
