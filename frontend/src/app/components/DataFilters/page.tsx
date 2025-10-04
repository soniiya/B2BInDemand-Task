interface DataFiltersProps {
  filters: any;
  setFilters: (filters: any) => void;
  handleApplyFilters: () => void;
  statusOptions: { value: string; label: string }[];
  // You can add a 'CustomFilter' prop here if Leads/Tasks/Projects have unique filters
}

const DataFilters: React.FC<DataFiltersProps> = ({
  filters,
  setFilters,
  handleApplyFilters,
  statusOptions,
}) => {
  const handleChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleClearFilters = () => {
    setFilters({ name: '', status: '', updatedAfter: '', updatedBefore: '' });
  };

  return (
    <div className="mb-8 p-4 bg-white rounded-xl shadow-md border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-3">Filter Results</h3>
      <div className="flex flex-wrap items-end gap-4">
        {/* Filter by Name/Search */}
        <div className="flex-grow min-w-[180px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search Name</label>
          <input
            placeholder="Filter by name"
            value={filters.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Filter by Status */}
        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm appearance-none"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filters (Updated After/Before) */}
        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Updated After</label>
          <input
            type="date"
            onChange={(e) => handleChange('updatedAfter', e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleApplyFilters}
            className="h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-150 shadow-md"
          >
            Apply
          </button>
          <button
            onClick={handleClearFilters}
            className="h-10 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition duration-150 shadow-md"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataFilters