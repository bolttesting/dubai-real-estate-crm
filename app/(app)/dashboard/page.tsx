export default async function DashboardPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded p-4">Properties: --</div>
        <div className="border rounded p-4">Tenants: --</div>
        <div className="border rounded p-4">Leads: --</div>
      </div>
    </div>
  )
}


