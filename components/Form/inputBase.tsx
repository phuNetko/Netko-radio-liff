import { ErrorMessage, Field } from "formik";

const InputBase = ({ label, name, as = "input", placeholder, rows, className, required }: { label: string, name: string, as?: string, placeholder: string, rows?: number, className?: string, required?: boolean }) => {
    return (
        <div className={`flex flex-col gap-2 text-black dark:text-white  ${className}`}>
            <label htmlFor={name} className="flex flex-row">{label} {required && <p className="text-red-500 ml-1">*</p>}</label>
            <div>
                <Field
                    name={name}
                    as={as as any}
                >
                    {({ field, form }: any) => (
                        <input
                            {...field}
                            placeholder={placeholder}
                            rows={rows}
                            className="w-full p-3 mb-1 rounded-none dark:text-white text-black border-gray-300 outline-0 shadow-[0_4px_8px_#0000001a] bg-white dark:bg-[#212121]/80 
                            bg-[linear-gradient(90deg,#FF6464_0%,#FFBF59_50%,#47C9FF_100%)] bg-no-repeat bg-[length:0%_2px] focus:bg-[length:100%_2px] bg-[position:0_100%] transition-all duration-500"
                            onBlur={(e) => {
                                form.setFieldValue(name, e.target.value.trim());
                                field.onBlur(e);
                            }}
                        />
                    )}
                </Field>
                <ErrorMessage className="dark:text-red-300 text-red-500 text-sm" name={name} component="div" />
            </div>
        </div>
    );
};

export default InputBase;