

export default function ContactPage() {
  return (
    <>
     
      <main className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-4 text-orange-700">Contact Us</h1>
        <p className="mb-6 text-gray-600">
          Have questions or need help? Fill out the form below and we’ll get back to you soon.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows={5}
              placeholder="Your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
          >
            Send Message
          </button>
        </form>
      </main>

    </>
  )
}

