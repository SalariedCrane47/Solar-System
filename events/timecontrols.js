/**
 * Time controls to change the speed of the solar system simulation.
 * Call init(setTimeScale) from main.js to connect the UI to the simulation.
 */

const SPEEDS = [-10, -5, -2, -1, 0, 1, 2, 5, 10];
let currentIdx = 5; // Starts at 1x

/**
 * @param {(scale: number) => void} setTimeScale - Called when user picks a speed (e.g. setTimeScale(2) for 2x).
 */
export function init(setTimeScale) {
  const panel = document.createElement('div');
  panel.id = 'timecontrols';
  panel.className = 'timecontrols-panel';
  panel.setAttribute('aria-label', 'Time speed controls');

  const label = document.createElement('span');
  label.className = 'timecontrols-label';
  label.style.minWidth = '35px';
  label.style.textAlign = 'center';

  const updateUI = () => {
    const speed = SPEEDS[currentIdx];
    label.textContent = speed === 0 ? '0×' : `${speed}×`;
    setTimeScale(speed);
  };

  const wrap = document.createElement('div');
  wrap.className = 'timecontrols-buttons';

  const btnBack = document.createElement('button');
  btnBack.type = 'button';
  btnBack.className = 'timecontrols-btn';
  btnBack.title = 'Slower / Reverse';
  const imgBack = document.createElement('img');
  imgBack.src = 'public/assets/controls/backward-solid.png';
  imgBack.alt = 'Backward';
  imgBack.style.width = '14px';
  imgBack.style.height = '14px';
  imgBack.style.display = 'block';
  imgBack.style.filter = 'brightness(0) invert(0.8)';
  btnBack.appendChild(imgBack);
  btnBack.addEventListener('click', () => {
    if (currentIdx > 0) {
      currentIdx--;
      updateUI();
    }
  });

  const btnStop = document.createElement('button');
  btnStop.type = 'button';
  btnStop.className = 'timecontrols-btn';
  btnStop.title = 'Stop';
  const imgStop = document.createElement('img');
  imgStop.src = 'public/assets/controls/pause-solid.png';
  imgStop.alt = 'Stop';
  imgStop.style.width = '14px';
  imgStop.style.height = '14px';
  imgStop.style.display = 'block';
  imgStop.style.filter = 'brightness(0) invert(0.8)';
  btnStop.appendChild(imgStop);
  btnStop.addEventListener('click', () => {
    currentIdx = SPEEDS.indexOf(0);
    updateUI();
  });

  const btnForward = document.createElement('button');
  btnForward.type = 'button';
  btnForward.className = 'timecontrols-btn';
  btnForward.title = 'Faster / Forward';
  const imgForward = document.createElement('img');
  imgForward.src = 'public/assets/controls/forward-solid.png';
  imgForward.alt = 'Forward';
  imgForward.style.width = '14px';
  imgForward.style.height = '14px';
  imgForward.style.display = 'block';
  imgForward.style.filter = 'brightness(0) invert(0.8)';
  btnForward.appendChild(imgForward);
  btnForward.addEventListener('click', () => {
    if (currentIdx < SPEEDS.length - 1) {
      currentIdx++;
      updateUI();
    }
  });

  wrap.appendChild(btnBack);
  wrap.appendChild(btnStop);
  wrap.appendChild(btnForward);

  panel.appendChild(label);
  panel.appendChild(wrap);
  document.body.appendChild(panel);

  // Initialize UI state
  updateUI();
}
