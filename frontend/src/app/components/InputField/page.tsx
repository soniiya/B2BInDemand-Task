// import React from 'react';  
// import { useForm, UseFormRegister, RegisterOptions, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
// import { Icon } from 'lucide-react';

// type InputFieldProps = {
//   // name must be a key of the full form data
//   name: keyof IFormData; 
//   type: string;
//   // icon is a React component (like Lucide icons)
//   icon: React.ElementType; 
//   placeholder: string;
//   // register function must be tied to IFormData
//   register: UseFormRegister<IFormData>; 
//   // rules are tied to the specific field name
//   rules: RegisterOptions<IFormData, keyof IFormData>; 
//   // Error structure from react-hook-form
//   error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined; 
//   hint?: string;
// }

//   export const InputField = (props: InputFieldProps) => (
//     <div className="mb-4">
//       <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 sr-only">{placeholder}</label>
//       <div className="relative rounded-lg shadow-sm">
//         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//           <Icon className="w-5 h-5 text-indigo-400" aria-hidden="true" />
//         </div>
//         <input
//           id={name}
//           type={props.type}
//           placeholder={props.placeholder}
//           {...props.register(name, props.rules)}
//           className={`
//             w-full py-3 pl-10 pr-4 text-base text-gray-900 border 
//             focus:ring-indigo-500 focus:border-indigo-500 rounded-xl transition duration-150 ease-in-out
//             ${props.error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}
//           `}
//           aria-invalid={props.error ? "true" : "false"}
//         />
//       </div>
//       {props.error && <p className="mt-1 text-sm text-red-600">{props.error.message}</p>}
//       {props.hint && !props.error && <p className="mt-1 text-xs text-gray-500">{props.hint}</p>}
//     </div>
//   );