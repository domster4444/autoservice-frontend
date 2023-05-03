import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import XLSIcon from "assets/images/xlsx.png";
import Reports from "assets/reports/report1.xlsx";

import { globalConstant } from "constant/constant";

import { useDownloadQueueReportMutation } from "redux/api/report/reportApi";

const Item = styled.div`
  width: 100%;
  border-radius: 1rem;
  margin: 15px 5px;
`;

const CarouselCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ReportCarousel = ({ slidesToShow = 3 }) => {
  const [downloadQueueReport, { isLoading: isDownloadingReport }] = useDownloadQueueReportMutation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: slidesToShow,
    autoplay: true,
    slidesToScroll: 1,
  };

  const downloadQueueReportHandler = () => {
    downloadQueueReport()
      .then((res) => {
        const url = `${globalConstant.serverUrl}/api/v1/download/queue/report/${res.data.message.fileName}`;
        window.open(url, "_blank");
      })
      .catch((err) => {});
  };

  return (
    <Slider {...settings}>
      <CarouselCard>
        <Item>
          <a onClick={downloadQueueReportHandler} className='link-nav text-decoration-none'>
            <div className='download-report-card'>
              <div className='d-flex justify-content-center mb-4 cursor'>
                <img className='report-logo-img' src={XLSIcon} alt='file icon' />
              </div>
              <h6 className='text-primary-blue text-center'>Monthly Report</h6>
              <p className='cursor text-primary-blue text-center'>
                <i className='bx bx-download me-2'></i>
                Download
              </p>
            </div>
          </a>
        </Item>
      </CarouselCard>
      <CarouselCard>
        <Item>
          <a onClick={downloadQueueReportHandler} className='link-nav text-decoration-none'>
            <div className='download-report-card'>
              <div className='d-flex justify-content-center mb-4 cursor'>
                <img className='report-logo-img' src={XLSIcon} alt='file icon' />
              </div>
              <h6 className='text-primary-blue text-center'>Monthly Report</h6>
              <p className='cursor text-primary-blue text-center'>
                <i className='bx bx-download me-2'></i>
                Download
              </p>
            </div>
          </a>
        </Item>
      </CarouselCard>
    </Slider>
  );
};

export default ReportCarousel;
