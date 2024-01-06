import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Image1 from "../assets/undraw_code.svg"
import Image2 from "../assets/undraw_nuxt.svg"
import "../App.css"
import "./Onbording.css"
import { Carousel } from '../CommonUI/Carousel';
import { Form, Image, LeftPanel, OnbordingLanding, RightPanel, NavigationPanel, InputContainer } from './UserOnbordingStyle';
import { MainHeading, SubHeading, Title } from '../CommonUI/Heading';
import { TextInput } from '../CommonUI/TextInput';
import { GoogleLogin, PrimaryButton } from '../CommonUI/Button';
import Registration from './Registration';
import Login from './Login';


function Useronbording() {
    const [register, setRegister] = useState(false)
    return (
        <section>
            <NavigationPanel>DeverX</NavigationPanel>
            <OnbordingLanding>
                <LeftPanel>
                    <Swiper loop={true} autoplay={{delay: 2500}} grabCursor={true} pagination={true} modules={[Pagination, Autoplay]} className="mySwiper">
                        <SwiperSlide>
                            <Carousel>
                                <Image src={Image1} alt="" />
                                <SubHeading>Bite size effective, short and sharp learning</SubHeading>
                            </Carousel>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Carousel>
                                <Image src={Image2} alt="" />
                                <SubHeading>Collaborate by writing short Dev blog posts.</SubHeading>
                            </Carousel>
                        </SwiperSlide>
                    </Swiper>
                </LeftPanel>
                <RightPanel>
                    {register ? <Registration setRegister={setRegister}/> : <Login setRegister={setRegister}/>}
                </RightPanel>

            </OnbordingLanding>
        </section>
    )
}

export default Useronbording