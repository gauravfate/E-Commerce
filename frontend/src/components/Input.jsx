import React, { useId } from "react";

function Input({ label, type = "text", className = "", ...props }, ref) {
    const id = useId();

    return (
        <div className="mb-4">
            {label && (
                <label className="text-gray-500 font-semibold" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                className={`${className} bg-gray-100 px-3 py-2 outline-none text-gray-600`}
                type={type}
                id={id}
                ref={ref}
                {...props}
            />
        </div>
    );
}

export default React.forwardRef(Input);