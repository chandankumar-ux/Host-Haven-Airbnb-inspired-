export default function About() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-4">
        About Sthaan
      </h1>

      <p className="text-gray-600 max-w-3xl mb-6">
        Sthaan is a modern home-sharing platform inspired by Airbnb, built to
        help people discover unique stays and hosts share their spaces with the
        world.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">🌍 Our Mission</h3>
          <p className="text-sm text-gray-600">
            To make travel more personal by connecting guests with authentic
            local hosts and unique stays.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">🏠 For Hosts</h3>
          <p className="text-sm text-gray-600">
            Earn by sharing your space while meeting travelers from around the
            world.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">✈️ For Guests</h3>
          <p className="text-sm text-gray-600">
            Discover comfortable, affordable and unique places to stay wherever
            you travel.
          </p>
        </div>
      </div>
    </section>
  );
}
