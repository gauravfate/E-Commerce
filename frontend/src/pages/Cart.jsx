import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { updateQuantity, removeItem } from "../store/cartSlice";

export default function CartPage() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // Assuming 10% tax
    const total = subtotal + tax;

    const onQuantityChange = (id, quantity) => {
        dispatch(updateQuantity({ id, quantity }));
        toast.success("Cart updated");
    };

    const onRemoveItem = (id) => {
        dispatch(removeItem(id));
        toast.success("Item removed from cart");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
            <div className="lg:flex lg:space-x-8">
                <div className="lg:w-2/3">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold">Cart Items</h2>
                        </div>
                        <ul>
                            {cartItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center space-x-4 p-4 border-b last:border-b-0"
                                >
                                    <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md"></div>
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => {
                                                const newQuantity = Math.max(
                                                    1,
                                                    item.quantity - 1
                                                );
                                                onQuantityChange(item.id, newQuantity);
                                                setValue(
                                                    `quantity-${item.id}`,
                                                    newQuantity
                                                ); // Update form input
                                            }}
                                            className="p-1 rounded-md hover:bg-gray-100"
                                        >
                                            <MinusIcon className="h-4 w-4" />
                                        </button>
                                        <input
                                            type="number"
                                            {...register(`quantity-${item.id}`, {
                                                value: item.quantity,
                                            })}
                                            className="w-12 text-center border rounded-md"
                                            readOnly // Prevent manual input since quantity is controlled by buttons
                                        />
                                        <button
                                            onClick={() => {
                                                const newQuantity = item.quantity + 1;
                                                onQuantityChange(item.id, newQuantity);
                                                setValue(
                                                    `quantity-${item.id}`,
                                                    newQuantity
                                                ); // Update form input
                                            }}
                                            className="p-1 rounded-md hover:bg-gray-100"
                                        >
                                            <PlusIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => onRemoveItem(item.id)}
                                        className="p-2 text-red-500 hover:bg-red-100 rounded-md"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="lg:w-1/3 mt-8 lg:mt-0">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold">Order Summary</h2>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={() => toast.info("Proceeding to checkout...")}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
