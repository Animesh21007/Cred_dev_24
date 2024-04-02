import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import ContactProfileCard from '../../components/cards/ContactProfileCard';
import { BackgroundGradient } from '../../components/ui/background-gradient';
import { TypewriterEffectSmoothDemo } from '../../components/cards/TextGenerateEffectCard';
import Typewriter from 'typewriter-effect';
import './Sponsors.css';
import imgdh from '../../assets/admin-photos/dhruvgoplani.jpg';
import imgpr from '../../assets/admin-photos/Premdeshmukh.jpeg';
const Sponsors = () => {
	return (
		<>
			<div className="sponsors">
				<Parallax
					pages={3}
					style={{ top: '0', left: '0' }}
					className="animation3  bg-[#032648]">
					<ParallaxLayer offset={0} speed={0.25}>
						<div className="animation_layer parallax3" id="bgspons"></div>
					</ParallaxLayer>
					{/* <ParallaxLayer offset={0} speed={0.50}>
          <div className="animation_layer parallax3" id="bubbles"></div>
        </ParallaxLayer> */}
					<ParallaxLayer offset={0} speed={0.3}>
						<div className="animation_layer parallax3" id="layers0"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={-0.1}>
						<div className="animation_layer parallax3" id="layers1"></div>
					</ParallaxLayer>

					<ParallaxLayer offset={0} speed={0.3}>
						<div className="animation_layer parallax3" id="layers2"></div>
					</ParallaxLayer>

					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers3"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={-0.3}>
						<div className="flex items-start justify-center font-extrabold text-center text-blue-200 align-middle animation_layer parallax3 text-9xl">
							<p className="mt-[20%]">Sponsors</p>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.5}>
						<div className="animation_layer parallax3" id="layers4"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.45}>
						<div className="animation_layer parallax3" id="layers5"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.4}>
						<div className="animation_layer parallax3" id="layers6"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers7"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers8"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers9"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers10"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers11"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers12"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={1} speed={0.25}>
						<div className="p-10 m-10 text-5xl font-extrabold text-center border border-blue-300 text-sky-300 rounded-2xl">
							<Typewriter
								options={{
									loop: true,
								}}
								onInit={(typewriter) => {
									typewriter
										.typeString('We are Open for Sponsorships')
										.pauseFor(400)
										.deleteAll()
										.typeString('Contact us')
										.pauseFor(400)
										.deleteAll()
										.start();
								}}
							/>
						</div>
						<div className="flex-col m-10 ">
							<div className="text-6xl font-extrabold text-center text-white">
								Finance Team
							</div>
							<div className="flex gap-5 mt-10 justify-evenly cardb">
								<ContactProfileCard
									className=""
									name={'Dhruv Goplani'}
									image={imgdh}></ContactProfileCard>
								<ContactProfileCard
									className=""
									name={'Prem Deshmukh'}
									image={imgpr}></ContactProfileCard>
							</div>
						</div>
					</ParallaxLayer>
					{/* <ParallaxLayer offset={2} style={{ marginTop: 200, }} speed={1}>
 
      </ParallaxLayer> */}
				</Parallax>
			</div>
		</>
	);
};

export default Sponsors;
