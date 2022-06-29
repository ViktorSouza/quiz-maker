import { useContext } from 'react'
import nextId, { resetId } from 'react-id-generator'
import { QuizzesContext } from './App.js'
import React from 'react'
const Inputs = () => {
	const {
		quizSelectedEdit,
		setQuizSelectedEdit,
		editOption,
		setEditOption,
		quizzesLocalStorage,
		setQuizzesLocalStorage,
		wrongAnswerRef,
		questionRef,
		answerRef,
		wrongAnswersButton,
		wrongAnswers,
		setWrongAnswers,
		quizInitialOpen,
		setQuizInitialOpen,
	} = useContext(QuizzesContext)
	const addSplicedQuiz = () => {
		const temporaryQuiz = JSON.parse(JSON.stringify(quizzesLocalStorage))
		temporaryQuiz.splice(quizSelectedEdit, 1, {
			id: quizzesLocalStorage[quizSelectedEdit].id,
			question: questionRef.current.value,
			answer: answerRef.current.value,
			amountWrong: quizzesLocalStorage[quizSelectedEdit].amountWrong,
			amountRight: quizzesLocalStorage[quizSelectedEdit].amountRight,
			wrongAnswers: wrongAnswers,
		})
		localStorage.setItem('quizzes', JSON.stringify(temporaryQuiz))
		setQuizzesLocalStorage(JSON.parse(localStorage.getItem('quizzes')))
		answerRef.current.value = ''
		questionRef.current.value = ''
		setWrongAnswers([])
		setEditOption(false)
		setQuizSelectedEdit(false)
	}
	const addQuizToLocalStorage = (quiz) => {
		resetId()
		localStorage.setItem(
			'quizzes',
			JSON.stringify([...quizzesLocalStorage, quiz])
		)
		setQuizzesLocalStorage(JSON.parse(localStorage.getItem('quizzes')))
	}
	function addWrongQuiz() {
		setWrongAnswers([
			...wrongAnswers,
			{ answer: wrongAnswerRef.current.value, id: nextId() + Date.now() },
		])
		wrongAnswerRef.current.value = ''
	}

	function addQuiz() {
		if (wrongAnswers.length < 4) {
			console.log('you need to add at least 4 wrong answers!')
		} else {
			addQuizToLocalStorage({
				id: Date.now(),
				question: questionRef.current.value,
				answer: answerRef.current.value,
				amountWrong: 0,
				amountRight: 0,
				wrongAnswers: wrongAnswers,
			})
			answerRef.current.value = ''
			questionRef.current.value = ''
			setWrongAnswers([])
			setEditOption(false)
			setQuizSelectedEdit(false)
		}
	}
	return (
		<>
			<div className='input-quiz'>
				<input
					placeholder=' '
					className='input-text-form'
					type='text'
					name='question'
					id='question'
					ref={questionRef}
				/>
				<label className='label-text-form' htmlFor='question'>
					Question
				</label>
			</div>
			<div className='input-quiz'>
				<input
					placeholder=' '
					className='input-text-form'
					type='text'
					name='answer'
					id='answer'
					ref={answerRef}
				/>
				<label className='label-text-form' htmlFor='answer'>
					Answer
				</label>
			</div>
			<div className='input-quiz'>
				<div id='wrong-anwers-div' className=' input-text-form'>
					<input
						placeholder=' '
						type='text'
						className='wrong-anwers-input input-text-form'
						name='wrong-answers'
						id='wrong-answers'
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								addWrongQuiz()
							}
						}}
						ref={wrongAnswerRef}
					/>
					<label className='label-text-form' htmlFor='wrong-answer'>
						Wrong answers
					</label>
					<input
						type='button'
						className='wrong-anwers-button'
						ref={wrongAnswersButton}
						value='Add'
						onClick={() => addWrongQuiz()}
					/>
				</div>
				<p>All wrong answers:</p>
				<div className='wrong-answers-list'>
					{wrongAnswers.map((wrongAnswer) => {
						return (
							<li
								key={wrongAnswer.id}
								onClick={() => {
									setWrongAnswers(
										wrongAnswers.filter((answer) => {
											return answer.id !== wrongAnswer.id
										})
									)
								}}
							>
								{wrongAnswer.answer}
							</li>
						)
					})}
				</div>
			</div>
			{!editOption ? (
				<input type='button' value='Add quiz' onClick={addQuiz} />
			) : (
				<input
					type='button'
					value='Add as a new quiz'
					onClick={() => {
						addQuiz()
						setEditOption(false)
					}}
				/>
			)}
			{!editOption ? (
				<input
					type='button'
					value='Start quiz'
					onClick={() => {
						setQuizInitialOpen(!quizInitialOpen)
					}}
				/>
			) : (
				<input
					type='button'
					value='Replace quiz'
					onClick={() => {
						setEditOption(false)
						addSplicedQuiz()
					}}
				/>
			)}
		</>
	)
}

export { Inputs }
