import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { globalConstant } from "constant/constant";
import { Link } from "react-router-dom";

import { useGetUserByRoleQuery } from "redux/api/users/userApi";

const Item = styled.div`
  cursor: pointer;
  padding: 0.5rem 0rem;
  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;
  }
  transition: all 0.3s ease-in-out;

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

const MechanicCarousel = ({ slidesToShow = 3 }) => {
  const { data: mechanicData, isLoading, isError } = useGetUserByRoleQuery("mechanic");

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: slidesToShow,
    autoplay: true,
    slidesToScroll: 2,
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  console.log("fetched mechanic = ", mechanicData);
  return (
    <Slider {...settings}>
      {mechanicData.map((mechanic) => (
        <CarouselCard>
          <Link
            to={{
              pathname: `/users-view/${mechanic._id}`,
            }}
          >
            <Item>
              <div>
                <div className='d-flex justify-content-center my-4 cursor'>
                  <img className='mechanic-img' src={`${globalConstant.serverUrl}/storage/profile_pics/${mechanic.avatar}`} alt='' />
                </div>
                <h6 className='text-primary-blue text-center'>{mechanic.name.toUpperCase()}</h6>
              </div>
            </Item>
          </Link>
        </CarouselCard>
      ))}
    </Slider>
  );
};

export default MechanicCarousel;
