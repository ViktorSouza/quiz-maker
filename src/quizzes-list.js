import { useContext } from 'react'
import { QuizzesContext } from './App'
import { Quiz } from './quiz-box'
import React from 'react'
const Quizzes = () => {
	const { quizzesLocalStorage } = useContext(QuizzesContext)
	return (
		<>
			{
				<div className='quizzes-padding'>
					<div className='quizzes'>
						{quizzesLocalStorage.map((quiz, index) => {
							const percentagem = (
								(quiz.amountRight /
									(quiz.amountWrong + quiz.amountRight)) *
								100
							).toFixed(1)
							return (
								<Quiz
									key={quizzesLocalStorage[index].id}
									index={index}
									percentagem={percentagem}
									quiz={quiz}
								></Quiz>
							)
						})}
					</div>
				</div>
			}
		</>
	)
}
export { Quizzes }
