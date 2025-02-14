import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

function HeroSlider() {
  return (
    <>
      <section className="section hero m-tb-4">
        <div className="container max-w-6xl  mx-auto py-4">
          <div className="main-content">
            {/* <!-- Hero Slider Start --> */}
            <div className="slider-content">
              <div className="main-slider">
                <>
                  {/* <!-- Main slider  --> */}
                  <Swiper
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    speed={2000}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    slidesPerView={1}
                    className="swiper-pagination-white slider main-slider-nav main-slider-dot swiper-wrapper"
                  >
                    <SwiperSlide className="slide-item swiper-slide d-flex slide-1">
                      <div className="absolute inset-0 bg-black/40 flex items-center">
                        <div className="container pl-10 text-white slider-animation">
                          <p className="text-lg mb-4">
                            Starting at <b>15,999</b> BDT
                          </p>
                          <h1 className="slide-title text-4xl md:text-6xl font-bold mb-6">
                            Premium Sports Bikes
                          </h1>
                          <div className="slide-btn">
                            <a
                              href="#"
                              className="btn-1 inline-block bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg transition-colors duration-300"
                            >
                              Explore Models
                              <i className="fi-rr-angle-double-small-right ml-2" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="slide-item swiper-slide d-flex slide-2">
                      <div className="absolute inset-0 bg-black/40 flex items-center">
                        <div className="container pl-10 text-white slider-animation">
                          <p className="text-lg mb-4">
                            Adventure starts at <b>12,499</b> BDT
                          </p>
                          <h1 className="slide-title text-4xl md:text-6xl font-bold mb-6">
                            Long-Range Touring Bikes
                          </h1>
                          <div className="slide-btn">
                            <a
                              href="#"
                              className="btn-1 inline-block bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg transition-colors duration-300"
                            >
                              Shop Now
                              <i className="fi-rr-angle-double-small-right ml-2" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <div className=" swiper-pagination swiper-pagination-white"></div>
                    <div className="swiper-buttons">
                      <div className="swiper-button-next"></div>
                      <div className="swiper-button-prev"></div>
                    </div>
                  </Swiper>
                </>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSlider;
