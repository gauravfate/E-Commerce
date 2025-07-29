import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { data } from "react-router-dom";

const PayPalButton = ({amount, onSuccess, onError}) => {
    return (
        <PayPalScriptProvider
            options={{
                "client-id":
                    "AaCqHK70plbkffjT_JBE031d2Hh6bIaVBr5-5uFkZX3-fl9OpJM6s4t8BFOpFzJ4ijX2s3UCnwAZb2RZ",
            }}
        >
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{ amount: { value: amount } }],
                    });
                }}
                onApprove={(data, actions)=> {
                    return actions.order.capture().then(onSuccess)
                }}
                onError={(onError)}
            />

        </PayPalScriptProvider>
    );
};
export default PayPalButton;
