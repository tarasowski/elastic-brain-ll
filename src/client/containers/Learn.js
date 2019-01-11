import { connect } from '../utils/connect'
import { Learn } from '../components/Learn'
import { setVisiblityFilter, setShowQuestion, learnNextQuestion, learnStartOver, goToQuestion } from '../actions/index'


const byDate = (a, b) => {
    const acc = new Date(a.dateAdded)
    const buc = new Date(b.dateAdded)
    return acc - buc
}

const sortBy = xs =>
    [...xs].sort(byDate)

const mapStateToProps = state =>
    ({ ...state, cards: sortBy(state.cards) })

const mapDispatchToProps = dispatch => ({
    onCourseClick: course => dispatch(setVisiblityFilter(course.target.id)),
    onShowQuestionClick: () => dispatch(setShowQuestion()),
    onNextQuestionClick: () => dispatch(learnNextQuestion()),
    onStartOverClick: () => dispatch(learnStartOver()),
    onGoToQuestionClick: () => dispatch(goToQuestion())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Learn)