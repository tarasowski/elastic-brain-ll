import { connect } from '../utils/connect'
import { AddCourse } from '../components/AddCourse'
import { addCourse } from '../actions';



const mapStateToProps = state => { }

const mapDispatchToProps = dispatch => ({
    onclick: () =>
        dispatch(addCourse()),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddCourse)