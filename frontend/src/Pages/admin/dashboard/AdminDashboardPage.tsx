const AdminDashboardPage = () => {
  const statistics = [
    {
      label: "Total Products",
      value: "100",
      icon: "📦",
    },
    {
      label: "Total Orders",
      value: "25",
      icon: "🛒",
    },
    {
      label: "Total Revenue",
      value: "$125,500",
      icon: "💰",
    },
  ];

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        <p className="mt-1 text-sm text-gray-500">Overview of your store</p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 md:grid-cols-3">
        {statistics.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>

                <p className="mt-3 text-3xl font-bold text-gray-900">
                  {item.value}
                </p>
              </div>

              <span className="text-2xl">{item.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
