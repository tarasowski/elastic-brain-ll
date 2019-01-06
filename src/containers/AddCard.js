import { connect } from '../utils/connect'
import { AddCard } from '../components/AddCard'
import { addCard, selectCourse } from '../actions'

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    onAddCardClick: () =>
        dispatch(addCard()),
    onCourseSelect: () => dispatch(selectCourse())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCard)