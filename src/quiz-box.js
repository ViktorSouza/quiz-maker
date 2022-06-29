import { useContext, useState } from 'react'
import { QuizzesContext } from './App'
import useCollapse from 'react-collapsed'
import React from 'react'
export const Quiz = ({ quiz, percentagem, index }) => {
	const {
		quizToBeDeleted,
		setQuizToBeDeleted,
		deleteQuiz,
		deleteConfirm,
		setDeleteConfirm,
		setQuizSelectedEdit,
		setEditOption,
		quizzesLocalStorage,
		setQuizzesLocalStorage,
		questionRef,
		answerRef,
		wrongAnswersButton,
		setWrongAnswers,
	} = useContext(QuizzesContext)
	const { getCollapseProps, getToggleProps } = useCollapse()

	return (
		<>
			<div className='quiz' key={quiz.id}>
				<p>
					Question: <span className='bold-quiz'>{quiz.question}</span>
				</p>
				<p>
					Answer: <span className='bold-quiz'>{quiz.answer}</span>
				</p>
				<details>
					<summary>Wrong Answers</summary>
					<ul>
						{quiz.wrongAnswers.map((wrong) => {
							return (
								<li className='bold-quiz' key={wrong.id}>
									{wrong.answer}
								</li>
							)
						})}
					</ul>
				</details>
				<p>
					Right Times:{' '}
					<span className='bold-quiz'>{quiz.amountRight}</span>
				</p>
				<p>
					Wrong Times:{' '}
					<span className='bold-quiz'>{quiz.amountWrong}</span>
				</p>
				<div className='accurance'>
					Accurance:
					<div className='percentagem'>
						<div
							className='percentagem-box'
							style={{
								left: `calc(${
									isNaN(percentagem) ? 5 : percentagem
								}% - 22px)`,
							}}
						>
							<div className='percentagem-box-number'>
								{`${isNaN(percentagem) ? 0 : percentagem}%`}
							</div>
							<div className='percentagem-box-pointer'></div>
						</div>
						<div
							className='percentagem-stick'
							style={{
								width: `${
									isNaN(percentagem) ? 0 : percentagem
								}%`,
							}}
						></div>
					</div>
				</div>
				<input
					type='button'
					value='Edit'
					onClick={() => {
						window.scrollTo(0, 0)
						setEditOption(true)
						setQuizSelectedEdit(index)
						answerRef.current.value = quiz.answer
						questionRef.current.value = quiz.question
						setWrongAnswers(quiz.wrongAnswers)
						wrongAnswersButton.current.onClick = () => {
							console.log('bah')
						}
					}}
				/>
				<input
					type='button'
					value='Delete'
					className='delete-button-quiz'
					onClick={() => {
						setQuizToBeDeleted(quiz)
						setDeleteConfirm(true)
					}}
				/>
			</div>
		</>
	)
}
