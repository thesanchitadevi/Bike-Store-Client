const Address = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto py-16 px-4  md:py-15 md:px-0">
        <div className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-md overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1825.2657613590618!2d90.4131124!3d23.7996912!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1738076330217!5m2!1sen!2sbd"
                width="100%"
                height="400"
                allow-fullscreen=""
                loading="lazy"
                style={{
                  filter: ` contrast(1.6) opacity(0.8)`,
                }}
              ></iframe>
            </div>

            <div className="max-w-full  rounded-lg overflow-hidden md:text-end text-center pt-8">
              <h2 className="text-2xl font-semibold text-primary">
                Visit Out Store
              </h2>

              <div className="py-6 ">
                <h3 className="text-lg font-medium text-gray-600">
                  Our Address
                </h3>
                <p className="mt-3 ">
                  77, Road-2, Block-B, Gulshan <br />
                  Dhaka 1215
                </p>
              </div>
              <div className="border-t border-gray-800  py-6">
                <h3 className="text-lg font-medium text-gray-600">Contact</h3>
                <p className="mt-3 ">Email: bikestore@gmail.com</p>
                <p className="mt-1 ">Phone: 0111-56789</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;

// style="filter: grayscale(1) contrast(1.2) opacity(0.4);"
