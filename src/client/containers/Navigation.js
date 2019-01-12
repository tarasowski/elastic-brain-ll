import { connect } from '../utils/connect'
import { Navigation } from '../components/Navigation'
import { changeUrl } from '../actions/index'

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
    onHomeClick: () => dispatch(changeUrl('/')),
    onAddCourseClick: () => dispatch(changeUrl('/add-course')),
    onAddCardClick: () => dispatch(changeUrl('/add-card')),
    onLearnClick: () => dispatch(changeUrl('/learn')),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation)