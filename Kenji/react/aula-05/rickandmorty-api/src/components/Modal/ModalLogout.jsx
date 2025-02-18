import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './styles.css';

const ModalLogout = (props) => {
	return ReactDOM.createPortal(
		<CSSTransition
			in={props.showModal}
			unmountOnExit
			timeout={{ enter: 0, exit: 300 }}>
			<div className='modal' onClick={props.onClose}>
				<div
					className='modal-content'
					onClick={(e) => e.stopPropagation()}>
					<div className='modal-header'>
						<h4 className='modal-title'>{props.title}</h4>
					</div>
					<div className='modal-body'>{props.children}</div>
					<div className='modal-footer'>
						<button onClick={props.onClose} className='button'>
							Close
						</button>
					</div>
				</div>
			</div>
		</CSSTransition>,
		document.getElementById('root')
	);
};

export default ModalLogout;
