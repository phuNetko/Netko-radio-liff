import { ErrorMessage, Field } from "formik";
import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";

interface InputBaseProps {
  label: string;
  name: string;
  as?: 'input' | 'textarea';
  placeholder: string;
  rows?: number;
  className?: string;
  required?: boolean;
  icon?: ReactNode;
}

const InputBase = ({
  label,
  name,
  as = "input",
  placeholder,
  rows,
  className,
  required,
  icon
}: InputBaseProps) => {
  const isTextarea = as === 'textarea';

  return (
    <div className={`space-y-1 ${className}`}>
      <label
        htmlFor={name}
        className="flex items-center gap-1.5 text-sm font-medium text-neutral-800 dark:text-neutral-300"
      >
        {label}
        {required && <span className="text-[#6ca03d]">*</span>}
      </label>

      <Field name={name}>
        {({ field, form, meta }: { field: any; form: any; meta: any }) => {
          const hasError = meta.touched && meta.error;
          const InputComponent = isTextarea ? 'textarea' : 'input';

          return (
            <div className="relative group">
              {icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#6ca03d] transition-colors pointer-events-none">
                  {icon}
                </div>
              )}

              <InputComponent
                {...field}
                id={name}
                placeholder={placeholder}
                rows={rows}
                className={`
                  w-full px-4 py-3.5 ${icon ? 'pl-12' : ''}
                  bg-neutral-100/80 dark:bg-neutral-900/60
                  hover:bg-neutral-100 dark:hover:bg-neutral-900/80
                  border rounded-2xl
                  text-black dark:text-white text-base
                  placeholder:text-neutral-500 dark:placeholder:text-white/45
                  transition-all duration-200
                  ${hasError
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-black/5 dark:border-white/10 focus:border-[#6ca03d]/50 focus:ring-2 focus:ring-[#6ca03d]/20'
                  }
                  focus:outline-none focus:bg-white dark:focus:bg-black
                  ${isTextarea ? 'resize-none min-h-[100px]' : ''}
                `}
                onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  form.setFieldValue(name, e.target.value.trim());
                  field.onBlur(e);
                }}
              />

              <div className="absolute inset-0 -z-10 rounded-2xl bg-[#6ca03d]/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            </div>
          );
        }}
      </Field>

      <ErrorMessage name={name}>
        {(msg) => (
          <p className="flex items-center gap-1.5 text-sm text-red-500 dark:text-red-400">
            <AlertCircle size={14} />
            {msg}
          </p>
        )}
      </ErrorMessage>
    </div>
  );
};

export default InputBase;
