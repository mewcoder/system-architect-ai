export type QuestionSelection = {
  id: string
  exam: string
  question_no: number
  part_no: number
}

function questionKey(question: QuestionSelection) {
  return `${question.exam}-${question.question_no}`
}

export function summarizeQuestionBank<T extends QuestionSelection>(questions: readonly T[]) {
  const years = new Set(questions.map((question) => question.exam.slice(0, 4)))
  const annualAverageValue = years.size
    ? Math.round(questions.length / years.size * 10) / 10
    : 0
  const annualAverageLabel = Number.isInteger(annualAverageValue)
    ? String(annualAverageValue)
    : `${Math.floor(annualAverageValue)}～${Math.ceil(annualAverageValue)}`

  return {
    annualAverageLabel,
  }
}

function sortQuestions<T extends QuestionSelection>(questions: T[]) {
  return questions.sort((a, b) =>
    b.exam.localeCompare(a.exam) ||
    b.question_no - a.question_no ||
    a.part_no - b.part_no ||
    a.id.localeCompare(b.id),
  )
}

/**
 * Select a page-specific question set from a complete question-bank JSON.
 * Use exam-question_no to select a whole question, or the record id to select
 * a specific part.
 */
export function selectQuestions<T extends QuestionSelection>(
  questions: readonly T[],
  keys: readonly string[],
) {
  const selected = new Set(keys)
  return sortQuestions(questions
    .filter((question) => selected.has(questionKey(question)) || selected.has(question.id))
  )
}

/**
 * Use a complete question-bank JSON and remove only the questions that belong
 * to another page.
 */
export function excludeQuestions<T extends QuestionSelection>(
  questions: readonly T[],
  keys: readonly string[],
) {
  const excluded = new Set(keys)
  return sortQuestions(questions.filter(
    (question) => !excluded.has(questionKey(question)) && !excluded.has(question.id),
  ))
}
