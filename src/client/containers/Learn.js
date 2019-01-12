import { connect } from '../utils/connect'
import { Learn } from '../components/Learn'
import { setVisiblityFilter, setShowQuestion, learnNextQuestion, learnStartOver, goToQuestion } from '../actions/index'



const mapStateToProps = state =>
    ({ ...state })

const mapDispatchToProps = dispatch => ({
    onCourseClick: course => dispatch(setVisiblityFilter(course.target.id)),
    onShowQuestionClick: () => dispatch(setShowQuestion()),
    onNextQuestionClick: () => dispatch(learnNextQuestion()),
    onStartOverClick: () => dispatch(learnStartOver()),
    onGoToQuestionClick: () => dispatch(goToQuestion()),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Learn)