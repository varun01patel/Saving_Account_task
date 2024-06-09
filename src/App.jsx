import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => {
  const [data, setData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch('/savingsData.json')
      .then(response => response.json())
      .then(data => setData(data.accounts));
  }, []);

  const mobileSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const sliderRef = useRef();

  const handleButtonClick = (index) => {
    const slider = sliderRef.current;
    if (slider) {
      slider.slickGoTo(index);
    }
  };

  const getButtonText = (currentIndex, offset) => {
    const newIndex = (currentIndex + offset + data.length) % data.length;
    return data[newIndex]?.product || '';
  };

  return (
    <div className="min-h-screen bg-[#fbfbf6]">
      <div className="container mx-auto p-4">
        <h1 className="text-center text-[36px] font-bold mb-4 text-[#008c85] leading-[36px]">Savings Accounts</h1>
        <div className="overflow-x-auto">
          <div className="hidden md:block">
            <table className="min-w-full bg-white border border-gray-300 shadow-md">
              <thead>
                <tr className="bg-[#008c85]">
                  <th className="py-2 px-4 border text-white">Product</th>
                  <th className="py-2 px-4 border text-white">Interest Rate</th>
                  <th className="py-2 px-4 border text-white">Minimum Deposit</th>
                  <th className="py-2 px-4 border text-white">Interest Type</th>
                </tr>
              </thead>
              <tbody>
                {data.map((account, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-[#f9fbd0]' : 'bg-white'}>
                    <td className="py-2 px-4 border text-[#0c332f]">{account.product}</td>
                    <td className="py-2 px-4 border text-[#0c332f]">{account.interestRate}</td>
                    <td className="py-2 px-4 border text-[#0c332f]">{account.minimumDeposit}</td>
                    <td className="py-2 px-4 border text-[#0c332f]">{account.interestType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden">
            <Slider {...mobileSettings} ref={sliderRef}>
              {data.map((account, index) => (
                <div key={index} className="p-4">
                  <div className="bg-white border border-gray-300 mb-4 rounded-md shadow-md">
                    <div className="bg-[#f9fbd0] p-2 font-bold text-[#0c332f] rounded-t-md">
                      {account.product}
                    </div>
                    <div className="p-2">
                      <table className="min-w-full">
                        <tbody>
                          <tr>
                            <td className="py-1 px-2 font-bold text-[#0c332f]">Interest Rate:</td>
                            <td className="py-1 px-2 text-[#0c332f]">{account.interestRate}</td>
                          </tr>
                          <tr>
                            <td className="py-1 px-2 font-bold text-[#0c332f]">Minimum Deposit:</td>
                            <td className="py-1 px-2 text-[#0c332f]">{account.minimumDeposit}</td>
                          </tr>
                          <tr>
                            <td className="py-1 px-2 font-bold text-[#0c332f]">Interest Type:</td>
                            <td className="py-1 px-2 text-[#0c332f]">{account.interestType}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            <div className="flex justify-between mt-4">
              {data.length > 1 && (
                <>
                  <button
                    className="bg-[#008c85] hover:bg-[#8c6300] text-[#e4efee] font-bold py-2 px-4 rounded"
                    onClick={() => handleButtonClick((currentSlide + 1) % data.length)}
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    {getButtonText(currentSlide, 1)}
                  </button>
                  <button
                    className="bg-[#008c85] hover:bg-[#8c6300] text-[#e4efee] font-bold py-2 px-4 rounded"
                    onClick={() => handleButtonClick((currentSlide + 2) % data.length)}
                  >
                    {getButtonText(currentSlide, 2)}
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
