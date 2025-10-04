interface Option {
  value: string;
  label: string;
}

interface InputFieldConfig {
  type: 'text' | 'email' | 'tel' | 'textarea'; 
  key: string;
  placeholder: string;
  options?: never; 
}

interface SelectFieldConfig {
  type: 'select'; 
  key: string;
  placeholder: string;
  options: Option[]; 
}

export type FieldConfig = InputFieldConfig | SelectFieldConfig;

interface DataFormProps {
  fields: FieldConfig[];
  itemState: any; 
  setItemState: (state: any) => void;
  handleCreate: () => void;
  createButtonText: string;
  children?: React.ReactNode; 
}

const DataForm: React.FC<DataFormProps> = ({
  fields,
  itemState,
  setItemState,
  handleCreate,
  createButtonText,
  children,
}) => {
  const handleChange = (key: string, value: string) => {
    setItemState({ ...itemState, [key]: value });
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-xl shadow-md border border-indigo-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Create New {createButtonText.replace('Create ', '')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field) => (
          <div key={field.key} className="relative">
            {field.type === 'select' ? (
              <select
                value={itemState[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm appearance-none"
              >
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={itemState[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm w-full"
              />
            )}
          </div>
        ))}
        {children} 
      </div>
      <div className="mt-6">
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300"
          onClick={handleCreate}
        >
          {createButtonText}
        </button>
      </div>
    </div>
  );
};

export default DataForm;