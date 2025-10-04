interface ColumnConfig {
  key?: string 
  header: string;
  render: (item: any) => React.ReactNode; 
  isEditable?: boolean; 
  editComponent?: (item: any, onChange: (value: any) => void) => React.ReactNode;
}

interface DataListTableProps {
  items: any[];
  columns: ColumnConfig[];
  editingItem: any | null;
  setEditingItem: (item: any | null) => void;
  handleEdit: (id: string) => void;
  handleUpdate: () => void;
  handleDelete: (id: string) => void;
  idKey?: string; // e.g., '_id'
}

const DataListTable: React.FC<DataListTableProps> = ({
  items,
  columns,
  editingItem,
  setEditingItem,
  handleEdit,
  handleUpdate,
  handleDelete,
  idKey = '_id',
}) => {

  const handleEditChange = (key: string, value: any) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [key]: value });
    }
  };

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items?.map((item: any) => (
            <tr key={item[idKey]} className="hover:bg-indigo-50 transition duration-150">
              {editingItem?.[idKey] === item[idKey] ? (
           
                <td colSpan={columns.length + 1} className="p-4">
                  <div className="flex flex-wrap items-center gap-4">
                    {columns
                      .filter(col => col.isEditable)
                      .map((col, index) => (
                        <div key={index} className="flex-grow min-w-[150px]">
                          {col.editComponent && col.editComponent(
                            editingItem,
                            (value) => handleEditChange(col.key!, value) 
                          )}
                        </div>
                      ))}

                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingItem(null)}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              ) : (
            
                <>
                  {columns.map((col, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      {col.render(item)}
                    </td>
                  ))}
                 
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleEdit(item[idKey])}
                        className="text-indigo-600 hover:text-indigo-900 transition duration-150 font-semibold"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item[idKey])}
                        className="text-red-600 hover:text-red-900 transition duration-150 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataListTable