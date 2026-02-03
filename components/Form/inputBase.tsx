import { ErrorMessage, Field } from "formik";

const InputBase = ({ label, name, as = "input", placeholder, rows, className, required }: { label: string, name: string, as?: string, placeholder: string, rows?: number, className?: string, required?: boolean }) => {
    return (
        <div className={`flex flex-col gap-2  ${className}`}>
            <label htmlFor={name} className="flex flex-row">{label} {required&&<p className="text-red-500 ml-1">*</p>}</label>
            <div>
                <Field className="w-full p-2 mb-1 rounded-md border border-gray-300" as={as as any} name={name} placeholder={placeholder} rows={rows} />
                <ErrorMessage className="text-red-500 text-sm" name={name} component="div" />
            </div>
        </div>
    );
};

export default InputBase;