import { connect } from '../utils/connect'
import { Learn } from '../components/Learn'
import { setVisiblityFilter, setShowQuestion, learnNextQuestion, learnStartOver } from '../actions/index'


const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = dispatch => ({
    onCourseClick: course => dispatch(setVisiblityFilter(course.target.id)),
    onShowQuestionClick: () => dispatch(setShowQuestion()),
    onNextQuestionClick: () => dispatch(learnNextQuestion()),
    onStartOverClick: () => dispatch(learnStartOver())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Learn)