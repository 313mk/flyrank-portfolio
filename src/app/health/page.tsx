export const revalidate = 0; // Force dynamic server rendering

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default async function HealthCheck() {
  // Fetch real-time health-check state data
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data: Todo = await res.json();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">System Health Check</h1>
      <p className="text-slate-600">Verifying live server-side data fetching capabilities.</p>
      
      <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-4">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="font-semibold text-slate-800">Deployment Status: Online</span>
        </div>
        
        <div className="pt-4 border-t border-slate-100">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Fetched Validation Chunk</h2>
          <pre className="bg-slate-50 p-4 rounded-md text-xs font-mono text-slate-800 overflow-x-auto border border-slate-200">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}