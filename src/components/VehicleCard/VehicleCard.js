import styled from "styled-components";

const MostVisitedCarCard = styled.div`
  transition: all ease-in-out 100ms;
  transform-origin: center;

  &:hover {
    transform: translateY(-0.5rem);
  }
`;

const VehicleCard = ({ carImg, carName, carDescription, billBookFile, count }) => {
  return (
    <MostVisitedCarCard className='dashboard-first-row--right-division cursor justify-content-between '>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='image-container left-division'>
          <img src={carImg} alt='car' />
        </div>
        <div className='right-division pt-2'>
          <h6 className='m-0'>{carName}</h6>
          <p>{carDescription}</p>
        </div>
      </div>
      <a download href={billBookFile} className='text-decoration-none link-nav fs-6 pt-2'>
        <div className='d-flex flex-column   text-center'>
          <i className='bx bx-file text-primary-blue fs-4 m-0'></i>
          Download
        </div>
        <p>Visited {count} times</p>
      </a>
    </MostVisitedCarCard>
  );
};

export default VehicleCard;
