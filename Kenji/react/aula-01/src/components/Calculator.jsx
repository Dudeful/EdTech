import './Calculator.css';

const WebCalculator = () => {
	class Calculator {
		setOperand1(_operand1) {
			this._operand1 = _operand1;
		}

		setOperand2(_operand2) {
			this._operand2 = _operand2;
		}

		setOperation(_operation) {
			this._operation = _operation;
		}

		getResult() {
			switch (this._operation) {
				case '+':
					return this._operand1 + this._operand2;
				case '−':
					return this._operand1 - this._operand2;
				case '-':
					return this._operand1 - this._operand2;
				case '×':
					return this._operand1 * this._operand2;
				case '*':
					return this._operand1 * this._operand2;
				case '÷':
					return this._operand1 / this._operand2;
				case '/':
					return this._operand1 / this._operand2;
				default:
					return 'invalid operation';
			}
		}

		clearCalculator() {
			this._operand1 = undefined;
			this._operand2 = undefined;
			this._operation = undefined;
		}
	}

	const calc = new Calculator();
	const regex = /[+|−|\-|×|*|÷|/]/;

	const operandHandler = (operand) => {
		const screen = document.getElementById('screen');
		screen.innerHTML += operand;
	};

	const operatorHandler = (operator) => {
		const screen = document.getElementById('screen');
		if (isNaN(screen.innerHTML.at(-1))) return;
		if (screen.innerHTML.split(regex).length >= 2) return;

		screen.innerHTML += operator;
		calc.setOperation(operator);
	};

	const resultHandler = () => {
		const screen = document.getElementById('screen');
		if (screen.innerHTML.split(regex).length < 2) return;
		const operands = screen.innerHTML.split(regex);

		calc.setOperand1(Number(operands[0]));
		calc.setOperand2(Number(operands[1]));

		//print in screen the result with 5 decimals
		screen.innerHTML = Math.ceil(calc.getResult() * 100000) / 100000;
	};

	const clearCalculator = () => {
		const screen = document.getElementById('screen');
		screen.innerHTML = '';
		calc.clearCalculator();
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
					onClick={(event) => operandHandler(event.target.innerText)}
					className='number'>
					1
				</button>
				<button
					onClick={(event) => operandHandler(event.target.innerText)}
					className='number'>
					2
				</button>
				<button
					onClick={(event) => operandHandler(event.target.innerText)}
					className='number'>
					3
				</button>
				<button
					onClick={(event) => operandHandler(event.target.innerText)}
					className='number'>
					4
				</button>
				<button
					onClick={(event) => operandHandler(event.target.innerText)}
					className='number'>
					5
				</button>
				<button
					onClick={(event) => operandHandler(event.target.innerText)}
					className='number'>
					6
				</button>
				<button
					onClick={(event) => operandHandler(event.target.innerText)}
					className='number'>
					7
				</button>
				<button
					onClick={(event) => operandHandler(event.target.innerText)}
					className='number'>
					8
				</button>
				<button
					onClick={(event) => operandHandler(event.target.innerText)}
					className='number'>
					9
				</button>
				<button
					onClick={(event) => operandHandler(event.target.innerText)}
					className='number'>
					0
				</button>
				<button
					onClick={(event) => operandHandler(event.target.innerText)}
					className='number'>
					.
				</button>
				<button
					onClick={(event) => operatorHandler(event.target.innerText)}
					className='operation'>
					+
				</button>
				<button
					onClick={(event) => operatorHandler(event.target.innerText)}
					className='operation'>
					−
				</button>
				<button
					onClick={(event) => operatorHandler(event.target.innerText)}
					className='operation'>
					×
				</button>
				<button
					onClick={(event) => operatorHandler(event.target.innerText)}
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
