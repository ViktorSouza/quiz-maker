import { QuizzesContext } from './App'
import React from 'react'
import { useContext, useEffect, useReducer, useRef, useState } from 'react'
const defaultData = {
	quizIndexPosition: 0,
	rightAnswerPosition: 0,
	shuffledQuestions: 0,
	shuffledQuiz: [
		{
			id: 0,
			question: 'Loading',
			answer: 'Loading',
			amountWrong: 0,
			amountRight: 0,
			wrongAnswers: [
				{
					answer: 'Loading',
					id: 'id1',
				},
				{
					answer: 'Loading',
					id: 'id2',
				},
				{
					answer: 'Loading',
					id: 'id4',
				},
				{
					answer: 'Loading',
					id: 'id5',
				},
				{
					answer: 'Loading',
					id: 'id6',
				},
			],
		},
	],
}
export const QuizQuestions = () => {
	const RightAnswer = () => {
		if (data.quizIndexPosition === quizzesLocalStorage.length - 1) {
			return (
				<div className='pop-up-right-answer'>
					<h2>You're right and finish the quiz!</h2>
					<input
						type='button'
						value='Restart'
						onClick={() => newQuiz(true)}
					/>
					<input
						type='button'
						value='Back'
						onClick={() => setQuizInitialOpen(true)}
					/>
				</div>
			)
		}
		return (
			<div className='pop-up-right-answer'>
				<h2>You're right!</h2>
				<input
					type='button'
					value='Next'
					onClick={() => newQuiz(false)}
				/>
			</div>
		)
	}
	const selectedAnswer = useRef()
	const [answerClicked, setAnswerClicked] = useState(false)
	const [nextButton, setNextButton] = useState(false)
	const [textQuiz, setTextQuiz] = useState('')
	const { quizzesLocalStorage, setQuizzesLocalStorage, setQuizInitialOpen } =
		useContext(QuizzesContext)
	const [chooseColor, setChooseColor] = useState('var(--main-color)')
	const [data, dispatch] = useReducer(reducer, defaultData)
	const newQuiz = (firstQuestion) => {
		if (firstQuestion) {
			console.log('first question is activated')
		} else {
			console.log('is not activated')
		}
		setTextQuiz('')
		if (data.quizIndexPosition < quizzesLocalStorage.length - 1) {
			setAnswerClicked(false)
			const quizIndexPosition = data.quizIndexPosition
			if (firstQuestion === true) {
				const quizzesCopy = JSON.parse(
					JSON.stringify(quizzesLocalStorage)
				)
				const shuffledQuiz = shuffle(quizzesCopy)
				dispatch({
					type: 'FIRST_TIME',
					quizIndexPosition,
					shuffledQuiz,
				})
			} else {
				dispatch({
					type: 'blablabla',
					quizIndexPosition,
				})
			}

			setNextButton(false)
		} else {
			setQuizInitialOpen(true)
		}
	}

	function reducer(state, action) {
		if (action.type === 'FIRST_TIME') {
			return {
				...state,
				quizIndexPosition: state.quizIndexPosition,
				rightAnswerPosition: randomBtw(0, 2),
				shuffledQuestions: shuffle(
					action.shuffledQuiz[action.quizIndexPosition].wrongAnswers
				),
				shuffledQuiz: action.shuffledQuiz,
			}
		}
		return {
			...state,
			quizIndexPosition: state.quizIndexPosition + 1,
			rightAnswerPosition: randomBtw(0, 4),
			shuffledQuestions: shuffle(
				state.shuffledQuiz[action.quizIndexPosition].wrongAnswers
			),
			shuffledQuiz: state.shuffledQuiz,
		}
	}

	//----
	useEffect(() => {
		newQuiz(true)
		console.log('useEffect executed')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	//Found ID
	function foundId() {
		for (let index = 0; index < quizzesLocalStorage.length; index++) {
			if (
				data.shuffledQuiz[data.quizIndexPosition].id ===
				quizzesLocalStorage[index].id
			) {
				return index
			}
		}
	}

	//----Submit Question
	function submitQuestion() {
		if (data.rightAnswerPosition === answerClicked) {
			setChooseColor('var(--right)')
			setNextButton(true)
			quizzesLocalStorage[foundId()].amountRight += 1
			localStorage.setItem('quizzes', JSON.stringify(quizzesLocalStorage))
			setQuizzesLocalStorage(JSON.parse(localStorage.getItem('quizzes')))
		} else {
			if (answerClicked === false) {
				setTextQuiz('Choose one alternative!')
				setTimeout(() => {
					setTextQuiz('')
				}, 2000)
			} else {
				setChooseColor('var(--error)')
				setTextQuiz('Oh, you are wrong :(')
				setTimeout(() => {
					setTextQuiz('')
					setChooseColor('var(--main-color)')
				}, 2000)
				quizzesLocalStorage[foundId()].amountWrong += 1
				localStorage.setItem(
					'quizzes',
					JSON.stringify(quizzesLocalStorage)
				)
				setQuizzesLocalStorage(
					JSON.parse(localStorage.getItem('quizzes'))
				)
			}
		}
	}

	return (
		<>
			<div
				className='quiz-questions-window'
				onKeyDown={(e) =>{
				console.log(e)}}
			>
				<h2>{data.shuffledQuiz[data.quizIndexPosition].question}</h2>
				<ul>
					{[...Array(5).fill('a')].map((_, index) => {
						console.log(
							data.shuffledQuiz[data.quizIndexPosition]
								.wrongAnswers[index].answer
						)
						return (
							<div
								className='quiz-alternative'
								key={
									data.shuffledQuiz[data.quizIndexPosition]
										.wrongAnswers[index].id
								}
							>
								<div
									className={
										answerClicked === index
											? 'circle-quiz selected-answer'
											: 'circle-quiz'
									}
									style={
										answerClicked === index
											? { background: chooseColor }
											: {}
									}
									onClick={() => {
										setAnswerClicked(index)
									}}
								></div>
								<p
									ref={
										answerClicked === index
											? selectedAnswer
											: null
									}
								>
									{index === data.rightAnswerPosition
										? data.shuffledQuiz[
												data.quizIndexPosition
										  ].answer
										: data.shuffledQuiz[
												data.quizIndexPosition
										  ].wrongAnswers[
												isRightAnswerPassed(index, data)
										  ].answer}
								</p>
							</div>
						)
					})}
				</ul>
				<input
					type='button'
					value='Submit Question'
					onClick={submitQuestion}
				/>
				<input
					type='button'
					value='Back'
					onClick={() => setQuizInitialOpen(true)}
				/>
				{textQuiz ? (
					<p className='pop-up-alternative'>{textQuiz}</p>
				) : null}
				{nextButton ? <RightAnswer></RightAnswer> : null}
			</div>
		</>
	)
}

const randomBtw = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min
function isRightAnswerPassed(index, data) {
	return index >= data.rightAnswerPosition ? index - 1 : index
}

function shuffle(array) {
	var m = array.length,
		t,
		i

	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--)

		// And swap it with the current element.
		t = array[m]
		array[m] = array[i]
		array[i] = t
	}

	return array
}
function keyboardShortCut(event){
	switch(event.key){
		case '1':
			console.log(1)
			break
		case '2':
			console.log(2);
	}
}