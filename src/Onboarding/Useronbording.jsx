import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Image1 from "../assets/undraw_code.svg"
import Image2 from "../assets/undraw_nuxt.svg"
import "../App.css"
import "./Onbording.css"
import { Carousel } from '../CommonUI/Carousel';
import { Image, LeftPanel, OnbordingLanding, RightPanel, NavigationPanel } from './UserOnbordingStyle';
import { SubHeading } from '../CommonUI/Heading';
import Registration from './Registration';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';

function Useronbording() {
    const [register, setRegister] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    useEffect(()=>{
        console.log("Hello from Obbording");
        setTimeout(() => {
            toast(
              <div>
                <p>For Testing Purpose, use below credentials</p><br />
                <p><strong>Email: </strong>evalina.rainier@milkcreeks.com</p>
                <p><strong>Password: </strong>@Anshu123</p>
              </div>,
                {
                   style: {
                    backgroundColor: '#ececec',
                   },
                  duration: 6000,
                }
              );
        }, 1000);
    },[])
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              navigate('/');
            }
          });        
          return () => unsubscribe();
    }, [auth, navigate]);
    return (
        <section>
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