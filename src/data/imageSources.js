import earthDayImg from '/public/assets/Earth/2k_earth_daymap.jpg';
import specularImg from '/public/assets/Earth/earthspec1k.jpg';
import earthNightImg from '/public/assets/Earth/2k_earth_nightmap.jpg';
import cloudsImg from '/public/assets/Earth/2k_earth_clouds.jpg';
import uranusImg from '/public/assets/Uranus/uranusmap.jpg';
import UranusRingColor from '/public/assets/Uranus/uranusringcolour.jpg';
import UranusRingTrans from '/public/assets/Uranus/uranusringtrans.gif';
import sunImg from '/public/assets/Sun/8k_sun.jpg';
import mercuryImg from '/public/assets/Mercury/2k_mercury.jpg';
import neptuneImg from '/public/assets/Neptune/2k_neptune.jpg';
import saturnImg from '/public/assets/Saturn/2k_saturn.jpg';
import saturnRingImg from '/public/assets/Saturn/2k_saturn_ring_alpha.png';
import jupiterImg from '/public/assets/Jupiter/2k_jupiter.jpg';
import marsImg from '/public/assets/Mars/2k_mars.jpg';
import moonImg from '/public/assets/Earth/2k_moon.jpg';
import venusImg from '/public/assets/Venus/2k_venus_surface.jpg';
import venusAtmosphereImg from '/public/assets/Venus/2k_venus_atmosphere.jpg'

export const imageSources = {
    sun: {
        img: sunImg 
    },
    mercury: {
        img: mercuryImg
    },
    venus: {
        img: venusImg,
        atmosphere: venusAtmosphereImg,
    },
    earth: {
        img: earthDayImg,
        specular: specularImg,
        night: earthNightImg,
        clouds: cloudsImg,
    },
    mars: {
        img: marsImg
    },
    jupiter: {
        img: jupiterImg,
    },
    saturn: {
        img: saturnImg,
        ring: saturnRingImg,
    },
    uranus: {
        img: uranusImg,
        ringColor: UranusRingColor,
        ringTrans: UranusRingTrans,
    },
    neptune: {
        img: neptuneImg,
    },
    moon: {
        img: moonImg
    }
}