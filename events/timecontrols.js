/**
 * Time controls to change the speed of the solar system simulation.
 * Call init(setTimeScale) from main.js to connect the UI to the simulation.
 */

const SPEEDS = [0.25, 0.5, 1, 2, 5, 10];

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
  label.textContent = 'Speed';

  const wrap = document.createElement('div');
  wrap.className = 'timecontrols-buttons';

  SPEEDS.forEach((speed) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'timecontrols-btn';
    btn.textContent = speed === 1 ? '1×' : `${speed}×`;
    btn.dataset.speed = String(speed);
    if (speed === 1) btn.classList.add('active');
    btn.addEventListener('click', () => {
      setTimeScale(speed);
      wrap.querySelectorAll('.timecontrols-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
    wrap.appendChild(btn);
  });

  panel.appendChild(label);
  panel.appendChild(wrap);
  document.body.appendChild(panel);
}
