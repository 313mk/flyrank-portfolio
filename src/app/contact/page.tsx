export default function Contact() {
    return (
      <div className="space-y-6 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Schedule a Screening</h1>
        <p className="text-slate-600">
          Book a 15-minute technical introductory call to discuss frontend AI engineering roles.
        </p>
        <form className="space-y-4 border border-slate-200 p-6 rounded-lg bg-white">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1 text-slate-700">Name</label>
            <input type="text" id="name" required className="w-full border border-slate-300 rounded-md p-2" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1 text-slate-700">Email</label>
            <input type="email" id="email" required className="w-full border border-slate-300 rounded-md p-2" />
          </div>
          <button type="submit" className="w-full bg-[#0d9488] text-white py-2 rounded-md font-semibold hover:bg-teal-700 transition">
            Submit Details
          </button>
        </form>
      </div>
    );
  }