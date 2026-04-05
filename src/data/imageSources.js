import earthDayImg from '/assets/Earth/2k_earth_daymap.jpg';
import specularImg from '/assets/Earth/earthspec1k.jpg';
import earthNightImg from '/assets/Earth/2k_earth_nightmap.jpg';
import cloudsImg from '/assets/Earth/2k_earth_clouds.jpg';
import uranusImg from '/assets/Uranus/uranusmap.jpg';
import UranusRingColor from '/assets/Uranus/uranusringcolour.jpg';
import UranusRingTrans from '/assets/Uranus/uranusringtrans.gif';
import sunImg from '/assets/Sun/8k_sun.jpg';
import mercuryImg from '/assets/Mercury/2k_mercury.jpg';
import neptuneImg from '/assets/Neptune/2k_neptune.jpg';
import saturnImg from '/assets/Saturn/2k_saturn.jpg';
import saturnRingImg from '/assets/Saturn/2k_saturn_ring_alpha.png';
import jupiterImg from '/assets/Jupiter/2k_jupiter.jpg';
import marsImg from '/assets/Mars/2k_mars.jpg';
import moonImg from '/assets/Earth/2k_moon.jpg';
import venusImg from '/assets/Venus/2k_venus_surface.jpg';
import venusAtmosphereImg from '/assets/Venus/2k_venus_atmosphere.jpg'

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