export const IMAGES_BASE_URL = '/images';
export const RESIZE_DELAY = 500;

// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
function detectmob() { 
	if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
	){
		return true;
	}
	else {
		return false;
	}
} 

export const isMobile = detectmob();

export const mapNumber = (x, a, b, c, d,) => (x - a) * ( (d - c) / (b - a) ) + c;

export const SLIDER_BTN_SIZE = 50;
export const SLIDER_BTN_HALF_SIZE = SLIDER_BTN_SIZE / 2;
