import { useContext } from 'react'
import React from 'react'
import { QuizzesContext } from './App'
export const DeletedQuizzes = () => {
	const {
        setIsDeletedQuizzesOpen,
        setQuizzesLocalStorage,
		quizzesLocalStorage,
		deletedQuizzesLocalStorage,
		setDeletedQuizzesLocalStorage,
	} = useContext(QuizzesContext)
	const recoverQuiz = (quiz) => {
		localStorage.setItem(
			'quizzes',
			JSON.stringify([
                ...quizzesLocalStorage,
				...deletedQuizzesLocalStorage.filter((quiz1) => {
                    console.log('y')
					return quiz1.id === quiz.id
				}),
			])
		)
		localStorage.setItem(
			'deleted-quizzes',
			JSON.stringify(
				deletedQuizzesLocalStorage.filter((quiz1) => {
                    console.log('x')
					return quiz1.id !== quiz.id
				}),
			)
		)
		setQuizzesLocalStorage(JSON.parse(localStorage.getItem('quizzes')))
		setDeletedQuizzesLocalStorage(
			JSON.parse(localStorage.getItem('deleted-quizzes'))
		)
	}
	return (
		<div className='deleted-quizzes-box'>
			<h1>Deleted Quizzes</h1>
			<i
				className='bi bi-x normal-icon close-settings'
				onClick={() => setIsDeletedQuizzesOpen(false)}
			></i>
			<div className='quizzes '>
				{deletedQuizzesLocalStorage.map((quiz, index) => {
					return (
						<>
							<div className='deleted-quiz' key={quiz.id}>
								<p>
									Question:{' '}
									<span className='bold-quiz'>
										{quiz.question}
									</span>
								</p>
								<p>
									Answer:{' '}
									<span className='bold-quiz'>
										{quiz.answer}
									</span>
								</p>
								<details>
									<summary>Wrong Answers</summary>
									<ul>
										{quiz.wrongAnswers.map((wrong) => {
											return (
												<li
													className='bold-quiz'
													key={wrong.id}
												>
													{wrong.answer}
												</li>
											)
										})}
									</ul>
								</details>
								<p>
									Right Times:{' '}
									<span className='bold-quiz'>
										{quiz.amountRight}
									</span>
								</p>
								<p>
									Wrong Times:{' '}
									<span className='bold-quiz'>
										{quiz.amountWrong}
									</span>
								</p>
								<input
									type='button'
									value='Recover'
									onClick={() => {
										recoverQuiz(quiz)
										console.log(quiz)
									}}
								/>
							</div>
						</>
					)
				})}
			</div>
		</div>
	)
}

export const DeleteConfirmation = () => {
	const { quizToBeDeleted, deleteQuiz } = useContext(QuizzesContext)
	return (
		<div className='delete-confirmation'>
			<h2>Are you sure?</h2>
			<p className='advise-delete-box'>
				If you delete, you can still recover the quiz at the trash
				option.
			</p>
			<input
				type='button'
				value='Yes, delete'
				className='delete-button'
				onClick={() => deleteQuiz(quizToBeDeleted, true)}
			/>
			<input
				type='button'
				value='Cancel'
				onClick={() => deleteQuiz(quizToBeDeleted, false)}
				className='secondary-button'
			/>
		</div>
	)
}
