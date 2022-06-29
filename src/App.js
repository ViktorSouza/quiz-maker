import { Inputs } from './inputs'
import { Quizzes } from './quizzes-list'
import { QuizQuestions } from './quiz-questions.js'
import React, { useState, useRef } from 'react'
import { dataTests } from './only-admin-test'

import { Settings } from './settings'
import { DeletedQuizzes, DeleteConfirmation } from './deleted-quizzes'
if (localStorage.getItem('quizzes') == null) {
	localStorage.setItem('quizzes', '[]')
}
if (localStorage.getItem('deleted-quizzes') == null) {
	localStorage.setItem('deleted-quizzes', '[]')
}
export const QuizzesContext = React.createContext()

const Interface = () => {
	//-----------------------
	const deleteQuiz = (quiz, confirmation) => {
		if (confirmation === true) {
			localStorage.setItem(
				'quizzes',
				JSON.stringify(
					quizzesLocalStorage.filter((quiz1) => {
						return quiz1.id !== quiz.id
					})
				)
			)
			localStorage.setItem(
				'deleted-quizzes',
				JSON.stringify([
					...deletedQuizzesLocalStorage,
					...quizzesLocalStorage.filter((quiz1) => {
						return quiz1.id === quiz.id
					}),
				])
			)
			setQuizzesLocalStorage(JSON.parse(localStorage.getItem('quizzes')))
			setDeletedQuizzesLocalStorage(
				JSON.parse(localStorage.getItem('deleted-quizzes'))
			)
			setDeleteConfirm(false)
		} else {
			setDeleteConfirm(false)
		}
	}
	const resetAll = () => {
		localStorage.setItem('quizzes', '[]')
		setQuizzesLocalStorage(JSON.parse(localStorage.getItem('quizzes')))
		localStorage.setItem('deleted-quizzes', '[]')
		setDeletedQuizzesLocalStorage(JSON.parse(localStorage.getItem('deleted-quizzes')))
	}
	const createData = () => {
		localStorage.setItem('quizzes', JSON.stringify(dataTests))
		setQuizzesLocalStorage(dataTests)
	}

	const [deleteConfirm, setDeleteConfirm] = useState(false)
	//-------------------------
	const [quizzesLocalStorage, setQuizzesLocalStorage] = useState(
		JSON.parse(localStorage.getItem('quizzes'))
	)
	const wrongAnswerRef = useRef('')
	const questionRef = useRef('')
	const answerRef = useRef('')
	const wrongAnswersButton = useRef('')
	const [wrongAnswers, setWrongAnswers] = useState([])
	const [editOption, setEditOption] = useState(false)
	const [quizSelectedEdit, setQuizSelectedEdit] = useState(false)
	const [quizInitialOpen, setQuizInitialOpen] = useState(true)
	const [isConfigOpen, setConfigOpen] = useState(false)
	const [isDeletedQuizzesOpen, setIsDeletedQuizzesOpen] = useState(false)
	const [quizToBeDeleted, setQuizToBeDeleted] = useState('')
	const [deletedQuizzesLocalStorage, setDeletedQuizzesLocalStorage] =
		useState(JSON.parse(localStorage.getItem('deleted-quizzes')))
	if (quizInitialOpen) {
		return (
			<QuizzesContext.Provider
				value={{
					deletedQuizzesLocalStorage,
					setDeletedQuizzesLocalStorage,
					setIsDeletedQuizzesOpen,
					quizToBeDeleted,
					setQuizToBeDeleted,
					deleteQuiz,
					deleteConfirm,
					setDeleteConfirm,
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
				}}
			>
				<div className='main-window'>
					{isDeletedQuizzesOpen ? (
						<DeletedQuizzes></DeletedQuizzes>
					) : null}
					{isConfigOpen ? (
						<Settings closeSettings={setConfigOpen}></Settings>
					) : null}
					{deleteConfirm ? <DeleteConfirmation /> : null}
					<div className='left-part'>
						<h1 className='title'>Quiz maker</h1>
						<div className='options'>
							<div
								className='settings-icon'
								onClick={() => {
									setIsDeletedQuizzesOpen(false)
									setConfigOpen(!isConfigOpen)
								}}
							>
								<i className='bi bi-gear-fill'></i>
							</div>
							{/* trash */}
							<div
								className='trash-icon settings-icon'
								onClick={() => {
									setConfigOpen(false)
									setIsDeletedQuizzesOpen(
										!isDeletedQuizzesOpen
									)
								}}
							>
								<i className='bi bi-trash-fill'></i>
							</div>
						</div>
						<Inputs></Inputs>
						<input
							/* RESET ALL BUTTON */
							type='button'
							value='Reset all'
							onClick={resetAll}
						/>
						<input
							/* CREATE DATA ALL BUTTON */
							type='button'
							value='Create data'
							onClick={createData}
						/>
					</div>
					<div className='right-part'>
						<h1 className='title'>Quizzes</h1>
						<Quizzes></Quizzes>
					</div>
				</div>
			</QuizzesContext.Provider>
		)
	}
	return (
		<div className='main-window'>
			<QuizzesContext.Provider
				value={{
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
				}}
			>
				<QuizQuestions></QuizQuestions>
			</QuizzesContext.Provider>
		</div>
	)
}

export default Interface
