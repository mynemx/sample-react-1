// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { userUpdateRequest } from '../../service'
import ReeValidate from 'ree-validate'

// import components
import Form from './components/Form'

class Page extends Component {
  static displayName = 'UserPage'
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new ReeValidate({
      'name': 'required|min:3',
      'email': 'required|email',
      'phone': 'min:8|numeric',
      'about': 'min:10|max:1024',
    })
    
    const user = this.props.user.toJson()
    
    this.state = {
      user,
      errors: this.validator.errors
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentWillReceiveProps(nextProps) {
    const user = nextProps.user.toJson()
    
    if (!_.isEqual(this.state.user, user)) {
      this.setState({ user })
    }
    
  }
  
  handleChange(name, value) {
    const { errors } = this.validator
    
    this.setState({ user: { ...this.props.user, [name]: value} })
    
    errors.remove(name)
    
    this.validator.validate(name, value)
      .then(() => {
          this.setState({ errors })
      })
  }
  
  handleSubmit(e) {
    e.preventDefault()
    const user = this.state.user
    const { errors } = this.validator
    
    this.validator.validateAll(user)
      .then((success) => {
        if (success) {
          this.submit(user)
        } else {
          this.setState({ errors })
        }
      })
  }
  
  submit(user) {
    this.props.dispatch(userUpdateRequest(user))
      .catch(({ error, statusCode }) => {
        const { errors } = this.validator
        
        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        }
        
        this.setState({ errors })
      })
  }
  
  render() {
    return <div className="page-container">
      <h1>Currency Settings</h1>
  
      <section className="row">
        <div className="col-12 col-md-9 col-sm-12">
          
          <table className="table" >
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Base Currency</th>
                    <th>Reporting Currency</th>
                    <th>Invoicing Currency</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
          </table>

        </div>
      </section>
    </div>
  }
}

export default Page