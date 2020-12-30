import Model from '../../utils/Model'

class Currency extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.code = props.code || ''
    this.symbol = props.symbol || ''
    this.rate = props.rate || ''
    this.base_currency = props.base_currency || false
    this.invoicing_currency = props.invoicing_currency || false
  }
}

export default Currency