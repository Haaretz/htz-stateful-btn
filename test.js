
/* eslint-disable import/no-unresolved */
import statefulBtn from 'htz-stateful-btn';
/* eslint-enable import/no-unresolved */

const btnElem = document.getElementById('btn');
const statefulInstance = statefulBtn(btnElem, 'טוען', 'o-btn--busy');

statefulInstance.btn.addEventListener('click', (e) => {
  statefulInstance.enableState();
  setTimeout(statefulInstance.disableState, 5000);
});

window.instance = statefulInstance;
