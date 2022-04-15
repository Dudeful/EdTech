import { useState, useEffect } from 'react';
import './Calculator.css';

const WebCalculator = () => {
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operation, setOperation] = useState('');
	const [result, setResult] = useState('');

	useEffect(() => {
		const screen = document.getElementById('screen');
		if (result >= '0') {
			//print in screen the result with 5 decimals
			screen.innerHTML = Math.ceil(result * 100000) / 100000;
			console.log(result);
			setOperand1(result);
			setOperand2('');
			setOperation('');
			setResult('');
		}
	}, [result]);

	const clearCalculator = () => {
		const screen = document.getElementById('screen');
		screen.innerHTML = '';
		setOperand1('');
		setOperand2('');
		setOperation('');
		setResult('');
	};

	const operandHandler = (operand) => {
		const screen = document.getElementById('screen');
		screen.innerHTML += operand;

		if (!operation) {
			setOperand1(operand1 + operand);
		} else {
			setOperand2(operand2 + operand);
		}
	};

	const regex = /[+|−|\-|×|*|÷|/]/;

	const operatorHandler = (operator) => {
		const screen = document.getElementById('screen');
		if (isNaN(screen.innerHTML.at(-1))) return;
		if (screen.innerHTML.split(regex).length >= 2) return;

		screen.innerHTML += operator;
		setOperation(operator);
	};

	const resultHandler = () => {
		const screen = document.getElementById('screen');
		if (screen.innerHTML.split(regex).length < 2) return;

		const op1 = Number(operand1);
		const op2 = Number(operand2);
		const op3 = operation;
		console.log(op1, op3, op2);

		switch (op3) {
			case '+':
				setResult(op1 + op2);
				break;
			case '−':
				setResult(op1 - op2);
				break;
			case '-':
				setResult(op1 - op2);
				break;
			case '×':
				console.log(op1 * op2);
				setResult(op1 * op2);
				break;
			case '*':
				console.log(op1 * op2);
				setResult(op1 * op2);
				break;
			case '÷':
				setResult(op1 / op2);
				break;
			case '/':
				setResult(op1 / op2);
				break;
			default:
				setResult('invalid operation');
				break;
		}
	};

	document.onkeydown = (event) => {
		if ((event.key >= 0 && event.key <= 9) || event.key === '.') {
			operandHandler(event.key);
		}
		if (event.key.match(regex)) {
			operatorHandler(event.key);
		}
		if (event.key === 'Enter') {
			resultHandler();
		}
		if (event.key === 'Escape') {
			clearCalculator();
		}
	};

	return (
		<div id='calculator'>
			<h1 id='screen'></h1>
			<div id='box'>
				<button
					onClick={() => operandHandler('1')}
					className='number'>
					1
				</button>
				<button
					onClick={() => operandHandler('2')}
					className='number'>
					2
				</button>
				<button
					onClick={() => operandHandler('3')}
					className='number'>
					3
				</button>
				<button
					onClick={() => operandHandler('4')}
					className='number'>
					4
				</button>
				<button
					onClick={() => operandHandler('5')}
					className='number'>
					5
				</button>
				<button
					onClick={() => operandHandler('6')}
					className='number'>
					6
				</button>
				<button
					onClick={() => operandHandler('7')}
					className='number'>
					7
				</button>
				<button
					onClick={() => operandHandler('8')}
					className='number'>
					8
				</button>
				<button
					onClick={() => operandHandler('9')}
					className='number'>
					9
				</button>
				<button
					onClick={() => operandHandler('0')}
					className='number'>
					0
				</button>
				<button
					onClick={() => operandHandler('.')}
					className='number'>
					.
				</button>
				<button
					onClick={() => operatorHandler('+')}
					className='operation'>
					+
				</button>
				<button
					onClick={() => operatorHandler('−')}
					className='operation'>
					−
				</button>
				<button
					onClick={() => operatorHandler('×')}
					className='operation'>
					×
				</button>
				<button
					onClick={() => operatorHandler('÷')}
					className='operation'>
					÷
				</button>
				<button onClick={() => clearCalculator()} id='clean'>
					C
				</button>
				<button onClick={() => resultHandler()} id='equal'>
					=
				</button>
			</div>
		</div>
	);
};

export default WebCalculator;
