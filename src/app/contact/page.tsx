import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="pt-36 pb-20 bg-gray-50 min-h-screen">

        <div className="max-w-5xl mx-auto px-6">

          <h1 className="text-6xl font-extrabold text-center text-blue-700">
            CONTACT US
          </h1>

          <p className="text-center text-gray-600 mt-5 text-xl">
            We'd love to hear from you.
          </p>

          <div className="mt-16">

            <div className="bg-white rounded-3xl shadow-2xl p-12">

              <h2 className="text-4xl font-bold text-yellow-500 mb-10 text-center">
                Contact Information
              </h2>

              <div className="space-y-10 text-lg">

                {/* Phone */}

                <div className="flex items-start gap-5">

                  <div className="text-4xl">📞</div>

                  <div>

                    <h3 className="text-2xl font-bold">
                      Phone
                    </h3>

                    <a
                      href="tel:+918727016663"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      +91 87270 16663
                    </a>

                  </div>

                </div>

                {/* Email */}

                <div className="flex items-start gap-5">

                  <div className="text-4xl">📧</div>

                  <div>

                    <h3 className="text-2xl font-bold">
                      Email
                    </h3>

                    <a
                      href="mailto:jsbr176@gmail.com"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      jsbr176@gmail.com
                    </a>

                  </div>

                </div>

                {/* Address */}

                <div className="flex items-start gap-5">

                  <div className="text-4xl">📍</div>

                  <div>

                    <h3 className="text-2xl font-bold">
                      Store Address
                    </h3>

                    <p className="text-gray-700 leading-8">
                      Bhangala,
                      <br />
                      Mukerian,
                      <br />
                      Punjab - 144306
                    </p>

                  </div>

                </div>

                {/* Google Maps */}

                <div className="text-center pt-6">

                  <a
                    href="https://maps.app.goo.gl/ssoJJedGrQquP4kU7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition duration-300"
                  >
                    📍 Open in Google Maps
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}